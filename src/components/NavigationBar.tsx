import React from "react";
import {Layout, Menu} from "antd";
import {
    UserOutlined,
    IdcardOutlined,
    SettingOutlined,
    FundViewOutlined, LogoutOutlined
} from "@ant-design/icons";
import {Content} from "../constants/constants";
import {useNavigate} from "react-router-dom";
import useUser from "../hooks/useUser";

interface NavigationBarProps {
    setSelected: (num: string) => void
}

const NavigationBar: React.FC<NavigationBarProps> = (props) => {
    const {setSelected} = props
    const {setUser} = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser({name: "", accessToken: ""});
        navigate("/login");
    }

    return (
        <Layout.Sider>
            <Menu
                style={{height: "100%"}}
                theme="dark"
                defaultSelectedKeys={[Content.DASHBOARD]}
                onSelect={(e) => setSelected(e.key)}
                items={[
                    {
                        key: Content.DASHBOARD,
                        icon: <FundViewOutlined/>,
                        label: Content.DASHBOARD,
                    },
                    {
                        key: Content.USER_MANAGEMENT,
                        icon: <IdcardOutlined/>,
                        label: Content.USER_MANAGEMENT,
                    },
                    {
                        key: Content.PROFILE,
                        icon: <UserOutlined/>,
                        label: Content.PROFILE,
                    },
                    {
                        key: Content.SETTINGS,
                        icon: <SettingOutlined/>,
                        label: Content.SETTINGS,
                    },
                    {
                        key: Content.LOGOUT,
                        icon: <LogoutOutlined/>,
                        label: Content.LOGOUT,
                        onClick: handleLogout
                    },
                ]}
            />
        </Layout.Sider>
    )
}

export default NavigationBar;
