import React, { Component } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Posts from '../../components/Posts';
import PostForm from '../../components/Postform';

export class HomeScreen extends Component {
    render() {
        return (
            <div>
                <header>
                    <Header/>
                </header>
                <main className="container">
                    <PostForm />
                    <hr />
                    <Posts />
                </main>
                <footer>
                    <Footer />
                </footer>   
            </div>
        )
    }
}


export default HomeScreen
