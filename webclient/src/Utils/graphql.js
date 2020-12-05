const { gql } = require("@apollo/client");

export const INSERT_COMPANY = gql`
mutation InsertInvestor($name: String!) {
  insert_company(objects: { name: "klj" }) {
    returning {
      name
      id
      created_at
    }
  }
}
`;