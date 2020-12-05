import React, { useState } from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import SnackBarElement from "../../../Components/SnackBar/SnackBar";
import { useStyles } from "../../../Utils/DialogStyles";
import { INSERT_COMPANY } from "../../../Utils/graphql";
import NewCompanyForm from "../NewCompanyForm/NewCompanyForm";

export default function NewCompany({ title, open, handleDialog }) {
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [addInvestor] = useMutation(INSERT_COMPANY, {
    onCompleted: (addedData) => {
      handleAfterDataUpdate(addedData);
    },
  });
  const classes = useStyles();

  const handleAfterDataUpdate = (addedData) => {
    try {
      handleDialog(false);
      setMessage("company Added");
      setSeverity("success");
      setIsSnackBarOpen(true);
    } catch (e) {
      setMessage("Unable to add company");
      setSeverity("error");
      setIsSnackBarOpen(true);
    }
  };

  const handleSubmit = (values) => {
    addInvestor({
      variables: {
        ...values,
      },
    });
  };

  return (
    <div className="dialogContainer">
      <SnackBarElement
        open={isSnackBarOpen}
        severity={severity}
        duration={3000}
        message={message}
        handleClose={() => setIsSnackBarOpen(false)}
      />
      <Dialog
        open={open}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.root}>{title}</DialogTitle>
        <NewCompanyForm
          handleFormSubmit={handleSubmit}
          closeDialog={() => handleDialog(false)}
        />
      </Dialog>
    </div>
  );
}
