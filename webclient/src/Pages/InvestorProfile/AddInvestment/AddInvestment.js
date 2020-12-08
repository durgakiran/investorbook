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


const UPDATE_INVESTMENT = gql`
  mutation UpdateInvestment($Id: Int!, $amount: numeric!) {
    update_investment(where: { id: { _eq: $Id } }, _set: {amount: $amount}) {
      returning {
        id
        amount
        company {
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
  actionId,
  previousAmount,
  companyName
}) {
  const classes = useStyles();

  const [addInvestor] = useMutation(INSERT_INVESTMENT, {
    onCompleted: (addedData) => {
      handleAfterDataUpdate(addedData);
    },
  });

  const [updateInvestment] = useMutation(UPDATE_INVESTMENT, {
    onCompleted: (updatedData) => {
      handleAfterDataUpdate(updatedData);
    },
  });

  const handleDataUpdate = (values) => {
    if(actionId) {
      updateInvestment({
        variables: {
          Id: actionId,
          amount: values.amount
        }
      });
    } else {
      addInvestor({
        variables: {
          ...values,
        },
      });
    }
  };

  const handleAfterDataUpdate = () => {
    handleAddInvestment(false);
  };

  return (
    <Dialog fullWidth={true} onClose={() => handleAddInvestment(false)} open={open}>
      <DialogTitle className={classes.root}>
        { actionId ?  `Edit Investment: ${companyName}` : "Add Investment"}
        <div className={styles["sub-title"]}>
          Please Enter the Details of the Investment
        </div>
      </DialogTitle>
      <AddInvestorForm
        closeDialog={() => handleAddInvestment(false)}
        id={investorId}
        handleFormSubmit={handleDataUpdate}
        previousAmount={previousAmount}
        companyId={actionId}
        companyName={companyName}
      />
    </Dialog>
  );
}
