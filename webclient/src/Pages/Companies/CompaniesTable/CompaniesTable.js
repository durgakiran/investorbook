import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import Table from "../../../Components/Table/Table";
import CompanyInvestors from "../CompanyInvestors/CompanyInvestors";
import styles from './CompaniesTable.module.css';

const GET_INVESTORS = gql`
  query GetInvestors($searchQuery: String!, $skip: Int!, $pageSize: Int!) {
    company(limit: $pageSize, offset: $skip, where: { name: { _like: $searchQuery } }) {
      id
      name
    }
    company_aggregate(distinct_on: id, where: { name: { _like: $searchQuery } }) {
      aggregate {
        count
      }
    }
  }
`;

export default function CompaniesTable({
  query,
  currentPage,
  pageSize,
  onCountChange,
}) {
  const columnMappings = [
    { id: "name", column: "Name" },
    { id: "investments", column: "Investors" },
  ];

  const { loading, error, data } = useQuery(GET_INVESTORS, {
    variables: {
      searchQuery: `%${query}%`,
      skip: currentPage * pageSize,
      pageSize: pageSize,
    },
  });

  useEffect(() => {
    onCountChange(
      data && data.company_aggregate
        ? data.company_aggregate.aggregate.count
        : 0
    );
  });

  if (loading) {
      return (
          <div>
            <CircularProgress color="primary" />
          </div>
      )
  };
  if (error) return <p>Error :(</p>;
  if (data.company.length === 0) return <p>No Companies</p>;

  return (
    <Table columns={columnMappings} data={[]}>
      {data.company.map((datum) => {
        return (
          <tr key={datum.id}>
            {columnMappings.map((value) => {
              if (value.id === "name") {
                return (
                  <td key={datum[value.id]} className={styles['pl-10'] + ' ' + styles['w-300']}>
                      <div className={styles["company-name"]}>
                            {datum[value.id]}
                      </div>
                  </td>
                );
              }
              return (
                <td key={value.id} className={styles['pl-10']}>
                  <CompanyInvestors id={datum.id} />
                </td>
              );
            })}
          </tr>
        );
      })}
    </Table>
  );
}
