import React, {Component} from 'react'
import Header from '../../components/header';
import LeftSidebar from '../../components/LeftSidebar';
import { Link } from "react-router-dom";

class StudentAssessment extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <header id="header" className="page-topbar">
                    <Header />
                </header>
                <main id='main'>
                    <LeftSidebar />

                    <section id = "content">
                        <div className = "container">
                            <div style={{ marginTop: "15px" }}>
                                <div id="card-widgets"> 
                                    <div className="row">
                                        <div className="col s12 m2 l3">
                                            <div className="column">
                                            <ul className="task-card collection with-header">
                                                <li className={`collection-header teal `}>
                                                 <p className="task-card-title">PAWA ASSESSMENT EXAMS</p>
                                                </li>
                                                <li className="collection-item dismissable">
                                                    <label htmlFor="task1">
                                                        All Exams
                                                        <Link
                                                        to="/multichoice"
                                                        
                                                        className="secondary-content"
                                                        >
                                                        <span className="ultra-small">VIEW</span>
                                                        </Link>
                                                    </label>
                                                    </li>
                                                    <li className="collection-item dismissable">
                                                        <label htmlFor="task1">
                                                            Structured Questions
                                                            <Link
                                                            to="#"
                                                            onClick={() =>
                                                                this.selectCategory(
                                                                "Structured Questions",
                                                                "Structured"
                                                                )
                                                            }
                                                            className="secondary-content"
                                                            >
                                                            <span className="ultra-small">Attempt</span>
                                                            </Link>
                                                        </label>
                                                    </li>
                                                    <li className="collection-item dismissable">
                                                        <label htmlFor="task1">
                                                            Multiple Choice Exam
                                                            <Link
                                                            to="#"
                                                            onClick={() =>
                                                                this.selectCategory(
                                                                "Multiple Choice",
                                                                "All"
                                                                )
                                                            }
                                                            className="secondary-content"
                                                            >
                                                            <span className="ultra-small">Attempt</span>
                                                            </Link>
                                                        </label>
                                                        </li>
                                            </ul>
                                            </div>
                                        </div>
                                        <div className="col s12 m13 l9">
                                            <div className="task-card collection with-header">
                                                <div className="collection-header teal">
                                                    <p
                                                    className="task-card-title"
                                                    style={{ color: "white" }}
                                                    >
                                                        Exam groups
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default StudentAssessment