import React, { useState } from "react";
import { TablePagination } from "@material-ui/core";
import  TableTitle from "../../Components/TableTitle/TableTitle";
import CompaniesTable from "./CompaniesTable/CompaniesTable";
import NewCompany from "./NewCompany/NewCompany";

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
}
