import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import styles from "./TableTitle.module.css";
import SearchBar from "../SearchBar/SearchBar";


const useStyles = makeStyles({
  root: {
    fontWeight: 500,
    border: '1.4px solid #616DD7;',
    textTransform: 'capitalize'
  }
})

export default ({ title, buttonText, handleInput, handleDialog }) => {

  const classes = useStyles();


  return (
    <div className={styles["table-header"]}>
      <div role="heading" className={styles["table-title"]}>
        <Typography variant="h5">
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
