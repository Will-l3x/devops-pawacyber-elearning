import React, { Component } from 'react'
import { connect } from 'react-redux'

export class TeacherScreen extends Component {
    render() {
        return (
            <div>
                TeacherScreen
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherScreen)
