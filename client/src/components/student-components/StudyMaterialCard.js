import React, { Component } from "react";
import avatar from "../../assets/images/icon/book_lover.png";
import SubplanOptions from "../../views/student/subplanOption";
import { StudentService } from "../../services/student";
import M from "materialize-css";
import Checkbox from "./Checkbox";

const items = ["One", "Two", "Three"];

export default class StudyMaterialCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unsubscribe: false,
      selectedOption: null,
    };
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  createCheckbox = (label) => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => items.map(this.createCheckbox);

  user = {};
  componentDidMount() {
    M.AutoInit();
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  onSelectOption = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(this.state.selectedOption)
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, "is selected.");
    }
    const elem = document.getElementById("modal1");
    const modal = new M.Modal(elem);
    modal.close();
    var data = {
      subscriptionid:
        this.state.selectedOption === null
          ? ""
          : this.state.selectedOption.value,
      classname: event.target.classname.value,
      enrolmentkey: "123ABC",
      status: "active",
      createdby: this.user.userid,
    };

    StudentService.subscribe(data).then((response) => {
      if (response === undefined) {
        alert("Apologies. Failed to subscribe. Please contact admin");
      } else if (response.success === false) {
        alert(response.message);
      } else {
        alert("successfully subscirbed");
        document.getElementById("sibs").reset();
        this.getDashData();
      }
    });
  };

  render() {
    return (
      <div>
        <div className="row card">
          <div
            className="col s2 "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={avatar}
              alt="Avatar"
              style={{ flexShrink: "0", maxWidth: "100%", maxHeight: "80px" }}
            ></img>
          </div>
          <div className="col s6 card-title">
            <div
              style={{
                fontSize: "16px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              Anytime is study time! Enrol for as many classes as you can to
              enjoy the full benefits of elearning
            </div>
          </div>

          <div
            className="col s4"
            style={{ paddingTop: "1.4%", paddingBottom: "1.3%" }}
          >
            <div
              data-target="modal1"
              className="modal-trigger tooltipped waves-effect right right-align"
              data-tooltip="Make Payment"
              data-position="bottom"
            >
              <div className="card btn" style={{ maxWidth: "150px" }}>
                Enrol Now
              </div>
            </div>
          </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4 className="header2">Add Class</h4>
            <form onSubmit={this.handleSubmit} id="sibs">
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s5">
                      <input
                        id="classname"
                        type="text"
                        name="classname"
                        required
                      ></input>
                      <label htmlFor="classname">Student Name</label>
                    </div>
                    <div className="input-field col s5">
                      <label
                        htmlFor="subscriptionid"
                        style={{
                          transform: "translateY(-15px)",
                          fontSize: "12px",
                        }}
                      >
                        Education Package
                      </label>
                      <SubplanOptions onSelectOption={this.onSelectOption} />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <h5>Select Subjects</h5>
                    <br />
                    <div className="col s2">
                      {/* {this.createCheckboxes()} */}

                      <label>
                        <input
                          type="checkbox"
                          className="filled-in"
                          value="Maths"
                          defaultChecked={false}
                          // onChange={this.toggleCheckboxChange}
                        />
                        Maths
                      </label>
                    </div>
                    <div className="col s2">
                      {/* {this.createCheckboxes()} */}

                      <label>
                        <input
                          type="checkbox"
                          className="filled-in"
                          value="Maths"
                          defaultChecked={false}
                          // onChange={this.toggleCheckboxChange}
                        />
                        English
                      </label>
                    </div>
                    <div className="col s2">
                      {/* {this.createCheckboxes()} */}

                      <label>
                        <input
                          type="checkbox"
                          className="filled-in"
                          value="Maths"
                          defaultChecked={false}
                          // onChange={this.toggleCheckboxChange}
                        />
                        Shona
                      </label>
                    </div>
                    <div className="col s2">
                      {/* {this.createCheckboxes()} */}

                      <label>
                        <input
                          type="checkbox"
                          className="filled-in"
                          value="Maths"
                          defaultChecked={false}
                          // onChange={this.toggleCheckboxChange}
                        />
                        Agriculture
                      </label>
                    </div>
                    {/* 
          <div className="input-field col s4">
            <select className="icons modal-width-230">
              <option value="default">Default</option>
              <option value="bg1">
                Background 1
              </option>
              <option value="bg2">
                Background 2
              </option>
              <option value="bg3">
                Background 3
              </option>
              <option value="bg4">
                Background 4
              </option>
              <option value="bg5">
                Background 5
              </option>
              <option value="bg6" >
                Background 6
              </option>

            </select>
            <label>Image Background</label>
          </div> */}
                  </div>
                </div>
                <button className="btn gradient-45deg-light-blue-cyan waves-effect waves-light right">
                  Make Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
