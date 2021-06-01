import React, {Component} from 'react';
import Header from '../../components/header';
import LeftSidebar from '../../components/LeftSidebar';


class Multichoice extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header id="header" className="page-topbar">
                    <Header />
                </header>
                <main id="main">
                    <div className="wrapper">
                        <LeftSidebar />

                        <section id = "content">

                        </section>
                    </div>
                </main>

            </div>
        )
    }
}

export default Multichoice