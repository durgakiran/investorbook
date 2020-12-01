import React, { useState } from "react";
import { TablePagination } from "@material-ui/core";
import TableTitle from "../../Components/TableTitle/TableTitle";
import InvestorsTable from "./InvestorTable/InvestorTable";
import NewInvestor from "./NewInvestor/NewInvestor";

export default () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [ pageSize ] = useState(6);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const handleInput = (value) => {
    setQuery(value);
  };

  const handleDialog = (value) => {
    setOpen(value);
  };

  return (
    <>
      <TableTitle
        buttonText="Add Investor"
        handleInput={handleInput}
        handleDialog={handleDialog}
      />
      <NewInvestor open={open} title='Add Investor' handleDialog={handleDialog} />
      <InvestorsTable
        query={query}
        currentPage={currentPage}
        pageSize={pageSize}
        onCountChange={setCount}
      />
      <TablePagination
        component="div"
        count={count}
        page={currentPage}
        rowsPerPage={6}
        rowsPerPageOptions={[6]}
        onChangePage={(event, newPage) => setCurrentPage(newPage)}
      />
    </>
  );
};
