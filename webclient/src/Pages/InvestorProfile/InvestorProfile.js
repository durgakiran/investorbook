import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Table from "../../Components/Table/Table";
import InvestorProfileTitle from "./InvestorProfileTitle/InvestorProfileTitle";
import Amount from "../../Components/Amount/Amount";
import styles from "./InvestorProfile.module.css";
import TableActions from "../../Components/TableActions/TableActions";
import AddInvestment from "./AddInvestment/AddInvestment";
import { Button } from "@material-ui/core";
// import TableActions from "../TableActions/TableActions";
// import InvestorProfileTitle from "../InvestorProfileTitle/InvestorProfileTitle";

const GET_INVESTOR = gql`
  query GetInvestor($id: Int!) {
    investment(where: { investor_id: { _eq: $id } }) {
      id
      company_id
      company {
        id
        name
      }
      amount
    }
    investment_aggregate(where: { investor_id: { _eq: $id } }) {
      aggregate {
        sum {
          amount
        }
      }
    }
    investor_by_pk(id: $id) {
      name
      id
      photo_thumbnail
    }
  }
`;

export default function InvestorProfile() {
  const [openInvestment, setOpenInvestment] = useState(false);

  const handleAddInvestment = (value) => {
    setOpenInvestment(value);
  };

  const columnMappings = [
    { id: "name", column: "Name" },
    { id: "amount", column: "Amount" },
    { id: "actions", column: "Actions" },
  ];
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_INVESTOR, {
    variables: { id: Number(id) },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (data.investment.length === 0) {
    return <div>No Investments so far!</div>;
  }

  return (
    <div>
      <InvestorProfileTitle
        name={data.investor_by_pk.name}
        id={data.investor_by_pk.id}
        image={data.investor_by_pk.photo_thumbnail}
        amount={data.investment_aggregate.aggregate.sum.amount}
      />
      <AddInvestment
        investorId={data.investor_by_pk.id}
        open={openInvestment}
        handleAddInvestment={handleAddInvestment}
      />
      <div className={styles["table-actions"]}>
        <div className={styles["sub-title"]}>Investments</div>
        <Button
          className={styles["add-investment"]}
          onClick={() => handleAddInvestment(true)}
        >
          + Add Investments
        </Button>
      </div>
      <div className={styles.investments}>
        <Table columns={columnMappings}>
          {data.investment.map((row) => {
            return (
              <tr key={row.id}>
                {columnMappings.map((column) => {
                  if (column.id === "name") {
                    return <td key={column.id}>{row.company.name}</td>;
                  }
                  if (column.id === "amount") {
                    return (
                      <td key={column.id}>
                        <Amount amount={row[column.id]} />
                      </td>
                    );
                  }
                  return (
                    <td key={column.id}>
                      {column.id === "actions" ? (
                        <TableActions />
                      ) : (
                        row[column.id]
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </Table>
      </div>
    </div>
  );
}
