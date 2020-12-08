import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./Investments.module.css";
import { CircularProgress } from "@material-ui/core";

export const GET_INVESTMENTS = gql`
  query GetInvestments($investorId: Int!) {
    investment(where: { investor_id: { _eq: $investorId } }) {
      company_id
      company {
        name
      }
    }
  }
`;

export default function Investments({ id }) {
  const { loading, error, data } = useQuery(GET_INVESTMENTS, {
    variables: { investorId: id },
  });

  if (loading) {
    return (
      <div>
        <CircularProgress color="primary" />
      </div>
    );
  }
  if (error) {
    return <p>error</p>;
  }
  if (data.investment.length === 0) return <span className={styles.investment}>No Investments!</span>;

  return data.investment.map((value, index) => {
    return (
      <span key={index} className={styles.investment}>
        { index > 0 ? ', ' : '' } {value.company.name}
      </span>
    );
  });
}
