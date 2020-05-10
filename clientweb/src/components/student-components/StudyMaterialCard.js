import React, { Component } from 'react'
import avatar from "../../assets/images/icon/book_lover.png";

export default class StudyMaterialCard extends Component {
    render() {
        return (
            <div className="row card" style={{backgroundImage:'url("../../assets/images/icon/book_lover.png")'}}>
              <div className="col s2" style = {{ display: 'flex',justifyContent: 'center',alignItems: 'center',overflow: 'hidden'}}>
                        <img src={avatar} alt="Avatar"  style={{flexShrink:'0',maxWidth: '100%',maxHeight: '80px'}}></img>
                </div>
                <div className="col s6 card-title">
                        <div style={{fontSize:'16px',marginTop:'10px', marginBottom:'10px'}}>
                          Anytime is study time! View your learning resources library!
                        </div>
                     
                </div>
                <div className="col s4" style={{paddingTop:'1.4%', paddingBottom:'1.3%'}}>
                    <div className="right-align">
                      <div className="card btn" style={{maxWidth:'150px'}}>Study Center</div>
                    </div>
                  </div>
              </div>
          
        )
    }
}
