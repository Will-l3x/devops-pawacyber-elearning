import React, { Component } from 'react'
import { Link } from "react-router-dom";


export default class MarkedAssignments extends Component {
    render() {

        return this.props.markedWork.map((course)=>
        (
              <li className="collection-item">
                  <Link to="#" className="">
                      <div className="row">
                        <div className="col s7">
                        <span className="task-cat" style={{color:'black'}}>{course.courseName}</span>
                        </div>
                        <div className="col s2">
                          <span className="task-cat deep-orange accent-2">
                          {course.score}
                          </span>
                        </div>
                        <div className="col s3">
                          <div className="progress">
                            <div
                              className="determinate"
                              style={{ width: `${course.score}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      </Link>
                    </li>


        )
        )
    }
}
