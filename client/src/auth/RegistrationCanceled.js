import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";
import OuterHeader from "../components/outerHeader";
import OuterFooter from "../components/outerFooter";
import img from "../assets/images/details-1-office-worker.svg";

import { HashLink as Link } from "react-router-hash-link";

class RegistrationCancelled extends Component {

    componentDidMount() {
        M.AutoInit();
        M.toast({
            html: "Payment Canceled",
            classes: "red accent-3",
        });
        this.deleteLocalStorageData();
    }

    deleteLocalStorageData() {
        localStorage.clear();
    }

    render() {
        return (
          <div>
            <OuterHeader></OuterHeader>
            <div className="content-pawa">
              <div className="form-2" style={{ marginBottom: "-50px" }}>
                <div className="container" style={{ marginTop: "-100px" }}>
                  <div className="row mt-1">
                    <div className="col s12 m5">
                      <div
                        className="image-container"
                        style={{
                          paddingLeft: "10%",
                          paddingRight: "10%",
                          paddingTop: "20%",
                          width: "100%",
                        }}
                      >
                        <img
                          className="img-fluid"
                          src={img}
                          alt="alternative"
                        />
                      </div>
                    </div>

                    <div className="col s12 m5">
                      <div className="row mt-1">
                        <div className="form-group">
                          <p
                            style={{
                              marginTop: "100px",
                              color: "red",
                              textAlign: "center",
                              fontSize: "20px",
                            }}
                          >
                            Payment Canceled. Retry Registration
                          </p>

                          <Link
                            className="btn-solid-lg"
                            rel="noopener noreferrer"
                            to="/register"
                            style={{
                              marginLeft: "35%",
                              marginTop: "100px",
                              marginRight: "35%",
                            }}
                          >
                            Register Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <OuterFooter></OuterFooter>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationCancelled)
