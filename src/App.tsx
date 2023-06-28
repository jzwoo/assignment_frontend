import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Missing from "./pages/Missing";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/">
                {/* public */}
                <Route path="/" element={<Navigate to="/login" replace={true}/>}/>
                <Route path="login" element={<Login/>}/>

                {/* protected */}
                <Route path="home" element={<Home/>}/>

                {/* catch all */}
                <Route path="*" element={<Missing/>}/>
            </Route>
        </Routes>
    );
}

export default App;
