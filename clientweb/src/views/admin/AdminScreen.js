import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AdminScreen extends Component {
    render() {
        return (
            <div>
                AdminScreen
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen)
