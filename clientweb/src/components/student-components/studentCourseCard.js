import React, { Component } from 'react'

export default class StudentCourseCard extends Component {
    render() {
        var count = 0;
        var colors = ['gradient-45deg-light-blue-cyan','gradient-45deg-green-teal','gradient-45deg-red-pink','gradient-45deg-brown-brown','gradient-45deg-purple-pink', 'gradient-45deg-orange-deep-orange']
        return this.props.courses.map(function(course){
           var countRand = Math.floor( Math.random() * 6);
           if(countRand === count){
            count = Math.floor( Math.random() * 6);
           }else{
               count = countRand;
           }
           console.log(count);
        return(
        <div className="col s12 m6 l3">
                <div className="col s12">
                    <div className={`card ${colors[count]} white-text  hovCard`} style={{boxShadow:'100px', borderRadius:'5px'}}>
                        <div className="col s11 m7">
                            <p>{course.courseName}</p>
                        </div>
                        <div className="col s1"  style={{paddingTop: '10px', paddingBottom:'10px', position:'center', paddingLeft:'40px',  paddingRight:'10px'}}>
                        <i className={`material-icons background-round mt-2 `} style={{padding: '10px'}}>
                          link
                        </i>
                        </div>
                    </div>
                </div>

                
        </div>
        )
    })
    }
}

