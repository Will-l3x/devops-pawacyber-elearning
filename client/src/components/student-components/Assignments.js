import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class PendingAssignments extends Component {
    render() {
        return this.props.pendingWork.map((pendingWork, i)=>(
              <li key={i} className="collection-item dismissable">
                <input type="checkbox" id="task1" />
                <label htmlFor="task1">
                  {pendingWork.courseName}
                  <Link to="" className="secondary-content">
                    <span className="ultra-small">{pendingWork.dueDate}</span>
                  </Link>
                </label>
              </li>
        ))
    }
}
