import React, { useState } from "react";
import { Button, DialogActions, DialogContent } from "@material-ui/core";
import InputField from "../../../Components/InputField/InputField";
import { useButtonStyles, useButtonStyles2 } from "../../../Utils/ButtonStyles";
import { useDialogStyles } from "../../../Utils/DialogStyles";
import { validate } from "../../../Utils/Validator";

export default function NewCompanyForm({ closeDialog, handleFormSubmit }) {
  const dialogClasses = useDialogStyles();
  const buttonClasses = useButtonStyles();
  const buttonClasses2 = useButtonStyles2();

  const [form, setForm] = useState({
    formControls: {
      name: {
        value: "",
        placeholder: "Company Name",
        valid: false,
        touched: false,
        message: '',
        validationRules: [
          { type: "required", value: "true" },
          { type: "minLength", value: 3 },
        ],
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
    for(const ele in form.formControls) {
      values[ele] = form.formControls[ele].value;
    }
    return values;
  }

  const formSubmitHandler = (event) => {
    handleFormSubmit(getFormValues());
    event.preventDefault();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <DialogContent className={dialogClasses.root}>
        <InputField
          placeholder="Company Name"
          name="name"
          validations={[{ type: "required" }, { type: "minLength", value: 3 }]}
          onValueChange={(event) => {
            changeHandler(event);
          }}
          onTouched={(event) => {
            changeHandler(event);
          }}
          error={form.formControls.name.message}
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
