import React from "react";
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Signin} from "./pages/signin"
import { Signup } from "./pages/signup";
import {Home} from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import {RegisteredEvent} from "./pages/registeredEvent"
import {LoginHome} from "./pages/loginHome"
function App() {
    return (
        <Router>
            <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/signup"} element={<Signup/>}/>
              <Route path={"/signin"}  element={<Signin/>}/>
              <Route path={"/dashboard"} element={<Dashboard/>}/>
              <Route path={"/registeredEvent"} element={<RegisteredEvent/>}/>
              <Route path={"/loginHome"} element={<LoginHome/>}/>
            </Routes>
        </Router>
    );
}

export default App;