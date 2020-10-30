import React, { Component } from 'react'
import M from "materialize-css";
import Select from 'react-select';


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
                var numberOfCourses = [{value:'all',label: 'All Subjects'}];
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            case '4 - 7':
                numberOfCourses = [{value:'all',label: 'All Subjects'}];
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            case '8 - 9':
                numberOfCourses = [{value:'3',label: '3 Subjects'},{value:'6',label: '6 Subjects'},{value:'9',label: '9 Subjects'}]
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            case '10 - 11':
                numberOfCourses = [{value:'6',label: '6 Subjects'},{value:'9',label: '9 Subjects'}]
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            case '12':
                numberOfCourses = [{value:'3',label: '3 Subjects'},{value:'4',label: '4 Subjects'},{value:'5',label: '5 Subjects'}]
                return this.setState({level: event.target.value, hiddenProp:false, noSubs:numberOfCourses});
            default:
              return null;
          }
    }

        // AuthService.register(registerAdmin).then((response) => {
        //     if (response === undefined) {
        //         alert("Registration Failed");
        //     } else if (response.success === false) {
        //         alert(response.message);
        //     } else {
        //         alert(response.message);
        //         document.getElementById("contactForm").reset();
        //         return <Redirect to="/login"/>;
        //     }
        // });


    render(){

        return (
            <div className="col s12 m7" style={{maxWidth:"600px"}}>
            
            <div className="row mt-1">
            <form id="contactForm" data-toggle="validator" data-focus="false" >
                <div className="col s12 m6">  
                        <div className="input-field">
                            <input id="schoolId" type="text" className="validate" name="schoolId" required></input>
                            <label htmlFor="schoolId">Enter School ID* </label>
                        </div>
                    </div>
                    <div className="col s12 m2">  
                    <div className="input-field">
                        <button type="submit" className="form-control-submit-button">Search</button>
                    </div>
                    </div>
                    </form>
                    </div>



            <div className="independentStudent" hidden={true}>
                <form id="contactForm" data-toggle="validator" data-focus="false" >
                <div className="row mt-1" >
                <div className="col s12 m4">  
                        <div className="input-field">
                            <input id="schoolId" type="text" className="validate" name="schoolId" disabled></input>
                            <label htmlFor="schoolId">Independent Student</label>
                        </div>
                    </div>
                <div className="col s12 m6">     
                 <div className="input-field">
                        <select name="title" defaultValue={this.state.title}  onChange={this.handleTitleDropdownChange} required>                              
                            <option value="0 - 3">Junior Primary School</option> 
                            <option value="4 - 7">Senior Primary School</option> 
                            <option value="8 - 9">Junior Secondary School</option> 
                            <option value="10 - 11">Ordinary Level</option> 
                            <option value="12">Advanced Subsidiary</option> 
                        </select>
                        <label htmlFor="title">Select Education Level* </label>
                    </div>
                    </div>
                    <div className="col s12 m2">  
                        <div className="input-field">
                            <input id="grades" type="text" className="validate" name="grades" disabled value={this.state.level}></input>
                            <label htmlFor="grades">Grades </label>
                        </div>
                    </div>
                    <div className="col s12 m8" hidden={this.state.hiddenProp}>     
                        <div className="input-field">
                            <Select className="" name="packages" options = {this.state.noSubs} placeholder="Select Package" />                          
                        </div>
                    </div>
                </div>                                               
                <div className="form-group">
                    <button type="submit" className="form-control-submit-button disabled">PROCEED TO PAY</button>
                </div>
                </form>
</div>
               
         
        </div> 

        );
}};