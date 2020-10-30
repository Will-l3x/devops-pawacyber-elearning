import React, { Component } from 'react'
import {StudentService} from '../../services/student';

// Search for downloadable assignments from endpoint and display them here. Select assignments from assignment table where id = data
export default class ShowAllAssignments extends Component {

  constructor(props) {
    super(props);
    this.state = {

      assignments: [],
    };
  }

   data='';
   
  componentDidMount() {
    this.data = this.props.content;
    this.getDashData();
  }

  getDashData(){ 
     StudentService.get_student_all_classwork(this.data) // by course id
     .then((response) => {
       console.log(response)
       this.setState({ assignments: response })
     });
    }

    render() {
     
        return this.state.assignments.map((assignment, i) => (
            <div key={assignment.assignmentId}  className="col s12 m8 l4">
              <div className="card min-height-100 white-text designed-dots" style={{borderRadius:"5px"}}>
                <div className="padding-4">
                <div className="col s12 m12">
                    <p className="no-margin" style={{color:"teal",}}><b>{assignment.assignmentname}</b></p>
                    <p className = "no-margin" style={{fontSize:"12px", color:"grey"}}>{assignment.duedate}</p>
                  </div>
                  <div className="right-align" style={{marginTop:"60px",color:"black"}}>
                    <p className="no-margin"><a href={assignment.file} target="bank">DOWNLOAD</a></p>
                  </div> 
                </div>
              </div>
            </div>
        )
            )
    }
}
