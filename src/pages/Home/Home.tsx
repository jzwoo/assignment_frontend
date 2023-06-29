import React, {useState} from 'react'
import useUser from "../../hooks/useUser";
import {Layout} from "antd";
import NavigationBar from "../../components/NavigationBar";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement";
import Settings from "./Settings";
import Missing from "../Missing";
import {Content} from "../../constants/constants";

const Home: React.FC = () => {
    const {user} = useUser();
    const [selected, setSelected] = useState(Content.DASHBOARD);

    const showContent = (selected: string) => {
        switch (selected) {
            case Content.DASHBOARD:
                return <Dashboard/>;
            case Content.USER_MANAGEMENT:
                return <UserManagement/>;
            case Content.PROFILE:
                return <Profile/>;
            case Content.SETTINGS:
                return <Settings/>;
            default:
                return <Missing/>;
        }
    }

    return (
        <Layout style={{height: "100vh"}}>
            <Layout.Header>
                Welcome {user.name}
            </Layout.Header>

            <Layout>
                <NavigationBar setSelected={setSelected}/>

                <Layout.Content>
                    {showContent(selected)}
                </Layout.Content>
            </Layout>
        </Layout>
    )
}

export default Home
