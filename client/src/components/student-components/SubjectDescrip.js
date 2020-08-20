import React, { Component } from 'react'
import { StudentService } from '../../services/student';

export default class SubjectDescrip extends Component {

  constructor(props) {
    super(props);
    this.state = {

      resources: [],
    };
  }

  data = '';

  componentDidMount() {
    this.data = this.props.content;
    this.getDashData();
  }

  getDashData() {
    StudentService.get_course_downloadables(this.data)
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
      resource.materialname.includes(".mp4") ? <div></div>
        : <div key={i} className="col s12 m8 l4">
          <div className="card min-height-100 white-text designed-dots" style={{ borderRadius: "5px" }}>
            <div className="padding-4">
              <div className="col s12 m12">
                <p className="no-margin" style={{ color: "teal", }}><b>{resource.materialname}</b></p>
                <p className="no-margin" style={{ fontSize: "12px", color: "grey" }}>{resource.dateadded}</p>
              </div>
              <div className="right-align" style={{ marginTop: "60px", color: "black" }}>
                <p className="no-margin"><button onClick={() => { this.download(resource) }} >VIEW</button></p>

              </div>
            </div>
          </div>
        </div>
    )
    )
  }
}
