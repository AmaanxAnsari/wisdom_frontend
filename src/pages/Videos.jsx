import React, { useState, useEffect, useRef, useMemo } from "react";
import { Loading } from "./Loading";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  Tabs,
  Tab,
  Modal,
  Row,
  CardBody,
  Table,
} from "react-bootstrap";
import ReactPlayer from "react-player";
import Select, { components } from "react-select";
import {
  addVideoDetails,
  getAllVideos,
  getTags,
  getVideoById,
  createVideo,
  updateVideo,
  uploadVideo
} from "../api";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import TagsSelect from "../components/TagSelect";

const Videos = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [played, setPlayed] = useState(false);
  const handleLocalVideoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const videoUrl = updateVideo(file);
      setModalData((prevData) => ({
        ...prevData,
        url: videoUrl,
      }));
    }
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;

    setModalData((prevData) => ({
      ...prevData,
      url: newUrl,
    }));
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

  const formSubmitVideoDetails = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    formData.append("tags", JSON.stringify(selectedTags));
    formData.append("invoice", video);
    const formJson = Object.fromEntries(formData.entries());

    try {
      const response = await addVideoDetails(formJson);
      if (response.data._id) {
        setSuccessMessage("Video Added Successfully!");
        handleCloseVideoDetailsModal();
        getClientData();
        setSelectedTags([]);
        // setNewVideo(null);
      } else {
        setError("Something Went Wrong");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Video upload api
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
    }
  };
  // const handleReplaceFIle = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     // Check if the modal is for replacing a video
  //     if (showReplaceModal) {
  //       setNewVideo(file);
  //     } else {
  //       setVideo(file);
  //     }
  //   }
  // };

  // const formSubmitVideoUpload = async (e) => {

  //   e.preventDefault();
  //   setLoading(true);

  //   let formData = new FormData();
  //   formData.append("invoice", video);

  //   try {
  //     const response = await uploadVideo(formData);
  //     if (response.data.url) {
  //       setVideoUrl(response.data.url);
  //       setSuccessMessage("Video Added Successfully!");
  //       handleShowVideoDetailsModal();
  //       handleCloseModal();
  //       getClientData();
  //     } else {
  //       setError("Something Went Wrong");
  //     }
  //   } catch (err) {
  //     if (err.response) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError(err.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const formSubmitVideoUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append("invoice", video);

    try {
      const response = await uploadVideo(formData);
      if (response.data.url) {
        setVideoUrl(response.data.url);

        if (showVideoDetailsModal) {
          setModalData((prevData) => ({
            ...prevData,
            url: response.data.url,
          }));
          getDistinctTags();
        }

        setSuccessMessage("Video Added Successfully!");

        if (showReplaceModal) {
          handleCloseReplaceModal();
        } else {
          handleShowVideoDetailsModal();
        }

        handleCloseModal();
        getClientData();
      } else {
        setError("Something Went Wrong");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };


  // const updateFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const form = e.target;
  //   const formData = new FormData(form);
  //   const body = Object.fromEntries(formData.entries());
  //   setError("");
  //   setSuccessMessage("");
  //   console.log("body: ", body);
  //   try {
  //     const data = await updateCourse(body);
  //     if (data.data) {
  //       console.log(data);
  //       getClientData();
  //     } else {
  //       setError("Something Went Wrong !! ");
  //     }
  //   } catch (err) {
  //     if (err.response) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError(err.message);
  //     }
  //   }
  //   setLoading(false);
  //   setShowViewModal(false);
  // };
  // const updateFormSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const form = e.target;
  //   const formData = new FormData(form);
  //   const params = Object.fromEntries(formData.entries());
  //   const videoId = modalData._id; // Assuming _id is the student ID
  //   setError("");
  //   setSuccessMessage("");
  //   try {
  //     const data = await updateVideo(videoId, params);
  //     if (data.data) {
  //       AlertHeading("updated successfully")
  //     } else {
  //       setError("Something Went Wrong !! ");
  //     }
  //   } catch (err) {
  //     if (err.response) {
  //       setError(err.response.data.message);
  //     } else {
  //       setError(err.message);
  //     }
  //   }
  //   setShowViewModal(false);
  //   setLoading(false);
  //   window.location.reload(false);
  // };
  const updateFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const params = Object.fromEntries(formData.entries());
    const videoId = modalData._id;

    setError("");
    setSuccessMessage("");

    try {
      const response = await updateVideo(videoId, params);
      if (response.data) {
        setSuccessMessage("Video updated successfully");
        handleCloseViewModal();
        getClientData();
      } else {
        setError("Something Went Wrong!!");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getClientData();
  }, []);

  const getClientData = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getAllVideos();
      if (data.data) {
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

  // Get distinct tags
  const [tags, setTags] = useState("");
  const getDistinctTags = async () => {
    setError("");
    setSuccessMessage("");
    try {
      const data = await getTags();
      if (data.data) {
        setTags(data.data);
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
    getClientData();
  }, []);

  const [modalData, setModalData] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showReplaceModal, setShowReplaceModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleShowReplaceModal = () => setShowReplaceModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseReplaceModal = () => setShowReplaceModal(false);

  const [showVideoDetailsModal, setShowVideoDetailsModal] = useState(false);
  const handleShowVideoDetailsModal = () => {
    setShowVideoDetailsModal(true);
    getDistinctTags();
  };
  const handleCloseVideoDetailsModal = () => setShowVideoDetailsModal(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  // const handleShowViewModal = (item) => {setModalData(item);setShowViewModal(true);}
  const handleShowViewModal = async (item) => {
    setModalData(item);

    try {
      const response = await getVideoById(item._id);
      const videoData = response.data;
      setModalData(videoData);
    } catch (error) {
      console.error("Error fetching video details:", error);
      // Handle error (set error state, show an alert, etc.)
    }
    setShowVideoPreview(false);
    setShowViewModal(true);
  };
  const handleCloseViewModal = () => setShowViewModal(false);

  // Tags select
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions.map((tag) => tag.value));
  };

  const handleCreateOption = (inputValue) => {
    const newTag = inputValue.trim();
    setSelectedTags((prevTags) => [...prevTags, newTag]);
    setInputValue("");
  };
  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCreateOption(props.selectProps.inputValue);
            }}
          >
            ➕
          </div>
        </components.DropdownIndicator>
      )
    );
  };

  const options = tags ? tags : [];

  return (
    <div className="main-content app-content mt-0">
      <div className="side-app">
        {/* CONTAINER */}
        <div className="main-container container-fluid">
          {/* PAGE-HEADER */}
          <div className="page-header">
            <h1 className="page-title">Videos</h1>
            <div>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Videos
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
                      <CardTitle>Videos</CardTitle>
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
                <div className="card-header">
                  <Button
                    variant="primary"
                    className="me-3 mt-2"
                    onClick={handleShowModal}
                  >
                    Add Video
                  </Button>
                  {/* ADD VIDEO MODAL */}

                  <Modal show={showModal} size="xl" onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Video</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={formSubmitVideoUpload}>
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
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Upload Video: </Form.Label>
                                    <input
                                      type="file"
                                      name="invoice"
                                      id="video"
                                      accept="video/*"
                                      onChange={handleFileChange}
                                      required
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Container>
                          </>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit">
                          Upload
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>

                  {/* REPLACE VIDEO MODAL */}
                  <Modal
                    show={showReplaceModal}
                    size="xl"
                    onHide={handleCloseReplaceModal}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Replace Video</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={formSubmitVideoUpload}>
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
                              <Row>
                                <Col>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Upload Video: </Form.Label>
                                    <input
                                      type="file"
                                      name="invoice"
                                      id="video"
                                      accept="video/*"
                                      onChange={handleFileChange}
                                      required
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Container>
                          </>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                          Close
                        </Button>
                        <Button variant="primary" type="submit">
                          Upload
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>

                  <Modal
                    show={showVideoDetailsModal}
                    size="lg"
                    onHide={handleCloseVideoDetailsModal}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Video Details</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={formSubmitVideoDetails}>
                      <Modal.Body>
                        {loading && <Loading />}
                        {error.length > 0 && (
                          <Form.Group>
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
                          </Form.Group>
                        )}
                        <Container>
                          <Row>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Name: </Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  id="name"
                                  required
                                  placeholder="Enter Video Name"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Description :</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="description"
                                  id="description"
                                  required
                                  placeholder="Enter Video Description"
                                />
                              </Form.Group>
                            </Col>
                            {/* <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Tags</Form.Label>
                                <Select
                                  isMulti
                                  options={options.map((tag) => ({
                                    label: tag,
                                    value: tag,
                                  }))}
                                  value={selectedTags.map((tag) => ({
                                    label: tag,
                                    value: tag,
                                  }))}
                                  onChange={handleTagChange}
                                  onCreateOption={handleCreateOption}
                                  components={{ DropdownIndicator }}
                                  onInputChange={handleInputChange}
                                  inputValue={inputValue}
                                  placeholder="Create or select tags"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Tags</Form.Label>
                                <TagsSelect
                                  options={options}
                                  selectedTags={selectedTags}
                                  handleTagChange={handleTagChange}
                                  handleCreateOption={handleCreateOption}
                                  handleInputChange={handleInputChange}
                                  inputValue={inputValue}
                                  onChange={handleTagChange}
                                  onCreateOption={handleCreateOption}
                                  components={{ DropdownIndicator }}
                                  onInputChange={handleInputChange}
                                />
                              </Form.Group>
                            </Col> */}
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Tags</Form.Label>
                                <TagsSelect
                                  options={options}
                                  selectedTags={selectedTags}
                                  handleTagChange={handleTagChange}
                                  handleCreateOption={handleCreateOption}
                                  handleInputChange={handleInputChange}
                                  inputValue={inputValue}
                                  onChange={handleTagChange}
                                  onCreateOption={handleCreateOption}
                                  components={{ DropdownIndicator }}
                                  onInputChange={handleInputChange}
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Primary Category</Form.Label>
                                <Form.Select name="primaryCategory">
                                  <option>Demo Video</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>URL</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="url"
                                  id="videoUrl"
                                  defaultValue={videoUrl}
                                  readOnly
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Session Date</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="sessionDate"
                                  id="sessionDate"
                                  placeholder="enter session date"
                                  required

                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Session Date</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="sessionDate"
                                  id="sessionDate"
                                  placeholder="enter session date"
                                  required

                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Order</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="order"
                                  id="order"
                                />
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Order</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="order"
                                  id="order"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                        </Container>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleCloseVideoDetailsModal}
                        >
                          Close
                        </Button>
                        <Button variant="primary" type="submit">
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
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
                  </div>
                </div>
              </Card>
            </Col>
            <Container>
              {/* Video Details Modal */}

              <Modal
                s
                show={showViewModal}
                size="lg"
                onHide={() => {
                  setShowViewModal(false);
                  setShowVideoPreview(false); // for resetting
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{modalData?.name}</Modal.Title>
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
                                        defaultValue={modalData?.name}
                                        placeholder="Enter Name"
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col lg={6}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Description </Form.Label>
                                      <Form.Control
                                        type="text"
                                        name="description"
                                        id="description"
                                        required
                                        defaultValue={modalData?.description}
                                        placeholder="Enter Last Name"
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
                              <Form.Label>tags</Form.Label>
                              <Form.Control
                                type="text"
                                name="tags"
                                id="tags"
                                defaultValue={modalData?.tags}
                                placeholder="Enter tags"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Order </Form.Label>
                              <Form.Control
                                type="number"
                                name="order"
                                required
                                defaultValue={modalData?.order}
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Session Date</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="sessionDate"
                                  id="sessionDate"
                                  placeholder="enter session date"
                                value={modalData?.sessionDate}
                                />
                              </Form.Group>
                            </Col>
                                  {/* <Col lg={6}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Tags</Form.Label>
                                      {/* <TagsSelect

                                      <TagsSelect
                                        options={options}
                                        selectedTags={selectedTags}
                                        handleTagChange={handleTagChange}
                                        handleCreateOption={handleCreateOption}
                                        handleInputChange={handleInputChange}
                                        inputValue={inputValue}
                                      />
                                    </Form.Group>
                                  </Col> */}
                                </Row>
                              </Container>
                            </Tab>
                            <Tab eventKey="video-preview" title="Video">
                              <Col lg={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>video URL</Form.Label>
                          <Form.Control
                            type="text"
                            name="url"
                            id="url"
                            value={videoUrl ? videoUrl : modalData?.url}
                            onChange={handleUrlChange}
                            readOnly
                          />
</Form.Group>
                              </Col>
                          <Col lg={12}>
                            {/* Video Preview Section */}
                            <div
                              className="mb-3 position-relative"
                              onMouseEnter={() => setShowVideoPreview(true)}
                              onMouseLeave={() => setShowVideoPreview(false)}
                            >
                              <Form.Label>Video Preview</Form.Label>
                              <Form.Group className="mb-3">
                                <Form.Label>Upload Local Video: </Form.Label>
                                {/* <input
                                  type="file"
                                  name="selectedVideo"
                                  id="selectedVideo"
                                  accept="video/*"
                                  onChange={handleUrlChange}
                                /> */}
                               <Button onClick={handleShowReplaceModal}>
                                upload new video
                               </Button>
                              </Form.Group>

                              {modalData && (
                                <>
                                  <ReactPlayer
                                    url={modalData.url} // Assuming the video URL is present in the modalData
                                    controls
                                    width="100%"
                                    height="auto"
                                    onProgress={(progress)=>(setPlayed(progress.playedSeconds))}
                                    // playing={showVideoPreview} // Auto-play when previewing
                                  />
                                  {showVideoPreview && (
                                    <div className="overlay">
                                      {/* Additional overlay content (e.g., play button, etc.) */}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </Col>
                          </Tab>
                            <Tab eventKey="video-upload" title="upload ">
                              <Form.Group className="mb-3">
                                <Form.Label>Upload Local Video: </Form.Label>
                                {/* <input
                                  type="file"
                                  name="selectedVideo"
                                  id="selectedVideo"
                                  accept="video/*"
                                  onChange={handleUrlChange}
                                /> */}
                                <Button onClick={handleShowReplaceModal}>
                                  upload new video
                                </Button>
                              </Form.Group>
                            </Tab>
                          </Tabs>
                      </Container>
                    </>
                  )}
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowViewModal(false);
                      setShowVideoPreview(false); // Reset video preview state on modal close
                    }}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    save changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>


            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Videos;
