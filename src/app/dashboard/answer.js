import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
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
import moment from 'moment';
import Spinner from "../../app/shared/Spinner";
import { toast } from "react-toastify";

export default function Column() {
  
  const [answerState, setAnswerState] = useState({
    pageSize: 4,
    pageNumber: 1,
    total: 0,
    loading: false,
  });
  
  const [qaList, setQaList] = useState([]);
  
  useEffect(() => getQaList(), [answerState.pageNumber]);
  const getQaList = () => {
    const { pageNumber, pageSize } = answerState;
    console.log(answerState);
    const url = `https://localhost:7180/api/Question/admin/questionnaire?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    const user = JSON.parse(localStorage.getItem("Reveal_user_data"));
    axios.defaults.headers.common["Authorization"] = user
      ? `Bearer ${user.token}`
      : "";
    setAnswerState({ ...answerState, loading: true });
    axios.get(url).then((res) => {
      setQaList(res.data.data);
      setAnswerState({ ...answerState, total: res.data.total, loading: false });
    });
  };

  const nextQaList = () => {
    const { pageNumber } = answerState;
    if (runOutOfQaList()) return;
    setAnswerState({ ...answerState, pageNumber: pageNumber + 1 });
  };

  const previousQaList = () => {
    const { pageNumber } = answerState;
    if (onPageOneQaList()) return;
    setAnswerState({ ...answerState, pageNumber: pageNumber - 1 });
  };

  const runOutOfQaList = () => {
    const { pageNumber, pageSize, total } = answerState;
    const hasReminder = total / pageSize - Math.floor(total / pageSize) > 0;
    if (pageNumber + 1 > Math.floor(total / pageSize) + (hasReminder ? 1 : 0)) {
      return true;
    }
    return false;
  };

  const onPageOneQaList = () => {
    const { pageNumber } = answerState;
    if (pageNumber - 1 <= 0) {
      return true;
    }
    return false;
  };

  const postAnswer = (id) => {
    const url = "https://localhost:7180/api/Answer";
    const user = JSON.parse(localStorage.getItem("Reveal_user_data"));
    const cauTraLoi = document.getElementById(`answer-textarea-${id}`).value;
    axios.defaults.headers.common["Authorization"] = user
      ? `Bearer ${user.token}`
      : "";
      setAnswerState({...answerState, loading: true});
      axios.post(url, {
        
          "idCauHoi": id,
          "cauTraLoi": cauTraLoi
        
      },{ headers: {
        'Content-Type': 'application/json'
      }})
      .then((res) => {
   
        getQaList();
       
        toast.success("Trả lời câu hỏi thành công !", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(err => {
        console.log(err);
        setAnswerState({...answerState, loading: false});
        toast.error("Trả lời câu hỏi thất bại !", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }

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
        <MDBContainer className="py-5" style={{  }}>
        {answerState.loading && <Spinner />}
          <MDBRow className="">
            {qaList.map((item) => (
              <MDBCol md="11" lg="6" xl="6" key={item.idCauHoi}>
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
                        <MDBTypography tag="h5">{item.askedBy}</MDBTypography>
                        <p className="small">{moment(new Date(item.cauHoiUpdatedAt)).format("DD/MM/YYYY hh:mm a")}</p>
                        <p>
                          {item.cauHoi}
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
                        { item.idTraLoi ? <MDBTextArea
                          id={`answer-textarea-${item.idCauHoi}`}
                          rows={4}
                          style={{ backgroundColor: "#fff" }}
                          wrapperClass="w-100"
                          value={item.cauTraLoi}
                          disabled={item.idTraLoi != null}
                        /> :
                        <MDBTextArea
                          id={`answer-textarea-${item.idCauHoi}`}
                          rows={4}
                          style={{ backgroundColor: "#fff" }}
                          wrapperClass="w-100"
                        />}
                      </div>
                      <div className="float-end mt-2 pt-1">
                        {
                          item.idTraLoi ? (<p className="small" style={{marginLeft: '40px'}}>{moment(new Date(item.cauTraLoiUpdatedAt)).format("DD/MM/YYYY hh:mm a")}</p>)
                          : (<>
                            <Button variant="primary" size="sm" onClick={() => postAnswer(item.idCauHoi)} >
                            Post comment
                          </Button>
                          </>
                          )
                        }
                        
                      </div>
                    </MDBCardFooter>
                  </MDBCard>
                </div>
              </MDBCol>
            ))}
          </MDBRow>
          <div className="d-flex justify-content-end align-items-center w-100 mb-3 col-12">
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="outline-primary"
                disabled={onPageOneQaList()}
                onClick={() => previousQaList()}
              >
                Previous
              </Button>
              <Button
                variant="outline-primary"
                disabled={runOutOfQaList()}
                onClick={() => nextQaList()}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </MDBContainer>
      </section>
    </div>
  );
}
