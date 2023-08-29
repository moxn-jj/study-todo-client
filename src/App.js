import React from "react";
import './App.css';
import './Font.css';
import Todo from './page/Todo'
import SignIn from './page/Signin';
import SignUp from './page/Signup';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from "./components/js/common/Layout";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Signin />} />
                        <Route path="/todo" element={<Todo />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                </Routes>
            </Router>
        );
    }
}

export default App;
