import React, { Component } from 'react'
import { StudentService } from '../../services/student';
import { AdminService } from '../../services/admin';

export default class ResourceCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resources: [],
    };
  }

  componentDidMount() {
    this.getDashData();
  }

  getDashData() {
    AdminService.get_all_resources()
      .then((response) => {
        this.setState({ resources: response })
      });
  }

  download(resource) {
    var data = {
      file: resource.file
    }
    setTimeout(() => {
      StudentService.download(data)
        .then((response) => {
          window.open(URL.createObjectURL(response));
        });
    }, 100);
  }


  render() {
    return this.state.resources.map((resource, i) => (
      <div key={i} className="col s6 m2">
        <div className="card min-height-100 z-depth-2 white-text designed-dots" style={{ borderRadius: "5px", backgroundColor: "white" }}>
          <div className="padding-4">
            <div className="col s12 m12">
              <p className="no-margin" style={{ color: "teal", }}><b>{resource.materialname}</b></p>
              <p className="no-margin" style={{ fontSize: "12px", color: "grey" }}>Subject ID: {resource.classid}</p>
            </div>
            <div className="right-align" style={{ marginTop: "60px", color: "white" }}>
              <p className="no-margin"><a style={{ border: "1px solid #2196F3", color:"white",backgroundColor: "#2196F3", borderRadius: "15px",padding:"5px",textAlign:"center" }} onClick={() => { this.download(resource) }} >Download</a></p>
            </div>
          </div>
        </div>
      </div>
    )
    )
  }
}
