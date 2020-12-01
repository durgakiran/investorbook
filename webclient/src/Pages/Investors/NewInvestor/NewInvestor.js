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
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
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
    $photo_large: String!
    $photo_thumbnail: String!
  ) {
    insert_investor(
      objects: {
        name: $name
        photo_large: $photo_large
        photo_thumbnail: $photo_thumbnail
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
  const [name, setName] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [profilePicUrlThumbnail, setProfilePicUrlThumbnail] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isProfilePicUrlValid, setIsProfilePicUrlValid] = useState(false);
  const [
    isProfilePicUrlThumbnailValid,
    setIsProfilePicUrlThumbnailValid,
  ] = useState(false);

  const [addInvestor, { loading, error, data }] = useMutation(INSERT_INVESTOR, {
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

  const handleSubmit = (event) => {
    addInvestor({
      variables: {
        name: name,
        photo_large: profilePicUrl,
        photo_thumbnail: profilePicUrlThumbnail,
      },
    });
    event.preventDefault();
  };

  return (
    <div className="dialogContainer">
      <Dialog
        open={open}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.root}>{title}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <InputField
              placeholder="Investor Name"
              validations={[
                { type: "required" },
                { type: "minLength", value: 3 },
              ]}
              onValueChange={({ value, isFormValid }) => {
                setName(value);
                setIsNameValid(isFormValid);
              }}
            />
            <InputField
              placeholder="Investor Profile URl"
              validations={[
                { type: "required" },
                { type: "minLength", value: 3 },
              ]}
              onValueChange={({ value, isFormValid }) => {
                setProfilePicUrl(value);
                setIsProfilePicUrlValid(isFormValid);
              }}
            />
            <InputField
              placeholder="Investor Profile ThumbNail"
              validations={[
                { type: "required" },
                { type: "minLength", value: 3 },
              ]}
              onValueChange={({ value, isFormValid }) => {
                setProfilePicUrlThumbnail(value);
                setIsProfilePicUrlThumbnailValid(isFormValid);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={() => handleDialog(false)}>
              Cancel
            </Button>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                disabled={
                  !isNameValid ||
                  !isProfilePicUrlValid ||
                  !isProfilePicUrlThumbnailValid
                }
                type="submit"
                color="primary"
              >
                Add Investor
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
