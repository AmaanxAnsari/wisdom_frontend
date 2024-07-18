import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  lazy,
} from "react";
import { Loading } from "./Loading";
import StudentModal from "./Modal";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Tab,
  Table,
  Tabs,
  Nav
} from "react-bootstrap";
import {
  getAllStudents,
  addStudent,
  updateStudent,
  getAllCourses,
  getStudentById,
} from "../api";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import SelectCourseTable from "../components/SelectCourseTable";
import SelectStudentsTable from "../components/SelectStudentsTable";
const DownloadCertificate = lazy(() =>
  import("../components/DownloadCertificate")
);

const Students = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [removeStudent, setRemoveStudent] = useState(false);
  const [availableCourses, setAvailableCourses] = useState([]);
  
  const handleCourseSelect = useCallback(
    (event, course) => {
      if (
        !selectedCourses.find(
          (selectedCourse) => selectedCourse._id === course._id
        )
      ) {
        setSelectedCourses([...selectedCourses, course]);
      } else {
        const updatedCourses = selectedCourses.filter(
          (courses) => courses._id !== course._id
        );
        setSelectedCourses(updatedCourses);
      }
    },
    [selectedCourses]
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
      {
        accessor: "name",
        className: "text-center wd-15p border-bottom-0",
        isSorted: "true",

        Cell: (props) => (
          <div style={{ textAlign: "left" }}>
            <span>{`${props.cell.row.original.firstName} ${props.cell.row.original.lastName}`}</span>{" "}
          </div>
        ),
        Header: (props) => (
          <div style={{ textAlign: "left" }}>
            <span>Name</span>
          </div>
        ),
      },
      headersColumn("Mobile", "mobile"),

      {
        Header: "Actions",
        accessor: "invoice",
        className: "text-center wd-5dp border-bottom-0",

        Cell: (props) => (
          <>
            <div>
              <Button
                variant="primary"
                className="me-3 mt-2"
                onClick={() => handleShowViewModal(props.cell.row.original)}
              >
                View
              </Button>
            </div>
          </>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns: COLUMN,
      data: clients,
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

  // useEffect(() => {
  //   getAllCourses()
  //     .then((response) => {
  //       setAvailableCourses(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching courses: ", error);
  //     })
  //     .finally(() => {});
  // }, []);

  const formsSubmit = async (e) => {
    e.preventDefault();
    if (selectedCourses.length === 0) {
      setError("Please Select a Course");
      return;
    }
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const selectedCourseIds = selectedCourses.map((course) => course._id);
    formJson.courses = selectedCourseIds;

    try {
      await addStudent(formJson);
      setSuccessMessage("Student Added Successfully!");
      handleCloseModal();
      getStudents();
      setSelectedCourses([]);
      setError("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
    setSelectedCourses([]);
    setLoading(false);
  };

  const updateFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const params = Object.fromEntries(formData.entries());
    const studentId = modalData._id;
    params.courses = selectedCourses.map(
      (selectedCourses) => selectedCourses._id
    );

    setError("");
    setSuccessMessage("");
    console.log("params: ", params);
    try {
      const data = await updateStudent(studentId, params);

      if (data.data) {
        console.log(data);
        getStudents()

      } else {
        setError("Something Went Wrong !! ");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
    setShowViewModal(false);
    setLoading(false);
  };

  // useEffect(() => {
  //   getStudents();
  //   getAllCourses()
  //     .then((response) => {
  //       setCourses(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching courses: ", error);
  //     });
  // }, []);

  const addSingleStudent = useCallback(async (body) => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const token = await addStudent(body);
      if (token.data._id) {
        setSuccessMessage("User Added Successfully !");
        handleCloseModal();
        getStudents();
      } else {
        setError("Something Went Wrong");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        console.log("err.message", err.message);
        setError(err.message);
      }
    }
    setLoading(false);
  }, []);

  const getStudents = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const data = await getAllStudents();
      if (data.data) {
          // const nonDeletedStudents = data.data.filter((student) => !student.isDeleted);
        setClients(data.data.reverse());
      } else {
        setError("Something Went Wrong !! ");
      }
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    getStudents();
  }, [addSingleStudent]);

  const getSingleStudent = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const data = await getStudentById();
      if (data.data) {
        setClients(data.data.reverse());
      } else {
        setError("Something Went Wrong !! ");
      }
      setLoading(false);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   getSingleStudent()
  // }, [addSingleStudent]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  //   const handleShowViewModal = async (item) => {
  //     setModalData(item);

  //     try {
  //       const response = await  getSingleStudent(item);
  //       setModalData(item);
  //       setSelectedCourses(item.courses || []);
  //       setShowViewModal(true)
  //     } catch (error) {
  //       console.error("Error fetching Student details:", error);
  //     }

  //   };
  // };

  const handleShowViewModal = async (item) => {


    try {
      const response = await getStudentById(item._id);
      setModalData(item);
      setShowViewModal(true);
      setSelectedCourses(item.courses || []);

      const studentData = response.data;
      setModalData(studentData);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }

  };

  useEffect(() => {
    getAllCourses()
      .then((response) => {
        setAvailableCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses: ", error);
      })
      .finally(() => {});
  }, []);

  const handleCloseViewModal = () => {
    setShowViewModal(false);
  };



  return (
    <div className="main-content app-content mt-0">
      <div className="side-app">
        {/* CONTAINER */}
        <div className="main-container container-fluid">
          {/* PAGE-HEADER */}
          <div className="page-header">
            <h1 className="page-title">Students</h1>
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Students
                </li>
              </ol>
            </div>
          </div>
          <div className="row row-sm">
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <CardTitle>Students</CardTitle>
                    </Col>
                    <Col lg={12} className="mt-4">
                      {successMessage.length > 0 && (
                        <div class="alert alert-success" role="alert">
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          <i class="fa fa-frown-o me-2" aria-hidden="true"></i>
                          {successMessage}
                        </div>
                      )}
                      {error.length > 0 && (
                        <div class="alert alert-danger" role="alert">
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-hidden="true"
                          >
                            ×
                          </button>
                          <i class="fa fa-frown-o me-2" aria-hidden="true"></i>
                          {error}
                        </div>
                      )}
                    </Col>
                  </Row>
                  <br />
                </CardHeader>

                <CardHeader style={{ width: "300px" }}>
                  <Button
                    variant="primary"
                    className="me-3"
                    onClick={handleShowModal}
                  >
                    Add Student
                  </Button>

                  <Modal show={showModal} size="xl" onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Student</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={formsSubmit}>
                      <Modal.Body>
                        {loading ? (
                          <Loading />
                        ) : (
                          <>
                            {error.length > 0 && (
                              <Form.Group>
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-hidden="true"
                                  >
                                    ×
                                  </button>
                                  <i
                                    className="fa fa-frown-o me-2"
                                    aria-hidden="true"
                                  ></i>
                                  {error}
                                </div>
                              </Form.Group>
                            )}
                            <Container>
                              <Tabs
                                defaultActiveKey="home"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                              >
                              {/* <Nav variant="pills" defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3"> */}
                                <Tab eventKey="home" title="Details">
                                {/* <Nav.Item eventKey="home" > */}
                                {/* <Nav.Link className="border py-3 px-5 m-2" eventKey="home" ><i className="fe fe-home me-2"></i> Home</Nav.Link> */}
                                  <Container>
                                    <Row>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>First Name: </Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            required
                                            placeholder="Enter First Name"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Last Name: </Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            required
                                            placeholder="Enter Last Name"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Email :</Form.Label>
                                          <Form.Control
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            placeholder="Enter Email"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Password :</Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="password"
                                            id="password"
                                            required
                                            placeholder="Enter Password"
                                          />
                                        </Form.Group>
                                      </Col>
                                      {/* <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Mobile :</Form.Label>
                                          <Form.Control
                                            type="number"
                                            name="mobile"
                                            id="mobile"
                                            required
                                            placeholder="Enter Course Mobile"
                                          />
                                        </Form.Group>
                                      </Col> */}
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Mobile :</Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="mobile"
                                            id="mobile"
                                            required
                                            placeholder="Enter Course Mobile"
                                            pattern="[0-9]{10}"
                                            title="Please enter a 10-digit mobile number"
                                          />
                                          <Form.Text muted>
                                            Enter a 10-digit mobile number.
                                          </Form.Text>
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Tab>
                                {/* </Nav.Item> */}
                                <Tab eventKey="profile-course" title="courses">
                                {/* <Nav.Item eventKey="profile-course"> */}
                                 {/* <Nav.Link className="border py-3 px-5 m-2" eventKey="profile-course" ><i className="fe fe-unlock me-2"></i> Lock</Nav.Link> */}
                                  <SelectCourseTable
                                    loading={loading}
                                    courses={availableCourses}
                                    selectedCourses={selectedCourses}
                                    sendCourse={handleCourseSelect}
                                  />
                                </Tab>
                                {/* </Nav.Item> */}
                                {/* </Nav> */}

                                </Tabs>
                            </Container>
                          </>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                </CardHeader>

                <CardBody>
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
                            onChange={(e) =>
                              setPageSize(Number(e.target.value))
                            }
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
                                    {...column.getHeaderProps(
                                      column.getSortByToggleProps()
                                    )}
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
                                <tr
                                  className="text-center"
                                  {...row.getRowProps()}
                                >
                                  {row.cells.map((cell) => {
                                    return (
                                      <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                      </td>
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
                            <strong>
                              {/* {pageIndex + 1} of {pageOptions.length} */}
                            </strong>{" "}
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
                </CardBody>
              </Card>
            </Col>
            <Modal show={showViewModal} size="xl" onHide={handleCloseViewModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {(
                    modalData?.firstName +
                    " " +
                    modalData?.lastName
                  ).toUpperCase()}
                </Modal.Title>
              </Modal.Header>
              <Form onSubmit={updateFormSubmit}>
                <Modal.Body>
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      {error.length > 0 && (
                        <Form.Group>
                          <div className="alert alert-danger" role="alert">
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="alert"
                              aria-hidden="true"
                            ></button>
                            <i
                              className="fa fa-frown-o me-2"
                              aria-hidden="true"
                            ></i>
                            {error}
                          </div>
                        </Form.Group>
                      )}

                      <Container>
                        <Tabs
                          defaultActiveKey="home"
                          id="uncontrolled-tab-example"
                          className="mb-3"
                        >
                          <Tab eventKey="home" title="Details">
                            <Container>
                              <Row>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>First Name: </Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="firstName"
                                      id="firstName"
                                      required
                                      placeholder="Enter First Name"
                                      defaultValue={modalData?.firstName}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Last Name: </Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="lastName"
                                      id="lastName"
                                      required
                                      placeholder="Enter Last Name"
                                      defaultValue={modalData?.lastName}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Email :</Form.Label>
                                    <Form.Control
                                      type="email"
                                      name="email"
                                      id="email"
                                      required
                                      placeholder="Enter Email"
                                      defaultValue={modalData?.email}
                                    />
                                  </Form.Group>
                                </Col>

                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Mobile :</Form.Label>
                                    <Form.Control
                                      type="number"
                                      name="mobile"
                                      id="mobile"
                                      required
                                      placeholder="Enter Course Mobile"
                                      defaultValue={modalData?.mobile}
                                    />
                                  </Form.Group>
                                </Col>

                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Mobile Verified:</Form.Label>
                                    <Form.Select
                                      name="mobileVerified"
                                      id="mobileVerified"
                                      value={modalData?.mobileVerified}
                                    >
                                      <option value={true}>Yes</option>
                                      <option value={false}>No</option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Email Verified:</Form.Label>
                                    <Form.Select
                                      name="emailVerified"
                                      id="emailVerified"
                                    >
                                      <option
                                        selected={
                                          modalData?.emailVerified === true
                                            ? "true"
                                            : ""
                                        }
                                      >
                                        Yes
                                      </option>
                                      <option
                                        selected={
                                          modalData?.emailVerified === false
                                            ? "true"
                                            : ""
                                        }
                                      >
                                        No
                                      </option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Is Active:</Form.Label>
                                    <Form.Select name="isActive" id="isActive">
                                      <option
                                        selected={
                                          modalData?.isActive === true
                                            ? "true"
                                            : ""
                                        }
                                      >
                                        Yes
                                      </option>
                                      <option
                                        selected={
                                          modalData?.isActive === false
                                            ? "false"
                                            : ""
                                        }
                                      >
                                        No
                                      </option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Container>
                          </Tab>
                          <Tab eventKey="profile-course" title="courses">
                            <SelectCourseTable
                              loading={loading}
                              courses={availableCourses}
                              selectedCourses={selectedCourses}
                              sendCourse={handleCourseSelect}
                            />
                          </Tab>

                          <Tab
                            eventKey="profile-students"
                            title="delete"
                          >
                            <Col lg={6}>
                              {/* <Form.Group className="mb-3">
                                <Form.Label>Remove Student:</Form.Label>
                                <Form.Select name="isDeleted" id="isDeleted">
                                  <option
                                    selected={
                                      modalData?.isDeleted === true
                                        ? "true"
                                        : ""
                                    }
                                  >
                                    Yes
                                  </option>
                                  <option
                                    selected={
                                      modalData?.isDeleted === false
                                        ? "false"
                                        : ""
                                    }
                                  >
                                    No
                                  </option>
                                </Form.Select>
                              </Form.Group> */}
                               <Form.Group className="mb-3">
                                <Form.Label>delete:</Form.Label>
                                <Form.Select
                                  name="isDeleted"
                                  id="isDeleted"
                                  defaultValue={
                                    modalData?.isDeleted === true
                                      ? "true"
                                      : "false"
                                  }
                                >
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Tab>
                          <Tab eventKey="certificate" title="Certificate">
                            <DownloadCertificate
                              loading={loading}
                              courses={selectedCourses}
                              studentDetails={modalData}
                            />
                          </Tab>
                          {/* <Tab eventKey="certificate" title="Certificate">
                            <DownloadCertificate
                              loading={loading}
                              courses={selectedCourses}
                              studentDetails={modalData}
                            />
                          </Tab> */}
                        </Tabs>
                      </Container>
                    </>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseViewModal}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Update Students
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Students;
