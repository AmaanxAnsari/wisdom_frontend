import { Tab, Nav } from "react-bootstrap";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Loading } from "./Loading";
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
  Table,
  Tabs,
} from "react-bootstrap";
import {
  createCourse,
  getAllCourses,
  updateCourse,
  getAllStudents,
  getAllVideos,
  getCourseById,
} from "../api";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import SelectStudentsTable from "../components/SelectStudentsTable";
import SelectVideoTable from "../components/SelectVideoTable";

const Courses = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  //////////// tabs content
  const [selectedStudents, setselectedStudents] = useState([]);
  const [selectedVideos, setselectedVideos] = useState([]);

  const handleStudentSelect = useCallback(
    (event, student) => {
      if (
        !selectedStudents.find(
          (selectedStudent) => selectedStudent._id === student._id
        )
      ) {
        setselectedStudents([...selectedStudents, student]);
      } else {
        const updatedStudents = selectedStudents.filter(
          (students) => students._id !== student._id
        );
        setselectedStudents(updatedStudents);
      }
    },
    [selectedStudents]
  );
  const handleVideoSelect = useCallback(
    (event, video) => {
      if (
        !selectedVideos.find((selectedVideo) => selectedVideo._id === video._id)
      ) {
        setselectedVideos([...selectedVideos, video]);
      } else {
        const updatedVideos = selectedVideos.filter(
          (videos) => videos._id !== video._id
        );
        setselectedVideos(updatedVideos);
      }
    },
    [selectedVideos]
  );

  const getCourses = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getAllCourses();
      if (data.data) {
        console.log(data);
        setCourses(data.data);
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
  };
  useEffect(() => {
    getCourses();
  }, []);

  const getSingleCourse = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getCourseById();
      if (data.data) {
        console.log(data);
        setCourses(data.data);
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
  };

  const [availableStudents, setavailableStudents] = useState([]);

  const [availableVideos, setAvailableVideos] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowViewModal = async (item) => {
    try {
      const response = await getCourseById(item._id);
      setModalData(item);
      setselectedStudents(item.students || []);
      setselectedVideos(item.videos || []);
      const courseData = response.data;
      const videoData = response.data;
      setModalData(courseData);
      setModalData(videoData);
    } catch (error) {
      console.log(error);
    }
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setModalData();
  };

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
            <span>{`${props.cell.row.original.name} `}</span>{" "}
          </div>
        ),
        Header: (props) => (
          <div style={{ textAlign: "left" }}>
            <span>Name</span>
          </div>
        ),
      },
      headersColumn("Description", "description"),
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

  useEffect(() => {
    getAllVideos()
      .then((response) => {
        setAvailableVideos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos: ", error);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    getAllStudents()
      .then((response) => {
        setavailableStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching videos: ", error);
      })
      .finally(() => {});
  }, []);

  const formsSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudents.length === 0) {
      setError("Please Select a student");
      return;
    }
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    formData.append("file", selectedImage);
    const formJson = Object.fromEntries(formData.entries());
    console.log("From Courses", formJson);
    const selectedStudentIds = selectedStudents.map((student) => student._id);
    formJson.students = selectedStudentIds;
    const selectedVideoIds = selectedVideos.map((video) => video._id);
    formJson.videos = selectedVideoIds;
    try {
      await createCourse(formJson);

      setSuccessMessage("Course Added Successfully!");
      handleCloseModal();
      // getCourses()
      // getAllVideos();
      // setselectedStudents([]);
      // setselectedVideos([]);
      setError("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
    setselectedStudents([]);
    setselectedVideos([]);
    setLoading(false);
  };

  const updateFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    formData.append("file", selectedImage);
    const params = Object.fromEntries(formData.entries());
    const courseId = modalData._id; // Assuming _id is the student ID
    params.students = selectedStudents.map(
      (selectedStudents) => selectedStudents._id
    );
    params.videos = selectedVideos.map((selectedVideos) => selectedVideos._id);
    setError("");
    setSuccessMessage("");
    console.log("params: ", params);
    try {
      console.log("Params:", params);
      const data = await updateCourse(courseId, params);
      if (data.data) {
        console.log(data);
        getCourses();
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

  const getVideos = () => async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getAllVideos();
      if (data.data) {
        console.log(data);
        setCourses(data.data);
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
  };
  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="main-content app-content mt-0">
      <div className="side-app">
        {/* CONTAINER */}
        <div className="main-container container-fluid">
          {/* PAGE-HEADER */}
          <div className="page-header">
            <h1 className="page-title">Courses</h1>
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Courses
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
                      <CardTitle>Courses</CardTitle>
                    </Col>
                    <Col lg={12} className="mt-4">
                      {successMessage.length > 0 && (
                        <div className="alert alert-success" role="alert">
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
                          {successMessage}
                        </div>
                      )}
                      {error.length > 0 && (
                        <div className="alert alert-danger" role="alert">
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
                      )}
                    </Col>
                  </Row>
                  <br />
                </CardHeader>
                <CardHeader className="card-header">
                  <Button
                    variant="primary"
                    className="me-3 mt-2"
                    onClick={handleShowModal}
                  >
                    Add Course
                  </Button>

                  <Modal show={showModal} size="xl" onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Course</Modal.Title>
                    </Modal.Header>
                    <Form
                      method="post"
                      onSubmit={formsSubmit}
                      encType="multipart/form-data"
                    >
                      <Modal.Body>
                        {loading ? (
                          <Loading />
                        ) : (
                          <>
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
                                          <Form.Label> Name: </Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            placeholder="Enter course name"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Description: </Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="description"
                                            id="description"
                                            required
                                            placeholder="Enter description"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Image :</Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="image"
                                            id="image"
                                            required
                                            placeholder="Insert Image"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Overview :</Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="overview"
                                            id="overview"
                                            required
                                            placeholder="Enter Overview"
                                          />
                                        </Form.Group>
                                      </Col>

                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Duration :</Form.Label>
                                          <Form.Control
                                            type="number"
                                            name="duration"
                                            id="duration"
                                            min="1"
                                            required
                                            placeholder="Enter Duration "
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            primary category
                                          </Form.Label>
                                          <Form.Select name="primaryCategory">
                                            <option>Demo Video</option>
                                          </Form.Select>
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>Technologies</Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="technologies"
                                            id="technologies"
                                            required
                                            placeholder="Enter Technologies"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            Course Thumbnail:
                                          </Form.Label>
                                          <Form.Control
                                            type="file"
                                            id="course_thumbnail"
                                            onChange={(event) => {
                                              // console.log(
                                              //   "change image",
                                              //   event.target.files[0]
                                              // );
                                              setSelectedImage(
                                                event.target.files[0]
                                              );
                                            }}
                                            required
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>categories</Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="categories"
                                            id="categories"
                                            required
                                            placeholder="Enter categories"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            Batch Start Date
                                          </Form.Label>
                                          <Form.Control
                                            type="date"
                                            name="batchstart"
                                            id="batchstart"
                                            required
                                            placeholder="Enter Batch Start Date"
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col lg={6}>
                                        <Form.Group className="mb-3">
                                          <Form.Label>
                                            Batch Start Date
                                          </Form.Label>
                                          <Form.Control
                                            type="date"
                                            name="batchend"
                                            id="batchend"
                                            required
                                            placeholder="Enter Batch End Date"
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Tab>
                                <Tab eventKey="profile" title="students">
                                  <SelectStudentsTable
                                    loading={loading}
                                    students={availableStudents}
                                    selectedStudent={selectedStudents}
                                    sendStudent={handleStudentSelect}
                                  />
                                </Tab>

                                <Tab eventKey="video-profile" title="videos">
                                  <SelectVideoTable
                                    loading={loading}
                                    videos={availableVideos}
                                    selectedVideo={selectedVideos}
                                    sendVideo={handleVideoSelect}
                                  />
                                </Tab>
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

                <div className="card-body"></div>
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
                <Modal.Title>{modalData?.name}</Modal.Title>
              </Modal.Header>
              <Form
                method="post"
                onSubmit={updateFormSubmit}
                encType="multipart/form-data"
              >
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
                                    <Form.Label> Name: </Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="name"
                                      id="name"
                                      required
                                      placeholder="Enter Name"
                                      defaultValue={modalData?.name}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Description: </Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="description"
                                      id="description"
                                      required
                                      placeholder="Enter description"
                                      defaultValue={modalData?.description}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  {/* <Form.Group className="mb-3">
                                    <Form.Label>Course Thumbnail: </Form.Label>
                                    <Form.Control
                                      hidden
                                      type="text"
                                      name="course_thumbnail"
                                      id="course_thumbnail"
                                      required
                                      defaultValue={modalData?.course_thumbnail}
                                    />
                                    <Form.Control
                                      type="file"
                                      id="course_thumbnail"
                                      onChange={(event) => {
                                        // console.log(
                                        //   "change image",
                                        //   event.target.files[0]
                                        // );
                                        setSelectedImage(event.target.files[0]);
                                      }}
                                      required
                                    />
                                  </Form.Group> */}
                                  <Form.Group className="mb-3">
                                    <Form.Label>Course Thumbnail: </Form.Label>
                                    <Form.Control
                                      type="file"
                                      id="course_thumbnail"
                                      onChange={(event) => {
                                        setSelectedImage(event.target.files[0]);
                                      }}
                                      required
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Overview</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="overview"
                                      id="overview"
                                      required
                                      placeholder="Enter overview"
                                      defaultValue={modalData?.overview}
                                    />
                                  </Form.Group>
                                </Col>

                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Duration :</Form.Label>
                                    <Form.Control
                                      type="number"
                                      name="duration"
                                      id="duration"
                                      required
                                      placeholder="Enter Course duration"
                                      defaultValue={modalData?.duration}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>primary category</Form.Label>
                                    <Form.Select name="primaryCategory">
                                      <option>Demo Video</option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>technologies</Form.Label>
                                    <Form.Control
                                      type="text"
                                      name="technologies"
                                      id="technologies"
                                      defaultValue={modalData?.technologies}
                                      required
                                      placeholder="Enter Technologies"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Batch Start Date</Form.Label>
                                    <Form.Control
                                      type="date"
                                      name="batchstart"
                                      id="batchstart"
                                      defaultValue={modalData?.batchstart}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Batch Start Date</Form.Label>
                                    <Form.Control
                                      type="date"
                                      name="batchend"
                                      id="batchend"
                                      defaultValue={modalData?.batchend}
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Container>
                          </Tab>

                          <Tab eventKey="profile" title="students">
                            <SelectStudentsTable
                              loading={loading}
                              students={availableStudents}
                              selectedStudent={selectedStudents}
                              sendStudent={handleStudentSelect}
                            />
                          </Tab>
                          <Tab eventKey="video-profile" title="videos">
                            <SelectVideoTable
                              loading={loading}
                              videos={availableVideos}
                              selectedVideo={selectedVideos}
                              sendVideo={handleVideoSelect}
                            />
                          </Tab>
                          <Tab eventKey="profile-students" title="delete">
                            <Col lg={6}>
                              {/* <Form.Group className="mb-3">
                                <Form.Label>Remove Course:</Form.Label>
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
                                <Form.Label>Remove Course:</Form.Label>
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
                    Update course
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
export default Courses;
