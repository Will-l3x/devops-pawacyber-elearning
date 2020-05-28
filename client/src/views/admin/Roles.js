import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {AdminService} from '../../services/admin';

export class RolesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        columns: [
          {
            label: "Role Id ",
            field: "roleId",
            sort: "asc",
            width: "24%",
          },
          {
            label: "Role Name",
            field: "rolename",
            sort: "asc",
            width: "10%",
          }
        ],
        rows: [],
      
    };
  }
  
  componentDidMount() {
    this.getDashData();
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
  }

  getDashData(){
    AdminService.get_roles()
    .then((response) => {
        console.log(response);
      this.setState({ rows: response});
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    var data = {
      rolename: event.target.rolename.value,
    }
    AdminService.post_new_role(data).then((response)=>{
      if(response===undefined){
        alert(response.message);
      }else{
        alert(response.message);
        document.getElementById("sibs").reset();
        this.getDashData();
      }
    })
  }

  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <SideBar />
            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav className="navbar nav-extended" style={{ position: "fixed"}} >
                  <div className="nav-content">
                    <p style={{padding:"10px", fontSize:"16px"}} >
                      Manage Roles
                    </p>
                  </div>
                </nav>
              </div>
              <div>
              <section  className = "row" id="content" style={{ paddingTop: "7%" }}>
                <div className="container  col s12 m6 6">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12" style={{padding:"20px"}}>
                        <DatatablePage data={this.state} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container col s12 m6 6">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12">
                      <div className="modal-content">
                        <h4 className="header2">Add New Role</h4>
                        <form onSubmit={this.handleSubmit} id="sibs">
                          <div className="row">
                            <div className="col s12">
                              <div className="row">
                                <div className="input-field col s6">
                                  <input id="rolename" type="text" name="rolename"></input>
                                  <label htmlFor="rolename">Role Name</label>
                                </div>
                                <div className="input-field col s4">
                                <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
                                    Submit
                                    <i className="material-icons right">send</i>
                                  </button>
                                </div>
                            </div>
                            </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesScreen);
