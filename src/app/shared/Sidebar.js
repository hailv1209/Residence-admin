import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        displayName: "",
        role: 0,
      },
    };
  }

  getRoleName(role) {
    return role === 0 ? "Employee" : "Manager";
  }

  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a
              href="!#"
              className="nav-link"
              onClick={(evt) => evt.preventDefault()}
            >
              <div className="nav-profile-image">
                <img
                  src={require("../../assets/images/faces/face2.jpg")}
                  alt="profile"
                />
                <span className="login-status online"></span>{" "}
                {/* change to offline or busy as needed */}
              </div>
              <div className="nav-profile-text">
                <span className="font-weight-bold mb-2">
                  <>{this.state.user.displayName}</>
                </span>
                <span className="text-secondary text-small">
                  <>{this.getRoleName(this.state.user.role)}</>
                </span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
            </a>
          </li>
          <li
            className={
              this.isPathActive("/dashboard") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/dashboard">
              <span className="menu-title">
                <>Dashboard</>
              </span>
              <i className="mdi mdi-home menu-icon"></i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("demeter_user_data"));
    user &&
      this.setState({
        user: { displayName: user.displayName, role: user.role },
      });
  }
}

export default withRouter(Sidebar);
