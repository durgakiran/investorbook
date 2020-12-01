import { Button, IconButton, TextField } from "@material-ui/core";
import React from "react";
import styles from "./TableTitle.module.css";
import SearchBar from "../SearchBar/SearchBar";

export default ({ title, buttonText, handleInput, handleDialog }) => {
  return (
    <div className={styles["table-header"]}>
      <div role="heading" className={styles["table-title"]}>
        {title || "Investors"}
      </div>
      <Button
        variant="outlined"
        onClick={() => handleDialog(true)}
        color="primary"
      >
        {buttonText}
      </Button>
      <div className={styles["occ-space"]}></div>
      <SearchBar handleInput={handleInput} placeholder={`Search ${title || "Investors"}`} />
    </div>
  );
};
