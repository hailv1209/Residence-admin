import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form as BootstrapForm } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../app/shared/Spinner";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      loading: false
    }
  }
  onSubmit(value) {
    const body = { ...value };
    const url = `https://best-web-design-api.herokuapp.com/Account/login`;
    this.setState({loading: true});
    axios.post(url, body).then((res) => {
      this.setState({loading: false});
      const user = res.data;
      localStorage.setItem("demeter_user_data", JSON.stringify(user));
      toast.success("Login success!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.history.push("/dashboard");
    })
    .catch(err => {
      this.setState({loading: false});
      toast.error("Login failed!", {
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
  render() {
    console.log(this.props);
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5  position-relative">
                {this.state.loading && <Spinner></Spinner>}
                <div className="brand-logo d-flex align-items-center ">
                <img src={require('../../assets/images/logo.jpg')} alt="logo" /><span>Demeter</span>
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  className="pt-3"
                  onSubmit={this.onSubmit}
                >
                  <Form>
                    <BootstrapForm.Group className="d-flex search-field">
                      <Field
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="h-auto form-control form-control-lg"
                        name="username"
                      />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group className="d-flex search-field">
                      <Field
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="h-auto form-control form-control-lg"
                        name="password"
                      />
                    </BootstrapForm.Group>
                    <div className="mt-3">
                      <Button
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        type="submit"
                      >
                        SIGN IN
                      </Button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
