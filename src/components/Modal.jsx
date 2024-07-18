import React, { useState } from "react";

export default function Modal(props) {
  let id = props.id;
  let name = props.name;
  let img_src = props.img_src;

  function checkbox() {
    let checkbox1 = document.getElementById('btncheck1')
    let check_input1 = document.getElementById("check_input1");
    
    if (checkbox1.checked === true) {
        check_input1.style.display = "block";
    } else {
        check_input1.style.display = "none";
    }
    let checkbox2 = document.getElementById('btncheck2')
    let check_input2 = document.getElementById("check_input2");
    if (checkbox2.checked === true) {
        check_input2.style.display = "block";
    } else {
        check_input2.style.display = "none";
    }
    let checkbox3 = document.getElementById('btncheck3')
    let check_input3 = document.getElementById("check_input3");
    if (checkbox3.checked === true) {
        check_input3.style.display = "block";
    } else {
      check_input3.style.display = "none";
    }
    let checkbox4 = document.getElementById('btncheck4')
    let check_input4 = document.getElementById("check_input4");
    if (checkbox4.checked === true) {
        check_input4.style.display = "block";
    } else {
        check_input4.style.display = "none";
    }
    let checkbox5 = document.getElementById('btncheck5')
    let check_input5 = document.getElementById("check_input5");
    if (checkbox5.checked === true) {
        check_input5.style.display = "block";
    } else {
        check_input5.style.display = "none";
    }
  }

  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation(rotation === 270 ? 0 : rotation + 90);
  };
  
  
  return (
    <>
      {/* Modal */}
      <div className="modal fade" id={id} tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-lg " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{name}</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <button className="btn btn-primary mb-5" onClick={handleRotate}>
                Rotate Image
              </button>
              <div className="row">
                <div className="col-lg-6">
                  <img
                    src={img_src}
                    alt="invoice_img"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: "transform 0.5 ease-in-out",
                    }}
                    onClick={handleRotate}
                    className="py-5"
                  />
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-4">
                      <div>
                        <label className="switch" htmlFor="btncheck1">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="btncheck1"
                            onClick={checkbox}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="check_input1"
                        style={{ display: "none", border: "1px solid black" }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div>
                        <label className="switch" htmlFor="btncheck2">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="btncheck2"
                            onClick={checkbox}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="check_input2"
                        style={{ display: "none", border: "1px solid black" }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div>
                        <label className="switch" htmlFor="btncheck3">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="btncheck3"
                            onClick={checkbox}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="check_input3"
                        style={{ display: "none", border: "1px solid black" }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div>
                        <label className="switch" htmlFor="btncheck4">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="btncheck4"
                            onClick={checkbox}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="check_input4"
                        style={{ display: "none", border: "1px solid black" }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div>
                        <label className="switch" htmlFor="btncheck5">
                          <input
                            type="checkbox"
                            className="btn-check"
                            id="btncheck5"
                            onClick={checkbox}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <input
                        type="text"
                        className="form-control"
                        id="check_input5"
                        style={{ display: "none", border: "1px solid black" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
