import React, { useState } from "react";
import  TableTitle from "../../Components/TableTitle/TableTitle";
import CompaniesTable from "./CompaniesTable/CompaniesTable";
import NewCompany from "./NewCompany/NewCompany";
import Paginator from "../../Components/Paginator/Paginator";

export default function Companies() {
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
        title="Companies"
        buttonText="Add Company"
        handleInput={handleInput}
        handleDialog={handleDialog}
      />
      <NewCompany open={open} title='Add Company' handleDialog={handleDialog} />
      <CompaniesTable 
      query={query} 
      currentPage={currentPage}
      pageSize={pageSize}
      onCountChange={setCount}/>
      <Paginator 
        count={count}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}/>
    </>
  );
}
