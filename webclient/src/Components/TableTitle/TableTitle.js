import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import styles from "./TableTitle.module.css";
import SearchBar from "../SearchBar/SearchBar";


const useStyles = makeStyles({
  root: {
    fontWeight: 500,
    border: '1px solid #616DD7;',
    textTransform: 'capitalize',
    boxSizing: "border-box",
    '& .MuiButton-label': {
      fontSize: '14px'
    }
  }
});

const typographyStyles = makeStyles({
  root: {
    fontSize: '1.8rem',
    fontWeight: '500'
  }
});

export default ({ title, buttonText, handleInput, handleDialog }) => {

  const classes = useStyles();
  const h5Styles = typographyStyles();


  return (
    <div className={styles["table-header"]}>
      <div role="heading" className={styles["table-title"]}>
        <Typography variant="h5" className={h5Styles.root}>
          {title || 'Investors'}
        </Typography>
      </div>
      <Button
        variant="outlined"
        onClick={() => handleDialog(true)}
        color="primary"
        className={classes.root}
      >
        {buttonText}
      </Button>
      <div className={styles["occ-space"]}></div>
      <SearchBar handleInput={handleInput} placeholder={`Search ${title || "Investors"}`} />
    </div>
  );
};
