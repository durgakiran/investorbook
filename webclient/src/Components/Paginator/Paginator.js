import React from "react";
import { makeStyles, TablePagination } from "@material-ui/core";
import styles from "./Paginator.module.css";

const useStyles = makeStyles({
  root: {
    '& .MuiTablePagination-caption': {
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "11px",
      color: "#000000",
    },
    '& .MuiSelect-select': {
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "11px",
      color: "#000000",
      display: 'flex',
      alignItems: 'flex-end'
    }
  },
});

function customLabelDisplayedRows({ from, to, count }) {
  return `${from}-${to} of ${
    count !== -1
      ? String(count).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      : `more than ${to}`
  }`;
}

export default function Paginator({ count, currentPage, handlePageChange }) {

  const classes = useStyles();


  return (
    <div className={styles["pagination-container"]}>
      <TablePagination
        component="div"
        count={count}
        page={currentPage}
        rowsPerPage={6}
        className={classes.root}
        labelDisplayedRows={customLabelDisplayedRows}
        rowsPerPageOptions={[6, 12, 36]}
        onChangePage={(event, newPage) => handlePageChange(newPage)}
      />
    </div>
  );
}
