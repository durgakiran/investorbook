import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Table from "../../../Components/Table/Table";
import Investor from "../Investor/Investor";
import Investments from "../Investments/Investments";
import { CircularProgress } from "@material-ui/core";
import styles from './InvestorTable.module.css';

export const SEARCH_INVESTORS = gql`
  query SearchInvestors($searchQuery: String!, $skip: Int!, $pageSize: Int!) {
    investor(
      limit: $pageSize
      offset: $skip
      where: { name: { _like: $searchQuery } }
    ) {
      id
      name
      photo_large
      photo_thumbnail
    }
    investor_aggregate(
      distinct_on: id
      where: { name: { _like: $searchQuery } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export default function InvestorsTable({
  query,
  currentPage,
  pageSize,
  onCountChange,
}) {
  const columnMappings = [
    { id: "name", column: "Name" },
    { id: "investments", column: "Investments" },
  ];

  const { loading, error, data } = useQuery(SEARCH_INVESTORS, {
    variables: {
      searchQuery: `%${query}%`,
      skip: currentPage * pageSize,
      pageSize: pageSize,
    },
  });

  useEffect(() => {
    onCountChange(
      data && data.investor_aggregate
        ? data.investor_aggregate.aggregate.count
        : 0
    );
  });

  if (loading)
    return (
      <div>
        <CircularProgress color="primary" />
      </div>
    );
  if (error) return <p>Error :(</p>;
  if (data.investor.length === 0) return <p>The database is empty!</p>;

  return (
    <Table columns={columnMappings} data={[]}>
      {data.investor.map((datum) => {
        return (
          <tr key={datum.id}>
            {columnMappings.map((value) => {
              if (value.id === "name") {
                return (
                  <td key={datum[value.id]} className={styles["w-300"]}>
                    <Investor
                      name={datum[value.id]}
                      id={datum.id}
                      photo_thumbnail={datum["photo_thumbnail"]}
                    />
                  </td>
                );
              }
              return (
                <td key={value.id} className={styles.column}>
                  <Investments id={datum.id} />
                </td>
              );
            })}
          </tr>
        );
      })}
    </Table>
  );
}
