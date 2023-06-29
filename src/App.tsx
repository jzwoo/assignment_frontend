import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Missing from "./pages/Missing";
import RequireAuth from "./components/RequireAuth";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/">
                {/* public */}
                <Route path="/" element={<Navigate to="/login" replace={true}/>}/>
                <Route path="login" element={<Login/>}/>

                {/* protected */}
                <Route element={<RequireAuth/>}>
                    <Route path="home" element={<Home/>}/>
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing/>}/>
            </Route>
        </Routes>
    );
}

export default App;
