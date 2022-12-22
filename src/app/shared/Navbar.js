import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { toast } from "react-toastify";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        displayName: ''
      }
    }
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("Reveal_user_data"));
    user && this.setState({user: {displayName: user.displayName}});
  }

  logout() {
    toast.success("Logout success!", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    this.props.history.push("login");
    localStorage.removeItem("demeter_user_data");
  }
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }
  render () {
    return (
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo flex-container" to="/"><img src={require('../../assets/images/logoReveal.jpg')} alt="logo" /><span>Reveal</span></Link>
          <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../assets/images/logoReveal.jpg')} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile">
              <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link">
                  <div className="nav-profile-img">
                    <img src={require("../../assets/images/faces/face2.jpg")} alt="user"/>
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 text-black"><>{this.state.user.displayName}</></p>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="navbar-dropdown">
                  
                  <Dropdown.Item href="!#" onClick={evt => {evt.preventDefault(); this.logout()}}>
                    <i className="mdi mdi-logout mr-2 text-primary"></i>
                    <>Signout</>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={this.toggleOffcanvas}>
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
