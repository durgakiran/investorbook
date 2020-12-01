import React, { useState } from "react";
import { IconButton, TextField } from "@material-ui/core";
import searchIcon from "./search-icon.svg";
import styles from "./SearchBar.module.css";

export default function SearchBar({ placeholder, handleInput }) {
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  let timerId;

  const handleSearchInput = (value) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      handleInput(value);
    }, 300);
  };

  return (
    <div>
      {!isSearchBarActive && (
        <IconButton
          aria-label="search"
          onClick={() => setIsSearchBarActive(true)}
        >
          <img src={searchIcon} alt="search" />
        </IconButton>
      )}
      {isSearchBarActive && (
        <div className={styles.searchBar}>
          <TextField
            placeholder={placeholder}
            type="search"
            fullWidth={true}
            onChange={({ target: { value } }) => handleSearchInput(value)}
          />
        </div>
      )}
    </div>
  );
}
