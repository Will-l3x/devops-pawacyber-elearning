import React, { Component } from 'react'
import { Player } from 'video-react';

export default class VideoPriview extends Component {
    link = this.props.videoLink;
    render(){
        return (
            <Player
            playsInline
            autoPlay
            poster="/assets/poster.png"
            src={this.link}
            />
        );
}};