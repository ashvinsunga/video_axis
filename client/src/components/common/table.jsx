import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      {/* data is used, instead of movies to make the components reusable */}
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
