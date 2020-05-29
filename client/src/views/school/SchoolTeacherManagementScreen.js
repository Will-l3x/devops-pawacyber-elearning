import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {SchoolService} from '../../services/school';

export class SchoolTeacherManagementScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        columns: [
          {
            label: "ID",
            field: "teacherId",
            sort: "asc",
            width: "20%",
          },
          {
            label: "Teacher Name",
            field: "firstname",
            sort: "asc",
            width: "30%",
          },
          {
            label: "Teacher Surname",
            field: "lastname",
            sort: "asc",
            width: "30%",
          },
          {
            label: "Date Joined",
            field: "datejoined",
            sort: "asc",
            width: "20%",
          }
        ],
        rows: [],
    };
  }
  
  user = {};
  componentDidMount() {
    this.user= JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
  }

  getDashData(){
    // SchoolService.get_all_teachers('2') 
    SchoolService.get_all_teachers(this.user.schoolid) 
    .then((response) => {
      this.setState({ rows: response })
    });
  }

  handleSubmit = (event) => {
    event.preventDefault()

    var data = {
        schoolId: this.user.schoolid,
        firstname: event.target.firstName.value,
        lastname: event.target.lastName.value,
    }
    SchoolService.post_new_teachers(data).then((response)=>{
        console.log(response);
        if(response === undefined){
          alert('Teacher addition failed');
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
                <nav
                  className="navbar nav-extended"
                  style={{
                    position: "fixed",
                  }}
                >
                  <div className="nav-content">
                    <p style={{ padding: "10px",fontSize:"16px" }} >
                      Teacher Management
                    </p>
                  </div>
                </nav>
              </div>
              <section className = "row" id="content" style={{ paddingTop: "7%" }}>
                <div className="container col s8">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12" style={{padding:"20px"}}>
                        <DatatablePage data={this.state} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container col s4">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12">
                      <h4 className="header2">Add Teacher</h4>
                      <form onSubmit={this.handleSubmit} id="sibs">
                      <div className="row">
                        <div className="col s12">
                          <div className="row">
                            <div className="input-field col s6">
                              <input id="firstName" type="text" name="firstName" required></input>
                              <label htmlFor="firstName">Teacher First Name</label>
                            </div>
                            <div className="input-field col s6">
                              <input id="lastName" type="text" name="lastName" required></input>
                              <label htmlFor="lastName">Teacher Surname</label>
                            </div>
                        </div>
                        </div>
                          <div className="row">
                            <div className="input-field col s6 offset-s6">
                              <button className="btn file-upload gradient-45deg-light-blue-cyan waves-effect waves-light right">
                                Submit
                                <i className="material-icons right">send</i>
                              </button>
                            </div>
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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
)(SchoolTeacherManagementScreen);
