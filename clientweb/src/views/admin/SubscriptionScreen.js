import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";

export class SubscriptionScreen extends Component {
    render() {
        return (
          <div className="wrapper">
            <aside id="left-sidebar-nav">
              <SideBar></SideBar>
              <Link
                to=""
                data-target="slide-out"
                className="sidebar-collapse waves-effect dropdown-trigger waves-block waves-light hide-on-large-only"
              >
                <i className="material-icons">format_indent_increase</i>
              </Link>
            </aside>

            <section id="content">
              <div className="container"></div>
            </section>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionScreen)
