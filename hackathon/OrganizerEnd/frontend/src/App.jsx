import React from "react";
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Login } from "./pages/login";
import {Register} from "./pages/register";
import { Home } from "./pages/home";
import {OrganizerDashboard} from "./pages/organizerDashboard"
import {PostHack} from "./pages/postHack"
import { Participants } from "./pages/participants";


function App() {
    return (
        <Router>
            <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/register"} element={<Register/>}/>
              <Route path={"/organizerDashboard"} element={<OrganizerDashboard/>}/>
              <Route path={"/postHack"} element={<PostHack/>}/>
              <Route path={"/participants/:hackathonId"} element={<Participants/>}/>
            </Routes>
        </Router>
    );
}

export default App;