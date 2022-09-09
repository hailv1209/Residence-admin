import axios from "axios";
import React, { Component } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import "./dashboard.css";
import Spinner from "../../app/shared/Spinner";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booktable: [],
      booktableState: {
        pageSize: 5,
        pageNumber: 1,
        total: 0,
        loading: true,
      },
      contact: [],
      contactState: {
        pageSize: 5,
        pageNumber: 1,
        total: 0,
        loading: true,
      },
    };
  }

  componentDidMount() {
    const userJson = localStorage.getItem("demeter_user_data");
    if (!userJson) {
      this.props.history.push("login");
      return;
    }
    this.getBookTable();
    this.getContact();
  }

  getBookTable() {
    const { pageNumber, pageSize } = this.state.booktableState;
    const url = `https://best-web-design-api.herokuapp.com/BookTable?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    const user = JSON.parse(localStorage.getItem("demeter_user_data"));
    axios.defaults.headers.common["Authorization"] = user
      ? `Bearer ${user.token}`
      : "";
    this.setState({
      booktableState: { ...this.state.booktableState, loading: true },
    });
    axios.get(url).then((res) => {
      console.log(res);
      this.setState({
        booktable: res.data.data,
        booktableState: {
          ...this.state.booktableState,
          total: res.data.total,
          loading: false,
        },
      });
    });
  }

  getContact() {
    const { pageNumber, pageSize } = this.state.contactState;
    const url = `https://best-web-design-api.herokuapp.com/Contact?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    const user = JSON.parse(localStorage.getItem("demeter_user_data"));
    axios.defaults.headers.common["Authorization"] = user
      ? `Bearer ${user.token}`
      : "";
    this.setState({
      contactState: { ...this.state.contactState, loading: true },
    });
    axios.get(url).then((res) => {
      console.log(res);
      this.setState({
        contact: res.data.data,
        contactState: {
          ...this.state.contactState,
          total: res.data.total,
          loading: false,
        },
      });
    });
  }

  nextBookTable() {
    const { pageNumber } = this.state.booktableState;
    if (this.runOutOfBookTable()) return;
    this.setState(
      {
        booktableState: {
          ...this.state.booktableState,
          pageNumber: pageNumber + 1,
        },
      },
      this.getBookTable
    );
  }

  previousBookTable() {
    const { pageNumber } = this.state.booktableState;
    if (this.onPageOneBookTable()) return;
    this.setState(
      {
        booktableState: {
          ...this.state.booktableState,
          pageNumber: pageNumber - 1,
        },
      },
      this.getBookTable
    );
  }

  runOutOfBookTable() {
    const { pageNumber, pageSize, total } = this.state.booktableState;
    const hasReminder = (total / pageSize) - Math.floor(total / pageSize) > 0
    if (pageNumber + 1 > Math.floor(total / pageSize) + (hasReminder ? 1 : 0)) {
      return true;
    }
    return false;
  }

  onPageOneBookTable() {
    const { pageNumber } = this.state.booktableState;
    if (pageNumber - 1 <= 0) {
      return true;
    }
    return false;
  }

  nextContact() {
    const { pageNumber } = this.state.contactState;
    if (this.runOutOfContact()) return;
    this.setState(
      {
        contactState: {
          ...this.state.contactState,
          pageNumber: pageNumber + 1,
        },
      },
      this.getContact
    );
  }

  previousContact() {
    const { pageNumber } = this.state.contactState;
    if (this.onPageOneContact()) return;
    this.setState(
      {
        contactState: {
          ...this.state.contactState,
          pageNumber: pageNumber - 1,
        },
      },
      this.getContact
    );
  }

  runOutOfContact() {
    const { pageNumber, pageSize, total } = this.state.contactState;
    const hasReminder = (total / pageSize) - Math.floor(total / pageSize) > 0
    if (pageNumber + 1 > Math.floor(total / pageSize) + (hasReminder ? 1 : 0)) {
      return true;
    }
    return false;
  }

  onPageOneContact() {
    const { pageNumber } = this.state.contactState;
    if (pageNumber - 1 <= 0) {
      return true;
    }
    return false;
  }

  onClick(params) {
    console.log(params);
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-home"></i>
            </span>{" "}
            Dashboard{" "}
          </h3>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              {this.state.booktableState.loading && <Spinner />}
              <div className="card-body">
                <h4 className="card-title">Recent Booking</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th> Date </th>
                        <th> Time </th>
                        <th> People </th>
                        <th> Message </th>
                        <th> Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.booktable.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={require("../../assets/images/faces/face2.jpg")}
                              className="mr-2"
                              alt="face"
                            />{" "}
                            {item.name}{" "}
                          </td>
                          <td> {item.email} </td>

                          <td> {item.phone} </td>
                          <td> {item.date} </td>
                          <td> {item.time} </td>

                          <td> {item.numPeople} </td>
                          <td className="message-container">
                            {" "}
                            {item.message}{" "}
                          </td>
                          <td>
                            {item.status === 0 ? (
                              <label className="badge badge-gradient-danger">
                                PENDING
                              </label>
                            ) : (
                              <label className="badge badge-gradient-success">
                                CONFIRMED
                              </label>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center w-100 mb-3 col-12">
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="outline-primary"
                disabled={this.onPageOneBookTable()}
                onClick={() => this.previousBookTable()}
              >
                Previous
              </Button>
              <Button
                variant="outline-primary"
                disabled={this.runOutOfBookTable()}
                onClick={() => this.nextBookTable()}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              {this.state.contactState.loading && <Spinner />}
              <div className="card-body">
                <h4 className="card-title">Recent Contacts</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Subject </th>
                        <th> Message </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.contact.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img
                              src={require("../../assets/images/faces/face2.jpg")}
                              className="mr-2"
                              alt="face"
                            />{" "}
                            {item.name}{" "}
                          </td>
                          <td> {item.email} </td>

                          <td> {item.subject} </td>
                          <td> {item.message} </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end align-items-center w-100 mb-3 col-12">
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="outline-primary"
                disabled={this.onPageOneContact()}
                onClick={() => this.previousContact()}
              >
                Previous
              </Button>
              <Button
                variant="outline-primary"
                disabled={this.runOutOfContact()}
                onClick={() => this.nextContact()}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
