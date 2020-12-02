import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputField from "../../../Components/InputField/InputField";
import { gql, useMutation, useQuery } from "@apollo/client";
import SnackBarElement from "../../../Components/SnackBar/SnackBar";

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
  const [showSnackBar, setShowSnackBar] = useState();
  const { loading, error, data } = useQuery(GET_INVESTORS, {
    variables: { searchQuery: `%${query}%` },
  });

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
    setShowSnackBar(true);
    handleAddInvestment(false);
  };

  if (error) {
    return <div>Error : (</div>;
  }

  return (
    <Dialog fullWidth={true} open={open}>
      {showSnackBar && (
        <SnackBarElement
          open={showSnackBar}
          duration={3000}
          message="Added Successfully"
          handleClose={() => setShowSnackBar(false)}
        />
      )}
      <DialogTitle>
        Add Investment
        <div>Please Enter the Details of the Investment</div>
      </DialogTitle>
      <form onSubmit={handleDataUpdate}>
        <DialogContent>
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
        <DialogActions>
          <Button type="button" onClick={() => handleAddInvestment(false)}>
            Cancel
          </Button>
          <Button type="submit">Add Investment</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
