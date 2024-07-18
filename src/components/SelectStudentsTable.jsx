import React, { useEffect, useMemo, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const SelectStudentsTable = (props) => {
  const { loading, students, selectedStudent, sendStudent } = props;

  // const handleDownload = () => {};

  const GlobalResFilter = ({ filter, setFilter }) => {
    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    }, [filter]);
    return (
      <span className="d-flex ms-auto">
        <input
          ref={inputRef}
          defaultValue={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          className="form-control mb-4"
          placeholder="Search..."
        />
      </span>
    );
  };

  const headersColumn = (name, value2) => {
    return {
      Header: (props) => (
        <div style={{ textAlign: "left" }}>
          <span>{name.toUpperCase()}</span>
        </div>
      ),
      accessor: value2 ? value2 : "no",
      className: "text-center wd-15p border-bottom-0",
      id: name,
      Cell: (props) => <div style={{ textAlign: "left" }}>{props.value}</div>,
    };
  };

  const COLUMN = useMemo(
    () => [
      {
        accessor: "_id",
        className: "text-center wd-15p border-bottom-0",
        isSorted: "true",

        Cell: (props) => (
          <div style={{ textAlign: "left" }}>
            <span>{props.cell.row.index + 1}</span>
          </div>
        ),
        Header: (props) => (
          <div style={{ textAlign: "left" }}>
            <span>Sr No</span>
          </div>
        ),
      },
      headersColumn("Name", "firstName"),
      {
        Header: "Actions",
        accessor: "invoice",
        className: "text-center wd-5dp border-bottom-0",

        // className: "text-center wd-15p border-bottom-0",

        Cell: (props) => (
          <>
            <div>
              <i
                className={`btn add_button me-3 mt-2 ${
                  selectedStudent.find(
                    (selectedStudent) =>
                      selectedStudent._id === props.cell.row.original._id
                  )
                    ? "btn-success"
                    : "btn-primary"
                }`}
                aria-hidden="true"
                onClick={(event) => {
                  sendStudent(event, props.cell.row.original);
                }}
              >
                {selectedStudent.find(
                  (selectedStudent) =>
                    selectedStudent._id === props.cell.row.original._id
                )
                  ? "Added"
                  : "Add"}
              </i>
              {/* <i>
                {selectedStudent.find(
                  (selectedStudent) =>
                    selectedStudent._id === props.cell.row.original._id
                ) ? (
                  <button
                    className="btn btn-secondary download_button me-3 mt-2"
                    onClick={(event) => {
                      handleDownload(event, props.cell.row.original);
                    }}
                  >
                    Download Certificate!
                  </button>
                ) : null}
              </i> */}
            </div>
          </>
        ),
      },
    ],
    [selectedStudent, sendStudent]
  );

  const tableInstance = useTable(
    {
      columns: COLUMN,
      data: students,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps, // table props from react-table
    headerGroups, // headerGroups, if your table has groupings
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    page, // use, page or rows
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    // pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = tableInstance;
  const { globalFilter, pageSize } = state;
  return (
    <div className="table-responsive">
      {loading ? (
        <div className="dimmer active">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="e-table px-5 pb-5">
          <div className="d-flex">
            <select
              className="mb-4 form-select w-25 table-border me-1"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <GlobalResFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </div>

          <Table
            {...getTableProps()}
            className="table-bordered text-nowrap border-bottom"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={column.className}
                    >
                      <span className="tabletitle">
                        {column.render("Header")}
                      </span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fa fa-angle-down"></i>
                          ) : (
                            <i className="fa fa-angle-up"></i>
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr className="text-center" {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="d-block d-sm-flex mt-4 ">
            <span className="">
              Page{" "}
              <strong>{/* {pageIndex + 1} of {pageOptions.length} */}</strong>{" "}
            </span>
            <span className="ms-sm-auto ">
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-2 d-sm-inline d-block"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {" Previous "}
              </Button>
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-2"
                onClick={() => {
                  previousPage();
                }}
                disabled={!canPreviousPage}
              >
                {" << "}
              </Button>
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-2"
                onClick={() => {
                  previousPage();
                }}
                disabled={!canPreviousPage}
              >
                {" < "}
              </Button>
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-2"
                onClick={() => {
                  nextPage();
                }}
                disabled={!canNextPage}
              >
                {" > "}
              </Button>
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-2"
                onClick={() => {
                  nextPage();
                }}
                disabled={!canNextPage}
              >
                {" >> "}
              </Button>
              <Button
                variant=""
                className="btn-default tablebutton me-2 my-2"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {" Next "}
              </Button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectStudentsTable;
