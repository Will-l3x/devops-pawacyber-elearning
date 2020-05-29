import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {TeacherService} from '../../services/teacher';
import {StudentService} from '../../services/student';

export class UploadMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        columns: [
          {
            label: "Class ID",
            field: "classid",
            sort: "asc",
            width: "20%",
          },
          {
            label: "Resource Name",
            field: "materialname",
            sort: "asc",
            width: "30%",
          },
          {
            label: " Link",
            field: "file",
            sort: "asc",
            width: "30%",
          },
        ],
        rows: [],
        courses:[]
    };
  }

  user = {};
  courseId = "1";
  fileData;

  componentDidMount() {
    this.user= JSON.parse(localStorage.getItem("user"));
    this.getDashData();
    M.AutoInit();
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
  }

  getDashData(){

    StudentService.get_all_courses(this.user.userid) 
    .then((response) => {
      this.setState({ courses: response })
    });
    if(this.state.courses.length>0){
        this.courseId = this.state.courses[0].classId;
        alert(this.courseId);
        TeacherService.get_materials(this.courseId) //get by course id 
        .then((response) => {
          this.setState({ rows: response })
        });
    }
  }


  handleSubmit = (event) => {
    event.preventDefault()
    this.fileData = event.target.file.value;
    var data = {
        teacherid: this.user.userid,
        schoolid: this.user.schoolid,
        materialname: event.target.materialname.value,
        file: true,
        classid: this.courseId
    }

    TeacherService.post_material(data).then((response)=>{
       
        if(response === undefined){
          alert('Resource Upload failed');
        }else if(response.err){
            alert(response.err)
        }else if(response.success === true){

          const uploadData = new FormData() 
          uploadData.append('file', this.fileData)
          uploadData.append('uploadType',response.uploadType)
          uploadData.append('uploadType',response.uploadId)

          TeacherService.post_file(uploadData).then((response)=>{
            console.log(response);
          });

          document.getElementById("sibs").reset();
          this.getDashData();
        }else{
          alert(response.message)
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
                      Resource Management
                    </p>
                  </div>
                </nav>
              </div>
              <section className = "row" id="content" style={{ paddingTop: "7%" }}>
                <div className="container col s6">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12" style={{padding:"20px"}}>
                        <DatatablePage data={this.state} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container col s6">
                  <div className="card-stats z-depth-5 padding-3">
                    <div className="row mt-1">
                      <div className="col s12 m6 l12">
                      <h4 className="header2">Upload Resource</h4>
                      <form onSubmit={this.handleSubmit} id="sibs">
                      <div className="row">
                        <div className="col s12">
                          <div className="row">

                            <div className="input-field col s4">
                              <input id="materialname" type="text" name="materialname" required></input>
                              <label htmlFor="materialname">Material Name</label>
                            </div>
                            <div className="input-field col s8">
                              <input id="file" type="file" name="file" required></input>
                            </div>
                            </div>

                        </div>
                          <div className="row">
                            <div className="input-field col s6 offset-s6">
                              <button className="btn file-upload gradient-45deg-light-blue-cyan waves-effect waves-light right">
                                Upload
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
)(UploadMaterial);
