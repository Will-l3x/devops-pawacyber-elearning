import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class StudentCourseCard extends Component {
    render() {
        var count = -1;
        var colors = ['gradient-45deg-light-blue-cyan','gradient-45deg-red-pink','gradient-45deg-green-teal','gradient-45deg-amber-amber','red', 'teal accent-4']
        return this.props.courses.map(function(course){
            count +=1;
            if(count === 6){
                count = 0;
                console.log(count);
            }
            else{ 
                console.log(count);
            }
            var data = {
                'name':course.courseName,
                'courseId':course.id
            };

        return(
        <div className="col s12 m6 l3">
                <div className="col s12">
                    <div className={`card ${colors[count]}  white-text hovCard`} style={{boxShadow:'100px', borderRadius:'5px'}}>
                        <div className="col s11 m7  sub-card ">
                            <p>{course.courseName}</p>
                        </div>
                        <div className="col s1"  style={{paddingTop: '10px', paddingBottom:'10px', position:'center', paddingLeft:'40px',  paddingRight:'10px'}}>
                        <Link to={{pathname:"subject-content",data:data}}>
                        <i className={`material-icons background-round mt-2 `} style={{padding: '10px', color:'white'}}>
                          link
                        </i>
                        </Link>
                        </div>
                    </div>
                </div>
        </div>
        )
    })
    }
}

