import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Table from "../../Components/Table/Table";
import InvestorProfileTitle from "./InvestorProfileTitle/InvestorProfileTitle";
import Amount from "../../Components/Amount/Amount";
import styles from "./InvestorProfile.module.css";
import TableActions from "../../Components/TableActions/TableActions";
import AddInvestment from "./AddInvestment/AddInvestment";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { ConfirmDialog } from "../../Components/ConfirmDialog/ConfirmDialog";

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

const DELETE_INVESTMENT = gql`
  mutation DeleteInvestment($id: Int!) {
    delete_investment(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

const useStyles = makeStyles({
  button: {
    "& .MuiButton-label": {
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: "14px",
      color: "#333FAD",
      cursor: "pointer",
      textTransform: "capitalize",
    },
  },
});

export default function InvestorProfile() {
  const [openInvestment, setOpenInvestment] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionId, setActionId] = useState();
  const [recordName, setRecordName] = useState();
  const [previousAmount, setPreviousAmount] = useState();
  const classes = useStyles();

  const columnMappings = [
    { id: "name", column: "Name" },
    { id: "amount", column: "Amount" },
    { id: "actions", column: "Actions" },
  ];
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_INVESTOR, {
    variables: { id: Number(id) },
  });
  const [deleteInvestment] = useMutation(DELETE_INVESTMENT, {
    onCompleted: () => {
      setActionId();
      setRecordName();
      refetch();
    },
  });

  const handleAddInvestment = (value) => {
    setActionId();
    setRecordName();
    setPreviousAmount();
    refetch();
    setOpenInvestment(value);
  };

  const handleEdit = (id, name, amount) => {
    setActionId(id);
    setRecordName(name);
    setPreviousAmount(amount);
    setOpenInvestment(true);
  };

  const handleDelete = (id, name) => {
    setActionId(id);
    setRecordName(name);
    setDeleteOpen(true);
  };

  const deleteRecord = () => {
    deleteInvestment({ variables: { id: actionId } });
    setDeleteOpen(false);
  };

  if (loading) {
    return <div><CircularProgress  color="primary" /></div>;
  }

  if (error) {
    return <div>error</div>;
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
        actionId={actionId}
        companyName={recordName}
        previousAmount={previousAmount}
      />
      <ConfirmDialog
        title={`Confirm Delete ${recordName}`}
        open={deleteOpen}
        closeDialog={() => setDeleteOpen(false)}
        confirm={deleteRecord}
      />
      <div className={styles["table-actions"]}>
        <div className={styles["sub-title"]}>Investments</div>
        <Button
          className={classes.button}
          onClick={() => setOpenInvestment(true)}
        >
          + Add Investments
        </Button>
      </div>
      <div className={styles.investments}>
        {data.investment.length === 0 ? (
          <div>No Investments so far!</div>
        ) : (
          <Table columns={columnMappings}>
            {data.investment.map((row) => {
              return (
                <tr key={row.id}>
                  {columnMappings.map((column) => {
                    if (column.id === "name") {
                      return (
                        <td key={column.id} className={styles.name}>
                          {row.company.name}
                        </td>
                      );
                    }
                    if (column.id === "amount") {
                      return (
                        <td key={column.id} className={styles.amount}>
                          <Amount amount={row[column.id]} />
                        </td>
                      );
                    }
                    return (
                      <td key={column.id} className={styles.column}>
                        {column.id === "actions" ? (
                          <TableActions
                            id={row.id}
                            handleEdit={() =>
                              handleEdit(row.id, row.company.name, row.amount)
                            }
                            handleDelete={() =>
                              handleDelete(row.id, row.company.name)
                            }
                          />
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
        )}
      </div>
    </div>
  );
}
