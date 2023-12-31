import React, {useState} from "react";
import {Button, Card, Divider, Input, message, Space, Table, Tag} from "antd";
import {axiosUsers} from "../../api/api";
import {User} from "../../api/types";
import Spinner from "../../components/Spinner";
import useGetUsers from "../../hooks/useGetUsers";

const Dashboard: React.FC = () => {
    const {users, loading, getUsers, clearUsers} = useGetUsers();

    const [user, setUser] = useState<User | undefined>();
    const [loadingUser, setLoadingUser] = useState(false);

    const onSearch = (id: string) => {
        setLoadingUser(true);
        axiosUsers.get(`/api/v1/users/${id}`).then((res) => {
            if (res.status === 200) {
                setUser(res.data);
            }
        }).catch((err) => {
            const res = err?.response;

            if (res && res.status === 404) {
                message.error("User not found.").then();
                setUser(undefined);
                return;
            }

            message.error("Server Error.").then();
        }).finally(() => {
            setLoadingUser(false);
        })
    };

    const clearUser = () => {
        setUser(undefined);
    };

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Datetime created (UTC)',
            dataIndex: 'date_of_creation',
            key: 'date_of_creation',
        },
        {
            title: 'Locked',
            dataIndex: 'locked',
            key: 'locked',
            render: (data: boolean) => {
                if (data) {
                    return <Tag color="green">True</Tag>
                } else {
                    return <Tag color="blue">False</Tag>
                }
            }
        },
    ];

    if (loadingUser || loading) {
        return <Spinner/>;
    }

    return (
        <div style={{padding: "20px"}}>
            <Space style={{marginBottom: "20px"}}>
                <Button onClick={getUsers}>Get Users</Button>

                <Button onClick={clearUsers}>Clear Users</Button>
            </Space>

            <Table columns={columns} dataSource={users} rowKey={(user: User) => user.user_id}/>

            <Divider/>

            <Space style={{marginBottom: "20px"}}>
                <Input.Search
                    placeholder="Search by user ID"
                    allowClear
                    onSearch={onSearch}
                    enterButton="Search"
                    style={{
                        width: 300,
                    }}
                />

                <Button onClick={clearUser}>Clear User</Button>
            </Space>

            {user && <Card
                title={user.name}
                bordered={false}
                style={{
                    width: 300,
                }}
            >
                <p><b>User ID: </b>{user.user_id}</p>
                <p><b>Role: </b>{user.role}</p>
                <p><b>Locked: </b>{user.locked ? "TRUE" : "FALSE"}</p>
                <p><b>DOC: </b>{user.date_of_creation}</p>
            </Card>}
        </div>
    );
}

export default Dashboard;