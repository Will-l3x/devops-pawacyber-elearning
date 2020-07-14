import React, { Component } from "react";
import { connect } from "react-redux";
import SideBar from "../../components/SideBar";
import DatatablePage from "../../components/DatatablePage";
import $ from "jquery";
import M from "materialize-css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { AdminService } from "../../services/admin";

export class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Package Name",
          field: "subscriptionname",
          sort: "asc",
          width: "24%",
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
          width: "15%",
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
        subscriptiondesc: "",
        subscriptionname: "",
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
    $(".custom-select.custom-select-sm").addClass("display-none");
    $(".col-sm-12.col-md-6").addClass("height-0");
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
                onClick={this.setState({ subId: subscription.id })}
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
      subscriptiondesc: subscription.subscriptiondesc,
      subscriptionname: subscription.subscriptionname,
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
      subscriptiondesc: event.target.addsubscriptiondesc.value,
      mingrade: event.target.addmingrade.value,
      maxgrade: event.target.addmaxgrade.value,
      price: event.target.addprice.value,
    };
    AdminService.post_new_plan(data).then((response) => {
      if (response === undefined) {
        alert(response.message);
      } else {
        alert(response.message);
        document.getElementById("sibs").reset();
        this.getDashData();
      }
    });
  };
  handleSave = (event) => {
    event.preventDefault();
    var data = {
      subscriptionname: event.target.subscriptionname.value,
      subscriptiondesc: event.target.subscriptiondesc.value,
      mingrade: event.target.mingrade.value,
      maxgrade: event.target.maxgrade.value,
      price: event.target.price.value,
    };
    console.log(data);
    AdminService.update_plan(this.state.subId, data)
      .then((response) => {
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
          document.getElementById("sibs").reset();
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

  handleDelete = () => {
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
          document.getElementById("sibs").reset();
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
            <SideBar />
            <div id="section">
              <div style={{ position: "relative", zIndex: 50 }}>
                <nav
                  className="navbar nav-extended"
                  style={{ position: "fixed" }}
                >
                  <div className="nav-content">
                    <p style={{ padding: "10px", fontSize: "16px" }}>
                      Manage Subscriptions Plans
                    </p>
                  </div>
                </nav>
              </div>
              <div>
                <section
                  className="row"
                  id="content"
                  style={{ paddingTop: 80 }}
                >
                  <div className="container  col s12 m7">
                    <div className="card-stats z-depth-5 padding-3">
                      <div className="row mt-1">
                        <div
                          className="col s12 m6 l12"
                          style={{ padding: "20px" }}
                        >
                          <DatatablePage data={this.state} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container col s12 m5">
                    <div className="card-stats z-depth-5 padding-3">
                      <div className="row mt-1">
                        <div className="col s12 m6 l12">
                          <h4 className="header2">Add Subscription Plan</h4>
                          <form onSubmit={this.handleSubmit} id="sibs">
                            <div className="row">
                              <div className="col s12">
                                <div className="row">
                                  <div className="input-field col s4">
                                    <input
                                      id="addsubscriptionname"
                                      type="text"
                                      name="addsubscriptionname"
                                    ></input>
                                    <label htmlFor="addsubscriptionname">
                                      Package Name
                                    </label>
                                  </div>
                                  <div className="input-field col s8">
                                    <input
                                      id="addsubscriptiondesc"
                                      type="text"
                                      name="addsubscriptiondesc"
                                    ></input>
                                    <label htmlFor="addsubscriptiondesc">
                                      Short Description
                                    </label>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="input-field col s4">
                                    <input
                                      id="addmingrade"
                                      type="number"
                                      name="addmingrade"
                                    ></input>
                                    <label htmlFor="addmingrade">
                                      Starting Grade
                                    </label>
                                  </div>
                                  <div className="input-field col s4">
                                    <input
                                      id="addmaxgrade"
                                      type="number"
                                      name="addmaxgrade"
                                    ></input>
                                    <label htmlFor="addmaxgrade">
                                      Ending Grade
                                    </label>
                                  </div>
                                  <div className="input-field col s4">
                                    <input
                                      id="addprice"
                                      type="number"
                                      name="addprice"
                                    ></input>
                                    <label htmlFor="addprice">Price</label>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="input-field col s6 offset-s6">
                                  <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
                                    Submit
                                    <i className="material-icons right">send</i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="modaledit" className="modal">
                    <div className="modal-content">
                      <h4 className="header2">Edit Subscription Plan</h4>
                      <form onSubmit={this.handleSave} id="sibs2">
                        <div className="row">
                          <div className="col s12">
                            <div className="row">
                              <div className="input-field col s4">
                                <input
                                  id="subscriptionname"
                                  type="text"
                                  name="subscriptionname"
                                  onChange={this.onChange}
                                  value={
                                    this.state.selectedSub.subscriptionname
                                  }
                                ></input>
                                <label htmlFor="subscriptionname">
                                  Package Name
                                </label>
                              </div>
                              <div className="input-field col s8">
                                <input
                                  id="subscriptiondesc"
                                  type="text"
                                  name="subscriptiondesc"
                                  onChange={this.onChange}
                                  value={
                                    this.state.selectedSub.subscriptiondesc
                                  }
                                ></input>
                                <label htmlFor="subscriptiondesc">
                                  Short Description
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s4">
                                <input
                                  id="mingrade"
                                  type="number"
                                  name="mingrade"
                                  onChange={this.onChange}
                                  value={this.state.selectedSub.mingrade}
                                ></input>
                                <label htmlFor="mingrade">Starting Grade</label>
                              </div>
                              <div className="input-field col s4">
                                <input
                                  id="maxgrade"
                                  type="number"
                                  name="maxgrade"
                                  onChange={this.onChange}
                                  value={this.state.selectedSub.maxgrade}
                                ></input>
                                <label htmlFor="maxgrade">Ending Grade</label>
                              </div>
                              <div className="input-field col s4">
                                <input
                                  id="price"
                                  type="number"
                                  name="price"
                                  onChange={this.onChange}
                                  value={this.state.selectedSub.price}
                                ></input>
                                <label htmlFor="price">Price</label>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="input-field col s6 offset-s6">
                              <button className="btn file-upload gradient-45deg-light-blue-cyan modal-close waves-effect waves-light right">
                                Save
                                <i className="material-icons right">save</i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div id="areyousure" className="modal width-250">
                    <div className="modal-content">
                      <h4 className="header2">Are you sure?</h4>
                    </div>
                    <div className="modal-footer">
                      <a
                        href="#!"
                        style={{ marginRight: 10 }}
                        className="modal-close btn gradient-45deg-green-teal waves-effect white-text"
                        onClick={this.handleDelete}
                      >
                        Yes
                      </a>
                      <a
                        href="#!"
                        className="modal-close btn gradient-45deg-red-pink waves-effect white-text"
                      >
                        No
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer className="footer page-footer gradient-45deg-light-blue-cyan">
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen);
