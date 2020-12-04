import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputField from "../../../Components/InputField/InputField";
import { gql, useMutation, useQuery } from "@apollo/client";
import styles from "./AddInvestment.module.css";

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

const useDialogStyles = makeStyles({
  root: {
    padding: "28px 22px 18px 32px",
  },
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
    textTransform: 'capitalize'
  },
});

const GET_INVESTORS = gql`
  query GetCompanies($searchQuery: String!) {
    company(limit: 40, where: { name: { _like: $searchQuery } }) {
      id
      name
    }
  }
`;

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
  const [query, setQuery] = useState("");
  const [openAutoSuggest, setOpenAutoSuggest] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [amount, setAmount] = useState();
  const { loading, error, data } = useQuery(GET_INVESTORS, {
    variables: { searchQuery: `%${query}%` },
  });
  const classes = useStyles();
  const dialogClasses = useDialogStyles();
  const buttonClasses = useButtonStyles();
  const buttonClasses2 = useButtonStyles2();

  const [addInvestor] = useMutation(INSERT_INVESTMENT, {
    onCompleted: (addedData) => {
      handleAfterDataUpdate(addedData);
    },
  });

  const handleDataUpdate = (event) => {
    console.log(investorId);
    addInvestor({
      variables: {
        companyId: companyId,
        investorId: investorId,
        amount: Number(amount).toFixed(2),
      },
    });
    event.preventDefault();
  };

  const handleAfterDataUpdate = () => {
    handleAddInvestment(false);
  };

  if (error) {
    return <div>Error : (</div>;
  }

  return (
    <Dialog fullWidth={true} open={open}>
      <DialogTitle className={classes.root}>
        Add Investment
        <div className={styles["sub-title"]}>
          Please Enter the Details of the Investment
        </div>
      </DialogTitle>
      <form onSubmit={handleDataUpdate}>
        <DialogContent className={dialogClasses.root}>
          <Autocomplete
            id="combo-box-demo"
            fullWidth={true}
            open={openAutoSuggest}
            onOpen={() => setOpenAutoSuggest(true)}
            onClose={() => setOpenAutoSuggest(false)}
            options={data ? data.company : []}
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => {
              return option.id === value.id;
            }}
            onChange={(event, newValue) => {
              setCompanyId(newValue.id);
            }}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Companies"
                onChange={({ target: { value } }) => setQuery(value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <InputField
            inputType="number"
            placeholder="Investment Amount"
            validations={[
              { type: "required" },
              { type: "pattern", pattern: "^[1-9][0-9]+$" },
            ]}
            onValueChange={({ isFormValid, value }) => setAmount(value)}
          />
        </DialogContent>
        <DialogActions className={dialogClasses.root}>
          <Button
            className={buttonClasses2.root}
            type="button"
            onClick={() => handleAddInvestment(false)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className={buttonClasses.root}
            variant="contained"
            type="submit"
          >
            Add Investment
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
