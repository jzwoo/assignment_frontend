import React from "react";
import {Spin} from "antd";

const Spinner: React.FC = () => {
    return (
        <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Spin/>
        </div>
    )
}

export default Spinner;