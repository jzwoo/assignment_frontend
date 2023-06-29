import React, {useEffect, useState} from "react";
import {Button, Popconfirm, Space, Table, Tag} from "antd";
import {User} from "../../api/types";
import {axiosUsers} from "../../api/api";
import Spinner from "../../components/Spinner";

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosUsers.get<User[]>("/api/v1/users").then((res) => {
            if (res.status === 200) {
                setUsers(res.data);
            }
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

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
        {
            title: 'Action',
            key: 'action',
            render: (user: User) => (
                <Space size="middle">
                    <a>Edit</a>

                    <Popconfirm title="Confirm delete?" onConfirm={() => console.log(user.user_id)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    if (loading) {
        return <Spinner/>;
    }

    return (
        <div style={{padding: 20}}>
            <Button type="primary" style={{marginBottom: 20}}>Add new</Button>

            <Table columns={columns} dataSource={users} rowKey={(user: User) => user.user_id}/>
        </div>
    )
}

export default UserManagement