import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createPdf } from "../utility/CreatePdf";

const DownloadCertificate = (props) => {
  //   const [pdfUrl_state, setPdfUrl] = useState(null);

  const { loading, courses, studentDetails } = props;
  const navigate = useNavigate();

  //   const createPdf = useCallback(async (course) => {
  //     const pngUrl = "https://i.imgur.com/vZUkyNN.png?1";

  //     const pdfDoc = await PDFDocument.create();
  //     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  //     const page = pdfDoc.addPage([1000, 770]);
  //     const { width, height } = page.getSize();
  //     const fontSize = 36;

  //     const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());

  //     const pngImage = await pdfDoc.embedPng(pngImageBytes);

  //     const pngDims = pngImage.scale(0.5);

  //     page.drawImage(pngImage, {
  //       x: page.getWidth() / 2 - pngDims.width / 2,
  //       y: page.getHeight() / 2 - pngDims.height + 385,
  //       width: pngDims.width,
  //       height: pngDims.height,
  //     });
  //     page.drawText(studentDetails.firstName, {
  //       x: width / 2 - fontSize - 50,
  //       y: height - 4 * fontSize - 250,
  //       size: fontSize,
  //       font: timesRomanFont,
  //       color: rgb(0, 0.53, 0.71),
  //     });
  //     const courseSize = 18;
  //     page.drawText(course.name, {
  //       x: width / 2 - courseSize - 50,
  //       y: height - 4 * courseSize - 368,
  //       size: courseSize,
  //       font: timesRomanFont,
  //       color: rgb(1, 0, 0),
  //     });
  //     const dateSize = 18;
  //     page.drawText(" 2ND JANUARY TO 31ST MARCH ", {
  //       x: dateSize + 550,
  //       y: height - 4 * dateSize - 405,
  //       size: dateSize,
  //       font: timesRomanFont,
  //       color: rgb(0, 0, 0),
  //     });
  //     const endDateSize = 18;
  //     page.drawText("31 ST OF MARCH, 2023 ", {
  //       x: endDateSize + 675,
  //       y: height - 4 * endDateSize - 510,
  //       size: endDateSize,
  //       font: timesRomanFont,
  //       color: rgb(0, 0, 0),
  //     });
  //     const idSize = 18;
  //     page.drawText(" WS230327", {
  //       x: dateSize + 820,
  //       y: height - 4 * idSize - 680,
  //       size: idSize,
  //       font: timesRomanFont,
  //       color: rgb(0, 0, 0),
  //     });

  //     const pdfBytes = await pdfDoc.save();

  //     // Create a Blob from the PDF bytes
  //     const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  //     const pdfUrl = URL.createObjectURL(pdfBlob);
  //     setPdfUrl(pdfUrl);

  //     // // Create a download link
  //     // const downloadLink = document.createElement("a");
  //     // downloadLink.href = URL.createObjectURL(pdfBlob);
  //     // downloadLink.download = "modified_certificate.pdf";

  //     // // Append the link to the document and trigger the click event
  //     // document.body.appendChild(downloadLink);
  //     // downloadLink.click();

  //     // // Clean up
  //     // document.body.removeChild(downloadLink);
  //     // URL.revokeObjectURL(downloadLink.href);
  //   }, []);

  const handleDownload = useCallback(
    async (course) => {
      //   console.log("dc course ", course);

      const downloadLink = document.createElement("a");
      downloadLink.href = await createPdf(studentDetails, course);
      downloadLink.download = `${studentDetails.firstName}.pdf`;
      downloadLink.click();
    },
    [studentDetails]
  );
  const handleCertificate = useCallback(
    (certificateCourse) => {
      navigate("/certificate", {
        state: { studentDetails, certificateCourse },
      });
    },
    [navigate, studentDetails]
  );

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
      headersColumn("Name", "name"),
      {
        Header: "Actions",
        accessor: "invoice",
        className: "text-center wd-5dp border-bottom-0",

        // className: "text-center wd-15p border-bottom-0",

        Cell: (props) => (
          <>
            <div>
              {/* <i
                className={`btn add_button me-3 mt-2 ${
                  courses.find(
                    (courses) =>
                      courses._id === props.cell.row.original._id
                  )
                    ? "btn-success"
                    : "btn-primary"
                }`}
                aria-hidden="true"
                onClick={(event) => {
                  sendCourse(event, props.cell.row.original);
                }}
              >
                {courses.find(
                  (courses) =>
                    courses._id === props.cell.row.original._id
                )
                  ? "Added"
                  : "Add"}
              </i> */}
              <i>
                {courses.find(
                  (courses) => courses._id === props.cell.row.original._id
                ) ? (
                  <button
                    className="btn btn-secondary download_button me-3 mt-2"
                    onClick={() => handleDownload(props.cell.row.original)}
                  >
                    Download Pdf
                  </button>
                ) : null}
              </i>
              <i>
                {courses.find(
                  (courses) => courses._id === props.cell.row.original._id
                ) ? (
                  <button
                    className="btn btn-primary download_button me-3 mt-2"
                    onClick={(event) => {
                      handleCertificate(props.cell.row.original);
                    }}
                  >
                    View
                  </button>
                ) : null}
              </i>
            </div>
          </>
        ),
      },
    ],
    [courses, handleCertificate, handleDownload]
  );

  const tableInstance = useTable(
    {
      columns: COLUMN,
      data: courses,
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

export default DownloadCertificate;
