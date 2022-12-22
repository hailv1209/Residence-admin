import axios from "axios";
import React, { Component } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import moment from "moment";
import "./dashboard.css";
import Spinner from "../../app/shared/Spinner";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";


export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TempResidence: [],
      TempResidenceState: {
        pageSize: 5,
        pageNumber: 1,
        total: 0,
        loading: true,
      },
      DeleteTempResidence: [],
      DeleteTempResidenceState: {
        pageSize: 5,
        pageNumber: 1,
        total: 0,
        loading: true,
      },
      user: [],
      userState : {
        pageSize: 5,
        pageNumber: 1,
        total: 0,
        loading: true,
      },

    };
  }

  componentDidMount() {
    const userJson = localStorage.getItem("Reveal_user_data");
    if (!userJson) {
      this.props.history.push("login");
      return;
    }
    this.getTempResidence();
    this.getDeleteTempResidence();
    this.getUser();
  }

  getTempResidence() {
    // console.log(this.state.TempResidenceState);
    const { pageNumber, pageSize } = this.state.TempResidenceState;
    const url = `https://localhost:7180/api/TempResidence/admin?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    const user = JSON.parse(localStorage.getItem("Reveal_user_data"));
    axios.defaults.headers.common["Authorization"] = user
      ? `Bearer ${user.token}`
      : "";
    this.setState({
      TempResidenceState: { ...this.state.TempResidenceState, loading: true },
    });
    axios.get(url).then((res) => {
      console.log(res);
      this.setState({
        TempResidence: res.data.data,
        TempResidenceState: {
          ...this.state.TempResidenceState,
          total: res.data.total,
          loading: false,
        },
      });
    });
  }

  getDeleteTempResidence() {
    const { pageNumber, pageSize } = this.state.DeleteTempResidenceState;
    const url = `https://localhost:7180/api/TempResidenceDelete/admin?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    const user = JSON.parse(localStorage.getItem("Reveal_user_data"));
    axios.defaults.headers.common["Authorization"] = user
      ? `Bearer ${user.token}`
      : "";
    this.setState({
      DeleteTempResidenceState: { ...this.state.DeleteTempResidenceState, loading: true },
    });
    axios.get(url).then((res) => {
      console.log(res);
      this.setState({
        DeleteTempResidence: res.data.data,
        DeleteTempResidenceState: {
          ...this.state.DeleteTempResidenceState,
          total: res.data.total,
          loading: false,
        },
      });
    });
  }

  getUser() {
    const { pageNumber, pageSize } = this.state.userState;
    const url = `https://localhost:7180/api/ResidenceInformation/admin?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    const user = JSON.parse(localStorage.getItem("Reveal_user_data"));
    axios.defaults.headers.common["Authorization"] = user
      ? `Bearer ${user.token}`
      : "";
    this.setState({
      userState: { ...this.state.userState, loading: true },
    });
    axios.get(url).then((res) => {
      console.log(res);
      this.setState({
        user: res.data.data,
        userState: {
          ...this.state.userState,
          total: res.data.total,
          loading: false,
        },
      });
    });
  }

  
  nextTempResidence() {
    const { pageNumber } = this.state.TempResidenceState;
    if (this.runOutOfTempResidence()) return;
    this.setState(
      {
        TempResidenceState: {
          ...this.state.TempResidenceState,
          pageNumber: pageNumber + 1,
        },
      },
      this.getTempResidence
    );
  }

  previousTempResidence() {
    const { pageNumber } = this.state.TempResidenceState;
    if (this.onPageOneTempResidence()) return;
    this.setState(
      {
        TempResidenceState: {
          ...this.state.TempResidenceState,
          pageNumber: pageNumber - 1,
        },
      },
      this.getTempResidence
    );
  }

  runOutOfTempResidence() {
    const { pageNumber, pageSize, total } = this.state.TempResidenceState;
    const hasReminder = (total / pageSize) - Math.floor(total / pageSize) > 0
    if (pageNumber + 1 > Math.floor(total / pageSize) + (hasReminder ? 1 : 0)) {
      return true;
    }
    return false;
  }

  onPageOneTempResidence() {
    const { pageNumber } = this.state.TempResidenceState;
    if (pageNumber - 1 <= 0) {
      return true;
    }
    return false;
  }

  nextDeleteTempResidence() {
    const { pageNumber } = this.state.DeleteTempResidenceState;
    if (this.runOutOfDeleteTempResidence()) return;
    this.setState(
      {
        DeleteTempResidenceState: {
          ...this.state.DeleteTempResidenceState,
          pageNumber: pageNumber + 1,
        },
      },
      this.getDeleteTempResidence
    );
  }

  previousDeleteTempResidence() {
    const { pageNumber } = this.state.DeleteTempResidenceState;
    if (this.onPageOneDeleteTempResidence()) return;
    this.setState(
      {
        DeleteTempResidenceState: {
          ...this.state.DeleteTempResidenceState,
          pageNumber: pageNumber - 1,
        },
      },
      this.getDeleteTempResidence
    );
  }

  runOutOfDeleteTempResidence() {
    const { pageNumber, pageSize, total } = this.state.DeleteTempResidenceState;
    const hasReminder = (total / pageSize) - Math.floor(total / pageSize) > 0
    if (pageNumber + 1 > Math.floor(total / pageSize) + (hasReminder ? 1 : 0)) {
      return true;
    }
    return false;
  }

  onPageOneDeleteTempResidence() {
    const { pageNumber } = this.state.DeleteTempResidenceState;
    if (pageNumber - 1 <= 0) {
      return true;
    }
    return false;
  }

  nextUser() {
    const { pageNumber } = this.state.userState;
    if (this.runOutOfDeleteTempResidence()) return;
    this.setState(
      {
        userState: {
          ...this.state.userState,
          pageNumber: pageNumber + 1,
        },
      },
      this.getUser
    );
  }

  previousUser() {
    const { pageNumber } = this.state.userState;
    if (this.onPageOneDeleteTempResidence()) return;
    this.setState(
      {
        userState: {
          ...this.state.userState,
          pageNumber: pageNumber - 1,
        },
      },
      this.getUser
    );
  }

  runOutOfUser() {
    const { pageNumber, pageSize, total } = this.state.userState;
    const hasReminder = (total / pageSize) - Math.floor(total / pageSize) > 0
    if (pageNumber + 1 > Math.floor(total / pageSize) + (hasReminder ? 1 : 0)) {
      return true;
    }
    return false;
  }

  onPageOneUser() {
    const { pageNumber } = this.state.userState;
    if (pageNumber - 1 <= 0) {
      return true;
    }
    return false;
  }

  ConfirmTempResidence (id) {
    const url = "https://localhost:7180/api/TempResidence/admin";
    const user = JSON.parse(localStorage.getItem("Reveal_user_data"));
    axios.defaults.headers.common["Authorization"] = user
      ? `Bearer ${user.token}`
      : "";
      this.setState({
        TempResidenceState: {
          ...this.state.TempResidenceState,
          loading: true,
        },
      });
      axios.patch(url, {
        
          "idHoSoDkiTamtru": id,
          "trangThai": "Confirm"
        
      },{ headers: {
        'Content-Type': 'application/json'
      }})
      .then((res) => {
   
        this.getTempResidence();
       
        toast.success("Duyệt Hồ sơ thành công !", {
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
        this.setState({
          TempResidenceState: {
            ...this.state.TempResidenceState,
            loading: false,
          },
        });
        toast.error("Duyệt hồ sơ thất bại !", {
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

    ConfirmDeleteTempResidence (idHoSoDangKiTamTru,idHoSoXoaGiaHan) {
      const url = "https://localhost:7180/api/TempResidenceDelete/admin/delete";
      const user = JSON.parse(localStorage.getItem("Reveal_user_data"));
      axios.defaults.headers.common["Authorization"] = user
        ? `Bearer ${user.token}`
        : "";
        this.setState({
          DeleteTempResidenceState: {
            ...this.state.DeleteTempResidenceState,
            loading: true,
          },
        });
        axios.delete(url, {
          
              "idHoSoDangKiTamTru": idHoSoDangKiTamTru,
              "idHoSoXoaGiaHan": idHoSoXoaGiaHan        
          
        },{ headers: {
          'Content-Type': 'application/json'
        }})
        .then((res) => {
          this.getDeleteTempResidence();
          toast.success("Xóa Hồ sơ thành công !", {
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
          this.setState({
            DeleteTempResidenceState: {
              ...this.state.DeleteTempResidenceState,
              loading: false,
            },
          });
          toast.error("Xóa hồ sơ thất bại !", {
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
    CitizenDeclaration (id,idCongdan) {
      console.log(id);
      const url = `https://localhost:7180/api/CitizenDeclaration/download/${id}`
      const user = JSON.parse(localStorage.getItem("Reveal_user_data"));
      axios.defaults.headers.common["Authorization"] = user
        ? `Bearer ${user.token}`
        : "";
      axios.get(url,{ headers: {
        'Content-Type': 'blob'
      }})
      .then(res => res.blob())
      .then((res) => {
        saveAs(res.data,`Tờ khai công dân id ${idCongdan}`);
      })
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
              <i className="mdi mdi-download"></i>
            </span>{" "}
            Dashboard{" "}
          </h3>
        </div>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              {this.state.userState.loading && <Spinner />}
              <div className="card-body">
                <h4 className="card-title">Residence Information</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> </th>
                        <th> Id User </th>
                        <th> FullName </th>
                        <th> Gender </th>  
                        <th> Birthday </th>
                        <th> Email </th>
                        <th> Phone </th>
                        <th> City </th>
                        <th> District </th>
                        <th> Ward </th>
                        <th> Address </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.user.map((item) => (
                        <tr key={item.idUsers}>
                          <td>
                            <img
                              src={require("../../assets/images/faces/face2.jpg")}
                              className="mr-2"
                              alt="face"
                            />{" "}
                            {}{" "}
                          </td>
                          <td> {item.idUsers} </td>
                          <td> {item.fullname} </td>

                          <td> {item.gender} </td>
                          <td> {moment(new Date(item.birthday)).format("DD/MM/YYYY")} </td>
                          <td> {item.email} </td>
                          <td> {item.phone} </td>
                          <td> {item.city} </td> 
                          <td> {item.district} </td>
                          <td> {item.ward} </td>
                          <td> {item.address} </td>
                          {/* <td>
                            {item.status === 0 ? (
                              <label className="badge badge-gradient-danger">
                                PENDING
                              </label>
                            ) : (
                              <label className="badge badge-gradient-success">
                                CONFIRMED
                              </label>
                            )}
                          </td> */}
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
                disabled={this.onPageOneUser()}
                onClick={() => this.previousUser()}
              >
                Previous
              </Button>
              <Button
                variant="outline-primary"
                disabled={this.runOutOfUser()}
                onClick={() => this.nextUser()}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              {this.state.TempResidenceState.loading && <Spinner />}
              <div className="card-body">
                <h4 className="card-title">Hồ Sơ Đăng Ký Tạm Trú</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> IdHoSoDkiTamtru </th>
                        <th> IdUsers </th> 
                        <th> Thủ Tục </th>  
                        <th> Thành Phố </th>
                        <th> Quận </th>
                        <th> Phường </th>
                        <th> Địa Chỉ </th>
                        <th> Họ Tên Chủ Hộ </th>
                        <th> Quan Hệ Với Chủ Hộ </th>
                        <th> CMND Chủ Hộ </th>
                        <th> Nội Dung </th>
                        <th> Tạm Trú Từ Ngày </th>
                        <th> Tạm Trú Đến Ngày </th>
                        <th> Tờ Khai </th>
                        <th> Trạng Thái </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.TempResidence.map((item) => (
                        <tr key={item.idHoSoDkiTamtru}>
                          <td>    
                            {item.idHoSoDkiTamtru}
                          </td>
                          <td> {item.idUsers} </td>
                          <td> {item.thuTuc} </td>
                          <td> {item.thanhPho} </td>
                          <td> {item.quan} </td>
                          <td> {item.phuong} </td>
                          <td> {item.diaChi} </td>
                          <td> {item.hoTenChuHo} </td>
                          <td> {item.quanHeVoiChuHo} </td>
                          <td> {item.cmndChuHo} </td>
                          <td> {item.noiDung} </td>
                          <td> {moment(new Date(item.tamTruTuNgay)).format("DD/MM/YYYY")} </td>
                          <td> {moment(new Date(item.tamTruDenNgay)).format("DD/MM/YYYY")} </td>
                          <td>  <i className="mdi mdi-download" onClick={() => this.CitizenDeclaration(item.idToKhai,item.idUsers)}></i> </td>
                          <td>  {item.trangThai === "Pending" ? (
                              <label className="badge badge-gradient-danger">
                                PENDING
                              </label>
                            ) : (
                              <label className="badge badge-gradient-success">
                                CONFIRMED
                              </label>
                            )} </td>
                          <td> {item.trangThai === "Confirm" ? (
                            <Button variant="primary" disabled>Duyệt</Button>
                          ) : (
                            <Button variant="primary" onClick={() => this.ConfirmTempResidence(item.idHoSoDkiTamtru)}>Duyệt</Button>
                          )      
                            }
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
                disabled={this.onPageOneTempResidence()}
                onClick={() => this.previousTempResidence()}
              >
                Previous
              </Button>
              <Button
                variant="outline-primary"
                disabled={this.runOutOfTempResidence()}
                onClick={() => this.nextTempResidence()}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              {this.state.DeleteTempResidenceState.loading && <Spinner />}
              <div className="card-body">
                <h4 className="card-title">Hồ Sơ Xóa Đăng Ký Tạm Trú</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> IdHoSoDkiTamtru </th>
                        <th> IdUsers </th> 
                        <th> Thành Phố </th>
                        <th> Quận </th>
                        <th> Phường </th>
                        <th> Địa Chỉ </th>
                        <th> Họ Tên Chủ Hộ </th>
                        <th> CMND Chủ Hộ </th>
                        <th> Tạm Trú Từ Ngày </th>
                        <th> Tạm Trú Đến Ngày </th>
                        <th> Tờ Khai </th>
                        <th> Trạng Thái </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.DeleteTempResidence.map((item) => (
                        <tr key={item.idHoSoDkiTamtru}>
                        <td>    
                          {item.idHoSoDkiTamtru}
                        </td>
                        <td> {item.idUsers} </td>
                        <td> {item.thanhPho} </td>
                        <td> {item.quan} </td>
                        <td> {item.phuong} </td>
                        <td> {item.diaChi} </td>
                        <td> {item.hoTenChuHo} </td>
                        <td> {item.cmndChuHo} </td>
                        <td> {moment(new Date(item.tamTruTuNgay)).format("DD/MM/YYYY")} </td>
                        <td> {moment(new Date(item.tamTruDenNgay)).format("DD/MM/YYYY")} </td>
                        <td> <i className="mdi mdi-download" onClick={() => this.CitizenDeclaration(item.idToKhai,item.idUsers)}></i> </td>
                        <td>  {item.trangThai === "Pending" ? (
                            <label className="badge badge-gradient-danger">
                              PENDING
                            </label>
                          ) : (
                            <label className="badge badge-gradient-success">
                              CONFIRMED
                            </label>
                          )} </td>    
                        <td> {item.trangThai === "Confirm" ? (
                          <Button variant="primary" disabled>Duyệt</Button>
                        ) : (
                          <Button variant="primary" onClick={() => this.ConfirmDeleteTempResidence(item.idHoSoDkiTamtru,item.idHoSoXoaGiaHan)}>Duyệt</Button>
                        )      
                          }
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
                disabled={this.onPageOneDeleteTempResidence()}
                onClick={() => this.previousDeleteTempResidence()}
              >
                Previous
              </Button>
              <Button
                variant="outline-primary"
                disabled={this.runOutOfDeleteTempResidence()}
                onClick={() => this.nextDeleteTempResidence()}
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
