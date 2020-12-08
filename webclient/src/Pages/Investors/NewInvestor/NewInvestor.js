import React from "react";
import {
  Dialog,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import NewInvestorForm from "../NewInvestorForm/NewInvestorForm";

const useStyles = makeStyles({
  root: {
    padding: "28px 22px 18px 32px",
    "& .MuiTypography-h6": {
      fontWeight: 700,
      fontSize: "24px",
      lineHeight: "32px",
      color: "#000000",
    },
  },
});

const INSERT_INVESTOR = gql`
  mutation InsertInvestor(
    $name: String!
    $profilePicUrl: String!
    $profilePicThumbNailUrl: String!
  ) {
    insert_investor(
      objects: {
        name: $name
        photo_large: $profilePicUrl
        photo_thumbnail: $profilePicThumbNailUrl
      }
    ) {
      returning {
        id
        name
        photo_large
        photo_thumbnail
        updated_at
        created_at
      }
    }
  }
`;

export default function NewInvestor({ title, open, handleDialog }) {

  const [addInvestor] = useMutation(INSERT_INVESTOR, {
    onCompleted: (addedData) => {
      handleAfterDataUpdate(addedData);
    },
  });
  const classes = useStyles();
  const history = useHistory();

  const handleAfterDataUpdate = (addedData) => {
    try {
      const id = addedData.insert_investor.returning[0].id;
      if (id) {
        return history.push(`/${id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (values) => {
    addInvestor({
      variables: {
        ...values
      },
    });
  };

  return (
    <Dialog
      open={open}
      fullWidth={true}
      onClose={() => handleDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.root}>{title}</DialogTitle>
      <NewInvestorForm 
        handleFormSubmit={(values) => handleSubmit(values)}
        closeDialog={() => handleDialog(false)} />
    </Dialog>
  );
}
