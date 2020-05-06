import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
export class AboutScreen extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12 m6">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                            <span className="card-title">Card Title</span>
                            <p>I am a very simple card. I am good at containing small bits of information.
                            I am convenient because I require little markup to use effectively.</p>
                            </div>
                            <div className="card-action">
                                <Link to="/" className="waves-effect waves-light btn">button</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)
