import React, { Component } from 'react'

export default class SubjectDescrip extends Component {
    render() {
        var data = this.props.content;
        return (
            <div className="collection-item">
                {data.topicContent}
            </div>)
    }
}
