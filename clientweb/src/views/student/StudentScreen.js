import React, { Component } from 'react'
import { connect } from 'react-redux'

export class StudentScreen extends Component {
    render() {
        return (
            <div>
                StudentScreen
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentScreen)
