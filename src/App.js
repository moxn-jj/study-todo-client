import React from "react";
import './Font.css';
import Home from './page/Home'
import Todo from './page/Todo'
import Signin from './page/Signin';
import Signup from './page/Signup';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from "./components/js/common/Layout";
import { GlobalStateProvider } from './util/GlobalStateContext';

class App extends React.Component {

    render() {
        return (
            <GlobalStateProvider>
                <Router>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/todo" element={<Todo />} />
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/signup" element={<Signup />} />
                        </Route>
                    </Routes>
                </Router>
            </GlobalStateProvider>
        );
    }
}

export default App;
