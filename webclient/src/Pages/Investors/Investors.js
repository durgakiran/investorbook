import React, { useState } from "react";
import TableTitle from "../../Components/TableTitle/TableTitle";
import InvestorsTable from "./InvestorTable/InvestorTable";
import NewInvestor from "./NewInvestor/NewInvestor";
import Paginator from "../../Components/Paginator/Paginator";

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
      <InvestorsTable
        query={query}
        currentPage={currentPage}
        pageSize={pageSize}
        onCountChange={setCount}
      />
      <Paginator 
        count={count}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}/>
      <NewInvestor open={open} title='Add Investor' handleDialog={handleDialog} />
    </>
  );
};
