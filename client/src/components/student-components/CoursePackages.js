import React, { Component } from 'react'
import {AuthService} from '../../services/authServices';
import { Redirect } from "react-router-dom";
import M from "materialize-css";


export default class CoursePackages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level:"0 - 3",
            hiddenProp:true,
            noSubs:[]
        };
        this.handleTitleDropdownChange = this.handleTitleDropdownChange.bind(this);
      }

      componentDidMount() {
        M.AutoInit();
      }
    
    handleTitleDropdownChange(event) {    
        switch(event.target.value) {
            case '0 - 3':
                var numberOfCourses = [{cost:'all',title: 'All Subjects'}];
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            case '4 - 7':
                numberOfCourses = [{cost:'all',title: 'All Subjects'}];
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            case '8 - 9':
                numberOfCourses = [{cost:'3',title: '3 Subjects'},{cost:'6',title: '6 Subjects'},{cost:'9',title: '9 Subjects'}]
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            case '10 - 11':
                numberOfCourses = [{cost:'6',title: '6 Subjects'},{cost:'9',title: '9 Subjects'}]
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            case '12':
                numberOfCourses = [{cost:'3',title: '3 Subjects'},{cost:'4',title: '4 Subjects'},{cost:'5',title: '5 Subjects'}]
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            default:
              return null;
          }
    }


    render(){
        return (
            <div className="col s12 m7" style={{maxWidth:"600px"}}>
            <form id="contactForm" data-toggle="validator" data-focus="false" >
                <div className="row mt-1">
                <div className="col s12 m6">     
                 <div className="input-field">
                        <select name="title" defaultValue={this.state.title}  onChange={this.handleTitleDropdownChange} required>                              
                            <option value="0 - 3">Junior Primary School</option> 
                            <option value="4 - 7">Senior Primary School</option> 
                            <option value="8 - 9">Junior Secondary School</option> 
                            <option value="10 - 11">Ordinary Level</option> 
                            <option value="12">Advanced Subsidiary</option> 
                        </select>
                        <label htmlFor="title">Education Level* </label>
                    </div>
                    </div>
                    <div className="col s12 m2">  
                        <div className="input-field">
                            <input id="grades" type="text" className="validate" name="grades" disabled value={this.state.level}></input>
                            <label htmlFor="lastname">Grades </label>
                        </div>
                    </div>
                    <div className="col s12 m12" hidden={this.state.hiddenProp}>     
                        <div className="input-field">
                             <p>Please select your gender:</p>
                             <div>
                                <input type="radio" value="Male" name="gender" /> Male
                                <input type="radio" value="Female" name="gender" /> Female
                                <input type="radio" value="Other" name="gender" /> Other
                            </div>
                          
                        </div>
                    </div>
                </div>                                               
           
                <div className="form-group">
                    <button type="submit" className="form-control-submit-button disabled">PROCEED TO PAY</button>
                </div>
                <div className="form-message">
                    <div id="cmsgSubmit" className="h3 text-center hidden"></div>
                </div>
            </form>
        </div> 

        );
}};