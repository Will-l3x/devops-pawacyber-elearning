import React, { Component } from 'react'
import ReactPlayer from "react-player";

export default class VideoPriview extends Component {
    link = this.props.videoLink;
    render(){
        return (
            <ReactPlayer url={this.link} controls={true} />
        );
}};