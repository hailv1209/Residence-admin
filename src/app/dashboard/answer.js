import React from "react";
import { Button } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBContainer,
  MDBTextArea,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./answer.css";

export default function Column() {
  return (
    <div>
      <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-qa"></i>
            </span>{" "}
            Q&A{" "}
          </h3>
        </div>
    <section className="vh-100">
      <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="11" lg="9" xl="7">
            <div className="d-flex flex-start mb-4">
              <img
                className="rounded-circle shadow-1-strong me-3"
                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                alt="avatar"
                width="65"
                height="65"
              />

              <MDBCard className="w-100">
                <MDBCardBody className="p-4">
                  <div>
                    <MDBTypography tag="h5">Johny Cash</MDBTypography>
                    <p className="small">3 hours ago</p>
                    <p>
                      Cras sit amet nibh libero, in gravida nulla. Nulla vel
                      metus scelerisque ante sollicitudin. Cras purus odio,
                      vestibulum in vulputate at, tempus viverra turpis. Fusce
                      condimentum nunc ac nisi vulputate fringilla. Donec
                      lacinia congue felis in faucibus ras purus odio,
                      vestibulum in vulputate at, tempus viverra turpis.
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <a href="#!" className="link-muted me-2">
                          <MDBIcon fas icon="thumbs-up me-1" />
                          
                        </a>
                        <a href="#!" className="link-muted">
                          <MDBIcon fas icon="thumbs-down me-1" />
                          
                        </a>
                      </div>
                      <a href="#!" className="link-muted">
                        <MDBIcon fas icon="reply me-1" /> Reply
                      </a>
                    </div>
                  </div>
                </MDBCardBody>
                <MDBCardFooter
                                  className="py-3 border-0"
                                  style={{ backgroundColor: "#f8f9fa" }}
                                >
                                  <div className="d-flex flex-start w-100">
                                    <MDBCardImage
                                      className="rounded-circle shadow-1-strong me-3"
                                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                      alt="avatar"
                                      width="40"
                                      height="40"
                                    />
                                    <MDBTextArea  id='textAreaExample' rows={4} style={{backgroundColor: '#fff'}} wrapperClass="w-100" />
                                  </div>
                                  <div className="float-end mt-2 pt-1">
                                    <Button variant="primary" size="sm" >Post comment</Button>
                                    <Button  size="sm">Cancel</Button>
                                  </div>
                                </MDBCardFooter>
              </MDBCard>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </div>
  );
}