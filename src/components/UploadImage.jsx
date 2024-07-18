import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
export const UploadImage = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);

  const retailerCode = props.retailerData.code;
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const closeButton = useRef(null);
  const openButton = useRef(null);
  const formsSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    var bodyFormData = new FormData();

    bodyFormData.append("image",selectedImage);
    bodyFormData.append("image",selectedImage1);
    bodyFormData.append("code",retailerCode);

    activateDealer(bodyFormData);
    setLoading(false);
  };
  const postURL = `${process.env.REACT_APP_API_URL}/dealer/activate`;
  const config = {
    headers: {
    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
    "Content-Type": "multipart/form-data",
    },
  };
  const activateDealer = async (body) => {
    setError("");
    setSuccessMessage("");

    setLoading(true);

    // setLoading(false);

    try {
      const token = await axios.post(postURL, body, config);
      if (token.data) {
        // getClientData();
        setSuccessMessage("Document Added Successfully");
        props.getDataFunction();
        closeButton.current.click();
        // getClientData();
      } else {
        setError("Something Went Wrong ");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
    setLoading(false);
  };

//   if (!isActive) {

//   }
useEffect(()=>{
    openButton.current.click();

},[])
  return (
    <>
      <button
        className="btn btn-primary off-canvas"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
        ref={openButton}

      >
        Upload Document
      </button>
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
      <div
        className="offcanvas offcanvas-bottom"
        tabIndex={-1}
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
        style={{ height: "400px" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasBottomLabel">
            Upload Document
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ref={closeButton}
          >
            <i className="fe fe-x fs-18" />
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="col-md-12 col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Please Upload Both Documents</h4>
              </div>
              <div className="card-body">
                <form
                  className="form-horizontal"
                  method="post"
                  onSubmit={formsSubmit}
                  enctype="multipart/form-data"
                >
                  <div className=" row mb-4">
                    {/* <label
                                            htmlFor="inputName"
                                            className="col-md-3 form-label"
                                          >
                                            Tent Image
                                          </label> */}
                    <div className="col-md-9">
                      <div className="form-group">
                        <label className="form-label mt-0">Tent Card</label>
                        <input
                          className="form-control"
                          type="file"
                          name="image"
                          required
                          onChange={(event) => {
                            console.log(event.target.files[0]);
                            setSelectedImage1(event.target.files[0]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" row mb-4">
                    {/* <label
                                            htmlFor="inputEmail3"
                                            className="col-md-3 form-label"
                                          >
                                            Tent Image 2
                                          </label> */}
                    <div className="col-md-9">
                      <div className="form-group">
                        <label className="form-label mt-0">Poster Image</label>
                        <input
                          className="form-control"
                          type="file"
                          name="image"
                          required
                          onChange={(event) => {
                            console.log(event.target.files[0]);
                            setSelectedImage(event.target.files[0]);
                          }}
                        />
                        <input
                          className="form-control"
                          type="hidden"
                          value={retailerCode}
                          name="code"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-0 mt-4 row justify-content-end">
                    <div className="col-md-9">
                      <button type="submit" className="btn btn-primary">
                        {loading ? "Loading........" : "Upload"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
