import React from "react";
import './App.css';
import './Font.css';
import Todo from './page/Todo'
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from "./components/js/common/Layout";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/todo" element={<Todo />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Route>
                </Routes>
            </Router>
        );
    }
}

export default App;
