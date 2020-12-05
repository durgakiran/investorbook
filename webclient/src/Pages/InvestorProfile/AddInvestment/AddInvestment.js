import React from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import styles from "./AddInvestment.module.css";
import AddInvestorForm from "./AddInvestmentForm";
import { useStyles } from "../../../Utils/DialogStyles";

const INSERT_INVESTMENT = gql`
  mutation InsertInvestment(
    $companyId: Int!
    $investorId: Int!
    $amount: numeric
  ) {
    insert_investment(
      objects: {
        company_id: $companyId
        investor_id: $investorId
        amount: $amount
      }
    ) {
      returning {
        amount
        id
        company {
          name
        }
        investor {
          name
        }
      }
    }
  }
`;

export default function AddInvestment({
  investorId,
  open,
  handleAddInvestment,
}) {
  const classes = useStyles();

  const [addInvestor] = useMutation(INSERT_INVESTMENT, {
    onCompleted: (addedData) => {
      handleAfterDataUpdate(addedData);
    },
  });

  const handleDataUpdate = (values) => {
    console.log(values);
    addInvestor({
      variables: {
        ...values,
      },
    });
  };

  const handleAfterDataUpdate = () => {
    handleAddInvestment(false);
  };

  return (
    <Dialog fullWidth={true} open={open}>
      <DialogTitle className={classes.root}>
        Add Investment
        <div className={styles["sub-title"]}>
          Please Enter the Details of the Investment
        </div>
      </DialogTitle>
      <AddInvestorForm
        closeDialog={() => handleAddInvestment(false)}
        id={investorId}
        handleFormSubmit={handleDataUpdate}
      />
    </Dialog>
  );
}
