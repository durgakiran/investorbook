import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  TextField,
} from "@material-ui/core";
import InputField from "../../../Components/InputField/InputField";
import { useButtonStyles, useButtonStyles2 } from "../../../Utils/ButtonStyles";
import { useDialogStyles } from "../../../Utils/DialogStyles";
import { validate } from "../../../Utils/Validator";
import { gql, useQuery } from "@apollo/client";
import Autocomplete from "@material-ui/lab/Autocomplete";

const GET_INVESTORS = gql`
  query GetCompanies($searchQuery: String!) {
    company(limit: 40, where: { name: { _like: $searchQuery } }) {
      id
      name
    }
  }
`;

export default function AddInvestorForm({
  id,
  companyId,
  companyName,
  previousAmount,
  closeDialog,
  handleFormSubmit,
}) {
  const dialogClasses = useDialogStyles();
  const buttonClasses = useButtonStyles();
  const buttonClasses2 = useButtonStyles2();
  const [query, setQuery] = useState("");
  const [openAutoSuggest, setOpenAutoSuggest] = useState(false);
  const { loading, data } = useQuery(GET_INVESTORS, {
    variables: { searchQuery: `%${query}%` },
  });

  const [form, setForm] = useState({
    formControls: {
      companyId: {
        value: companyId ? companyId : "",
        placeholder: "Select Company",
        valid: companyId ? true : false,
        touched: false,
        message: "",
        validationRules: [{ type: "required", value: "true" }],
      },
      investorId: {
        value: id,
        placeholder: "Select Investor",
        valid: id ? true : false,
        touched: false,
        message: "",
        validationRules: [{ type: "required", value: "true" }],
      },
      amount: {
        value: previousAmount ? previousAmount : "",
        placeholder: "Investment Amount",
        valid: false,
        touched: false,
        message: "",
        validationRules: [{ type: "required", value: "true" }],
      },
    },
    formIsValid: false,
  });

  const changeHandler = (event) => {
    if (!event) return;

    const { name, value } = event.target;

    const updatedControls = {
      ...form.formControls,
    };

    const updatedElement = {
      ...updatedControls[name],
    };

    updatedElement.value = value;
    updatedElement.touched = true;
    const { message, isValid } = validate(
      value,
      updatedElement.validationRules
    );
    updatedElement.valid = isValid;
    updatedElement.message = message;

    updatedControls[name] = updatedElement;

    let _formIsValid = true;
    for (const ele in updatedControls) {
      _formIsValid = updatedControls[ele].valid && _formIsValid;
    }

    setForm({
      formControls: {
        ...updatedControls,
      },
      formIsValid: _formIsValid,
    });
  };

  const getFormValues = () => {
    const values = {};
    for (const ele in form.formControls) {
      values[ele] = form.formControls[ele].value;
    }
    return values;
  };

  const formSubmitHandler = (event) => {
    handleFormSubmit(getFormValues());
    event.preventDefault();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <DialogContent className={dialogClasses.root}>
        {!companyId ? (
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
              changeHandler({
                target: { name: "companyId", value: newValue.id },
              });
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
        ) : null}
        <InputField
          placeholder={form.formControls.amount.placeholder}
          name="amount"
          inputType="number"
          value={
            form.formControls.amount.value ? form.formControls.amount.value : ""
          }
          validations={[{ type: "required" }, { type: "minLength", value: 3 }]}
          onValueChange={(event) => {
            changeHandler(event);
          }}
          onTouched={(event) => {
            changeHandler(event);
          }}
          error={form.formControls.amount.message}
        />
      </DialogContent>
      <DialogActions className={dialogClasses.root}>
        <Button
          type="button"
          className={buttonClasses2.root}
          onClick={closeDialog}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className={buttonClasses.root}
          disabled={!form.formIsValid}
          type="submit"
          color="primary"
        >
          Add Company
        </Button>
      </DialogActions>
    </form>
  );
}
