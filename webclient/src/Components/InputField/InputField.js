import React from "react";
import { makeStyles, TextField } from "@material-ui/core";
import styles from "./InputField.module.css";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-input::placeholder": {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "16px",
      color: "#888888",
    },
  },
});

export default function InputField({
  name,
  onTouched,
  placeholder,
  onValueChange,
  error,
  value,
  inputType,
}) {
  const classes = useStyles();

  return (
    <div className={styles["text-field"]}>
      <TextField
        value={value}
        onChange={onValueChange}
        onBlur={onTouched}
        placeholder={placeholder}
        fullWidth={true}
        error={error ? true : false}
        className={classes.root}
        helperText={error}
        type={inputType || "text"}
        name={name}
      />
    </div>
  );
}
