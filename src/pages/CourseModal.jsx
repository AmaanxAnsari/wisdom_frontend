// CourseModal.js

import React from 'react';  // Import React for creating React components
import { Modal, Form, Container, Tabs, Tab, Row, Col, Table, Button } from 'react-bootstrap';  // Import necessary Bootstrap components

const CourseModal = ({
  show,                // Prop: Boolean to control the visibility of the modal
  onHide,              // Prop: Function to handle modal close event
  handleSubmit,       // Prop: Function to handle form submission
  loading,            // Prop: Boolean to indicate loading state
  error,              // Prop: String to hold any error messages
  modalData,          // Prop: Object to hold data for pre-filling the form (for update)
  handleStudentSelect, // Prop: Function to handle student selection
  handleStudentRemove, // Prop: Function to handle student removal
  availableStudents,  // Prop: Array of available students
  selectedStudent,    // Prop: Array of selected students
  loadingSudent,      // Prop: Boolean to indicate loading state for students
  searchTerm,         // Prop: String to hold the search term for students
  setSearchTerm,      // Prop: Function to set the search term for students
}) => {
  return (
    <Modal show={show} size="xl" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{modalData?.name}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {loading ? (
            <div>Loading ...</div>
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
                    <i className="fa fa-frown-o me-2" aria-hidden="true"></i>
                    {error}
                  </div>
                </Form.Group>
              )}
              {/* ... (more error handling code) */}

              <Container>
                <Tabs
                  defaultActiveKey="home"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  {/* ... (Tabs for course details and students) */}
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
                                            defaultValue={modalData?.name || ''}
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
                                            defaultValue={modalData?.description || ''}
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
                                            defaultValue={modalData?.image || ''}
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
                                            defaultValue={modalData?.overview || ''}
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
                                            defaultValue={modalData?.duration || ''}
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
                                          <Form.Label>technologies</Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="technologies"
                                            id="technologies"
                                            required
                                            placeholder="Enter Technologies"
                                            defaultValue={modalData?.technologies || ''}
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
                                            defaultValue={modalData?.categories || ''}
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Tab>
                                <Tab eventKey="profile" title="students">

                                  <input
                                  style={{ float:"right", padding:"10px", marginBottom:"10px",width:"300px",borderRadius:"5px",borderColor:"#D2D2D2" }}
                                    type="text"
                                    placeholder="Search by name"
                                    value={searchTerm}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                  />

                                  <div className="table-responsive">
                                    <Table className="table-bordered text-nowrap border-bottom">
                                      {loadingSudent ? (
                                        <div className="text-center mt-2 mb-4">
                                          Loading......
                                        </div>
                                      ) : (
                                        <>
                                          <thead>
                                            <tr>
                                              <th className="border-bottom-0">
                                                Sr No
                                              </th>
                                              <th className="border-bottom-0">
                                                Name
                                              </th>
                                              <th className="border-bottom-0">
                                                Add
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {availableStudents &&
                                              availableStudents
                                                .filter((student) =>
                                                  `${student?.firstName} ${student?.lastName}`
                                                    .toLowerCase()
                                                    .includes(
                                                      searchTerm.toLowerCase()
                                                    )
                                                )
                                                .slice(0, 10)
                                                .map((student, i) => {
                                                  return (
                                                    <tr key={i}>
                                                      <td>{i + 1}</td>
                                                      <td>
                                                        {student?.firstName +
                                                          "  " +
                                                          student?.lastName}
                                                      </td>
                                                      <td>
                                                        <i
                                                          className="fa fa-plus"
                                                          aria-hidden="true"
                                                          onClick={(event) =>
                                                            handleStudentSelect(
                                                              event,
                                                              student
                                                            )
                                                          }
                                                          style={{
                                                            marginLeft: "8px",
                                                            padding: "6px 10px",
                                                            background:
                                                              "#7669fc",
                                                            color: "#CCF5CE",
                                                            border: "none",
                                                            borderRadius: "4px",
                                                            cursor: "pointer",
                                                          }}
                                                        ></i>
                                                      </td>
                                                    </tr>
                                                  );
                                                })}
                                          </tbody>
                                        </>
                                      )}
                                    </Table>
                                  </div>
                                  <hr />
                                  <div className="table-responsive">
                                    <table
                                      id="file-datatable"
                                      className="table table-bordered text-nowrap key-buttons border-bottom"
                                    >
                                      {loadingSudent ? (
                                        <div className="text-center mt-2 mb-4">
                                          Loading......
                                        </div>
                                      ) : (
                                        <>
                                          <thead>
                                            <tr>
                                              <th className="border-bottom-0">
                                                Sr No
                                              </th>
                                              <th className="border-bottom-0">
                                                Name
                                              </th>
                                              <th className="border-bottom-0">
                                                Remove
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {selectedStudent &&
                                              selectedStudent.map(
                                                (student, i) => {
                                                  return (
                                                    <tr key={i}>
                                                      <td>{i + 1}</td>
                                                      <td>
                                                        {student?.firstName +
                                                          " " +
                                                          student?.lastName}
                                                      </td>
                                                      <td>
                                                        <i
                                                          className="fa fa-trash-o"
                                                          aria-hidden="true"
                                                          onClick={() =>
                                                            handleStudentRemove(
                                                              student
                                                            )
                                                          }
                                                          style={{
                                                            marginLeft: "8px",
                                                            padding: "6px 10px",
                                                            background:
                                                              "#7669fc",
                                                            color: "#CCF5CE",
                                                            border: "none",
                                                            borderRadius: "4px",
                                                            cursor: "pointer",
                                                          }}
                                                        ></i>
                                                      </td>
                                                    </tr>
                                                  );
                                                }
                                              )}
                                          </tbody>
                                        </>
                                      )}
                                    </table>
                                  </div>
                                </Tab>
                </Tabs>
              </Container>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {modalData ? 'Update course' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CourseModal;
