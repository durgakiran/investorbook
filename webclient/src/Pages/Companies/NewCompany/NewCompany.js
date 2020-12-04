import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import InputField from "../../../Components/InputField/InputField";
import SnackBarElement from "../../../Components/SnackBar/SnackBar";


const useStyles = makeStyles({
  root: {
    padding: '28px 22px 18px 32px',
    "& .MuiTypography-h6": {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: "32px",
      color: "#000000",
    },
  },
});

const useDialogStyles = makeStyles({
  root: {
    padding: '28px 22px 18px 32px'
  }
});


const useButtonStyles = makeStyles({
  root: {
    backgroundColor: "#434FBC",
    borderRadius: "4px",
    textTransform: "capitalize",
    boxShadow: "none",
  },
});

const useButtonStyles2 = makeStyles({
  root: {
    fontWeight: 500,
    fontSize: "13px",
    lineHeight: "12px",
    color: "#434FBC",
    textTransform: "capitalize",
  },
});

const INSERT_COMPANY = gql`
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

export default function NewCompany({ title, open, handleDialog }) {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [addInvestor, { loading }] = useMutation(INSERT_COMPANY, {
    onCompleted: (addedData) => {
      handleAfterDataUpdate(addedData);
    },
  });
  const classes = useStyles();
  const dialogClasses = useDialogStyles();
  const buttonClasses = useButtonStyles();
  const buttonClasses2 = useButtonStyles2();

  const handleAfterDataUpdate = (addedData) => {
    try {
      console.log(addedData);
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

  const handleSubmit = (event) => {
    addInvestor({
      variables: {
        name: name,
      },
    });
    event.preventDefault();
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
        <form onSubmit={handleSubmit}>
          <DialogContent className={dialogClasses.root}>
            <InputField
              placeholder="Company Name"
              validations={[
                { type: "required" },
                { type: "minLength", value: 3 },
              ]}
              onValueChange={({ value, isFormValid }) => {
                setName(value);
                setIsNameValid(isFormValid);
              }}
            />
          </DialogContent>
          <DialogActions className={dialogClasses.root}>
            <Button type="button" 
            className={buttonClasses2.root}
            onClick={() => handleDialog(false)}>
              Cancel
            </Button>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                className={buttonClasses.root}
                disabled={!isNameValid}
                type="submit"
                color="primary"
              >
                Add Company
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
