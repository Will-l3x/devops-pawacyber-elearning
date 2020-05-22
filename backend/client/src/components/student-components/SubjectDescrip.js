import React, { Component } from 'react'

// Search for downloadable resources from endpoint and display them here. Select resources from resource table where id = data
export default class SubjectDescrip extends Component {
    data = this.props.content;
            // resources returned from db
            state = {
                resources: [
                  {
                    resourceid: 1,
                    resourceName: "Syllabus",
                    resourceLink: "path/to/resource",
                    date: "12-05-2020"
                  },
                  {
                    resourceid: 2,
                    resourceName: "Introduction to computing",
                    resourceLink: "path/to/resource",
                    date:"14-05-2020"
                  },
                  {
                    resourceid: 2,
                    resourceName: "Unit 2",
                    resourceLink: "path/to/resource",
                    date:"15-05-2020"
                  },
                ],
              };
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
                    <p className="no-margin">DOWNLOAD</p>
                  </div> 
                </div>
              </div>
            </div>
        )
            )
    }
}
