import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from './CompanyInvestors.module.css';

const GET_INVESTMENTS = gql`
  query GetInvestors($companyId: Int!) {
    investment(where: { company_id:{_eq:  $companyId} }) {
      investor_id,
      investor {
          name
      }
    }
  }
`;

export default function CompanyInvestors({ id }) {
  const { loading, error, data } = useQuery(GET_INVESTMENTS, {
    variables: { companyId: id },
  });


  if(loading) {
      return <p>Loading...</p>;
  }
  if(error) {
      return <p>error</p>
  }
  if (data.investment.length === 0) return <p>No Investors found!</p>;

  return (
      data.investment.map((value, index) => {
          return <span key={index} className={styles.investment}>{value.investor.name}, </span>
      })
  )
}
