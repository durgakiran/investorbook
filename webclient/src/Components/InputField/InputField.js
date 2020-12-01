import React, { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import styles from './InputField.module.css';

const useStyles = makeStyles({
    root: {
        '& .MuiInputBase-input::placeholder': {
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '16px',
            color: '#888888'
        }
    }
})

function isEmpty(value) {
    if(typeof value === 'number' && value === 0 ) {
        return false;
    }

    return !value;
}

function matchPattern(value, pattern) {
    const regex = new RegExp(pattern);
    return regex.test(value);
}

export default function InputField({ placeholder, onValueChange, validations }) {
  const [error, setError] = useState();
  const classes = useStyles();
  

  const handleInput = (value) => {
    /**
     * errors only takes required, pattern, minLength and maxLength
     */
    if(!Array.isArray(validations)) {
        throw TypeError(`must be array of validation functions, given ${validations}`);
    }

    for(let i = 0; i<validations.length; i += 1 ) {
        if(validations[i].type === 'required' && isEmpty(value)) {
            setError('Field is required');
            break;
        }
        if(validations[i].type === 'pattern' && matchPattern(validations[i].pattern) ) {
            setError('Invalid Pattern');
            break;
        }
        if(validations[i].type === 'minLength' &&  value.length < validations[i].value ) {
            console.log('this should work first');
            setError(`must be ${validations[i].value} characters long`);
            break;
        }
        if(validations[i].type === 'maxLength' &&  value.length >= validations[i].value ) {
            setError(`must be less than ${validations[i].value} characters long`);
            break;
        }

        setError('');
    }

    console.log(error);
    onValueChange({ value: value, isFormValid: error ? false: true });
  }


  return (
    <div className={styles["text-field"]}>
      <TextField
        onChange={({ target: { value } }) => handleInput(value)}
        placeholder={placeholder}
        fullWidth={true}
        error={error ? true : false}
        className={classes.root}
        helperText={error}
      />
    </div>
  );
}
