import React, { Component } from 'react'
import {StudentService} from '../../services/student';


export default class SubjectDescrip extends Component {
    data = this.props.content;

    constructor(props) {
      super(props);
      this.state = {
        resources: [],
      };
    }
  
    componentDidMount() {
      this.assignmentData();
    }
  
    assignmentData(){
      StudentService.get_course_downloadables('course_id')
      .then((response) => {
        this.setState({ resources: response })
      });
    }

    render() {
       
        return this.state.resources.map((resource, i) => (
     
            <div key={i}  className="col s12 m8 l4">
              <div className="card min-height-100 white-text designed-dots" style={{borderRadius:"5px"}}>
                <div className="padding-4">
                <div className="col s12 m12">
                    <p className="no-margin" style={{color:"teal",}}><b>{resource.resourceName}</b></p>
                    <p className = "no-margin" style={{fontSize:"12px", color:"grey"}}>{resource.date}</p>
                  </div>
                  <div className="right-align" style={{marginTop:"60px",color:"black"}}>
                    {/* <p className="no-margin"><a href={resource.resourceLink}>DOWNLOAD</a></p> */}
                    <p className="no-margin">DOWNLOAD</p>
                  </div> 
                </div>
              </div>
            </div>
        )
            )
    }
}
