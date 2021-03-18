import React, { Component } from "react";
import { connect } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import DatatablePage from "../../components/DatatablePage";
//import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { AdminService } from "../../services/admin";
import { Link } from "react-router-dom";

class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Package Name",
          field: "subscriptionname",
          sort: "asc",
          width: "25%",
        },

        {
          label: "Starting Grade",
          field: "mingrade",
          sort: "asc",
          width: "10%",
        },
        {
          label: "Ending Grade",
          field: "maxgrade",
          sort: "asc",
          width: "10%",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
          width: "10%",
        },
        {
          label: "Package Desccription",
          field: "description",
          sort: "asc",
          width: "20%",
        },
        {
          label: "# of subjects",
          field: "subjects",
          sort: "asc",
          width: "10%",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
          width: "15%",
        },
      ],
      rows: [],
      subId: "",
      selectedSub: {
        maxgrade: 3,
        mingrade: 0,
        price: 0,
        description: "",
        subscriptionname: "",
        subjects: "",
      },
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getDashData();
    M.AutoInit();
  }

  getDashData() {
    const subscriptions = [];
    AdminService.get_subs_plans().then((response) => {
      console.log(response);
      for (const subscription of response) {
        subscription.actions = (
          <ul className="card-action-buttons2">
            <li>
              <a
                href="#!"
                className="btn-floating waves-effect waves-light modal-trigger light-blue"
                data-target="modaledit"
                onClick={() => this.handleEdit(subscription)}
              >
                <i className="material-icons">create</i>
              </a>
            </li>
            <li>
              <a
                href="#!"
                className="btn-floating waves-effect waves-light modal-trigger red accent-2"
                data-target="areyousure"
                onClick={this.setState({ subId: subscription.subscriptionId })}
              >
                <i className="material-icons">delete</i>
              </a>
            </li>
          </ul>
        );
        subscriptions.push(subscription);
      }
      this.setState({ rows: subscriptions });
    });
  }
  handleEdit = (subscription) => {
    const selectedSub = {
      maxgrade: subscription.maxgrade,
      mingrade: subscription.mingrade,
      price: subscription.price,
      subscriptionname: subscription.subscriptionname,
      description: subscription.description,
      subjects: subscription.subjects,
    };
    this.setState(
      {
        subId: subscription.subscriptionId,
        selectedSub,
      },
      () => {
        const elem = document.getElementById("modaledit");
        const modal = M.Modal.init(elem);
        this.modal = modal;
        modal.open();
      }
    );
  };
  handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      subscriptionname: event.target.addsubscriptionname.value,
      description: event.target.adddescription.value,
      mingrade: event.target.addmingrade.value,
      maxgrade: event.target.addmaxgrade.value,
      price: event.target.addprice.value,
      subjects: event.target.addsubjects.value,
    };

    let elem = document.getElementById("modaladd");
    let modal = new M.Modal(elem);
    modal.close();

    AdminService.post_new_plan(data).then((response) => {
      if (response === undefined) {
        M.toast({
          html: response.message,
          classes: "red ",
        });
      } else {
        M.toast({
          html: response.message,
          classes: "green ",
        });
        document.getElementById("sibs").reset();
        this.getDashData();
      }
    });
  };
  handleSave = (event) => {
    event.preventDefault();
    var data = {
      subscriptionname: event.target.subscriptionname.value,
      description: event.target.description.value,
      mingrade: event.target.mingrade.value,
      maxgrade: event.target.maxgrade.value,
      price: event.target.price.value,
      subjects: event.target.subjects.value,
    };
    this.setState({
      selectedSub: {
        maxgrade: 0,
        mingrade: 0,
        price: 0,
        description: "",
        subscriptionname: "",
        subjects: "",
      },
    });

    let elem = document.getElementById("modaledit");
    let modal = new M.Modal(elem);
    modal.close();

    AdminService.update_plan(this.state.subId, data)
      .then((response) => {
        console.log(response);
        if (response.message === "An error occured") {
          M.toast({
            html: `An error occured, update failed!`,
            classes: "red accent-2",
          });
          this.getDashData();
        } else if (response.message === "Failed to update") {
          M.toast({
            html: `Failed to update, update failed!`,
            classes: "red accent-2",
          });
          this.getDashData();
        } else {
          M.toast({
            html: "Update Successfull",
            classes: "green accent-3",
          });
          this.getDashData();
        }
      })
      .catch((error) => {
        M.toast({
          html: `An error occured, update failed!`,
          classes: "red accent-2",
        });
        this.getDashData();
      });
  };

  handleDelete = (event) => {
    event.preventDefault();
    AdminService.delete_plan(this.state.subId)
      .then((response) => {
        if (response.message === "An error occured") {
          M.toast({
            html: `An error occured, update failed!`,
            classes: "red accent-2",
          });
          this.getDashData();
        } else {
          M.toast({
            html: `${response.message}, delete successfull`,
            classes: "green accent-3",
          });
          this.getDashData();
        }
        this.getDashData();
      })
      .catch((error) => {
        M.toast({
          html: `${error.message}, delete failed`,
          classes: "red accent-2",
        });
        this.getDashData();
      });
  };
  onChange = (e) => {
    e.preventDefault();
    const selectedSub = this.state.selectedSub;
    selectedSub[e.target.name] = e.target.value;
    this.setState({
      selectedSub,
    });
  };
  render() {
    return (
      <div>
        <header id="header" className="page-topbar">
          <Header />
        </header>
        <main id="main">
          <div className="wrapper">
            <LeftSidebar />

            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended width-75 image-bg-1"
                  style={{
                    position: "fixed",
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <div className="nav-content">
                    <div className="left">
                      <p
                        style={{
                          padding: "10px",
                          paddingTop: 25,
                          fontSize: "16px",
                        }}
                      >
                        Manage Subscriptions Plans
                      </p>
                    </div>
                    <a
                      href="#!"
                      data-target="modaladd"
                      className="modal-trigger tooltipped waves-effect right"
                      data-tooltip="Add New Plan"
                      data-position="bottom"
                      style={{
                        marginTop: "1%",
                        marginRight: "2%",
                        color: "#626262",
                      }}
                    >
                      <i className="material-icons">add_circle_outline</i>
                    </a>
                  </div>
                </nav>
              </div>
              <div>
                <section
                  className="row"
                  id="content"
                  style={{ paddingTop: 85 }}
                >
                  <div className="container  col s12">
                    <div className="card-stats z-depth-5 padding-5 border-radius-10">
                      <DatatablePage data={this.state} />
                    </div>
                  </div>
                  <div
                    id="modaladd"
                    className="modal modal-meeting border-radius-10"
                  >
                    <form
                      className="react-form form-meeting"
                      onSubmit={this.handleSubmit}
                      id="sibs"
                    >
                      <h1 className="h1-meeting">
                        <i
                          className="material-icons"
                          style={{ transform: "translate(-3px, 4px)" }}
                        >
                          add_circle_outline
                        </i>
                        Subscription Plan!
                      </h1>

                      <hr className="hr5" style={{ marginBottom: 30 }} />
                      <fieldset className="form-group">
                        <ReactFormLabel
                          htmlFor="addsubscriptionname"
                          title="Subscription Name:"
                        />
                        <input
                          id="addsubscriptionname"
                          className="form-input input-meeting"
                          name="addsubscriptionname"
                          type="text"
                          required
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <ReactFormLabel
                          htmlFor="adddescription"
                          title="Subscription Details:"
                        />
                        <input
                          id="adddescription"
                          className="form-input input-meeting"
                          name="adddescription"
                          type="text"
                          required
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <ReactFormLabel
                          htmlFor="add#ofsubjects"
                          title="# of subjects:"
                        />
                        <input
                          id="addsubjects"
                          className="form-input input-meeting"
                          name="addsubjects"
                          type="text"
                          required
                        />
                      </fieldset>
                      <fieldset className="form-group row">
                        <div className="col s6">
                          <ReactFormLabel
                            htmlFor="addmingrade"
                            title="Min Grade:"
                          />

                          <input
                            id="addmingrade"
                            className="form-input input-meeting"
                            type="number"
                            min="0"
                            max="12"
                            name="addmingrade"
                            required
                          />
                        </div>
                        <div className="col s6">
                          <ReactFormLabel
                            htmlFor="addmaxgrade"
                            title="Max Grade:"
                          />

                          <input
                            id="addmaxgrade"
                            className="form-input input-meeting"
                            type="number"
                            min="0"
                            max="12"
                            name="addmaxgrade"
                            required
                          />
                        </div>
                      </fieldset>
                      <fieldset className="form-group">
                        <ReactFormLabel htmlFor="addprice" title="Price:" />
                        <input
                          id="addprice"
                          className="form-input input-meeting"
                          type="number"
                          name="addprice"
                          required
                        />
                      </fieldset>

                      <div className="form-group">
                        <input
                          id="formButton"
                          className="btn gradient-45deg-light-blue-cyan border-radius-5"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </form>
                  </div>

                  <div
                    id="modaledit"
                    className="modal modal-meeting border-radius-10"
                  >
                    <form
                      className="react-form form-meeting"
                      onSubmit={this.handleSave}
                      id="sibs2"
                    >
                      <h1 className="h1-meeting">
                        <i
                          className="material-icons"
                          style={{ transform: "translate(-3px, 4px)" }}
                        >
                          create
                        </i>
                        Subscription Plan!
                      </h1>

                      <hr className="hr5" style={{ marginBottom: 30 }} />
                      <fieldset className="form-group">
                        <ReactFormLabel
                          htmlFor="subscriptionname"
                          title="Subscription Name:"
                        />
                        <input
                          id="subscriptionname"
                          className="form-input input-meeting"
                          name="subscriptionname"
                          onChange={this.onChange}
                          value={this.state.selectedSub.subscriptionname}
                          type="text"
                          required
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <ReactFormLabel
                          htmlFor="description"
                          title="Subscription Details:"
                        />
                        <input
                          id="description"
                          className="form-input input-meeting"
                          name="description"
                          onChange={this.onChange}
                          value={this.state.selectedSub.description}
                          type="text"
                          required
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <ReactFormLabel
                          htmlFor="subjects"
                          title="# of subjects:"
                        />
                        <input
                          id="subjects"
                          className="form-input input-meeting"
                          name="subjects"
                          onChange={this.onChange}
                          value={this.state.selectedSub.subjects}
                          type="text"
                          required
                        />
                      </fieldset>

                      <fieldset className="form-group row">
                        <div className="col s6">
                          <ReactFormLabel
                            htmlFor="mingrade"
                            title="Min Grade:"
                          />

                          <input
                            id="mingrade"
                            className="form-input input-meeting"
                            type="number"
                            min="0"
                            max="12"
                            name="mingrade"
                            onChange={this.onChange}
                            value={this.state.selectedSub.mingrade}
                            required
                          />
                        </div>
                        <div className="col s6">
                          <ReactFormLabel
                            htmlFor="maxgrade"
                            title="Max Grade:"
                          />

                          <input
                            id="maxgrade"
                            className="form-input input-meeting"
                            type="number"
                            min="0"
                            max="12"
                            name="maxgrade"
                            onChange={this.onChange}
                            value={this.state.selectedSub.maxgrade}
                            required
                          />
                        </div>
                      </fieldset>
                      <fieldset className="form-group">
                        <ReactFormLabel htmlFor="price" title="Price:" />
                        <input
                          id="price"
                          className="form-input input-meeting"
                          type="number"
                          name="price"
                          onChange={this.onChange}
                          value={this.state.selectedSub.price}
                          required
                        />
                      </fieldset>

                      <div className="form-group">
                        <input
                          id="formButton2"
                          className="btn gradient-45deg-light-blue-cyan border-radius-5"
                          type="submit"
                          value="Save"
                        />
                      </div>
                    </form>
                  </div>
                  <div id="areyousure" className="modal width-250">
                    <div className="modal-content">
                      <h4 className="header2">Are you sure?</h4>
                    </div>
                    <div className="modal-footer">
                      <Link
                        to="#!"
                        style={{ marginRight: 10 }}
                        className="modal-close btn gradient-45deg-green-teal waves-effect white-text"
                        onClick={this.handleDelete}
                      >
                        Yes
                      </Link>
                      <Link
                        to="#!"
                        className="modal-close btn gradient-45deg-red-pink waves-effect white-text"
                      >
                        No
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <RightSidebar />
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

class ReactFormLabel extends React.Component {
  render() {
    return (
      <label className="label-meeting" htmlFor={this.props.htmlFor}>
        {this.props.title}
      </label>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen);
