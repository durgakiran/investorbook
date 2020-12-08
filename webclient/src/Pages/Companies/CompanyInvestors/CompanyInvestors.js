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
  if (data.investment.length === 0) return <span className={styles.investment}>No Investors found!</span>;

  return (
      data.investment.map((value, index) => {
          const prefix = (index > 0) ? ', ' : ''
          return (
            <>
              <span>{prefix}</span>
              <span key={index} className={styles.investment}>{value.investor.name} </span>
            </>
          )
      })
  )
}
