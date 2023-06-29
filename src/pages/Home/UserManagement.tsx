import React, {useEffect, useState} from "react";
import {Button, Popconfirm, Space, Table, Tag} from "antd";
import {User} from "../../api/types";
import {axiosUsers} from "../../api/api";
import Spinner from "../../components/Spinner";
import useUser from "../../hooks/useUser";
import EditUserModal from "../../components/EditUserModal";

const UserManagement: React.FC = () => {
    const {user} = useUser();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [editUser, setEditUser] = useState<User | undefined>();
    const [openEditModal, setOpenEditModal] = useState(false);

    const getUsers = () => {
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
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleOpenEditModal = (user: User) => {
        setEditUser(user);
        setOpenEditModal(true);
    }

    const handleCloseEditModal = (withReload: boolean) => {
        setEditUser(undefined);
        setOpenEditModal(false);

        if (withReload) getUsers();
    }

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
                    <a onClick={() => handleOpenEditModal(user)} >Edit</a>

                    <Popconfirm title="Confirm delete?" onConfirm={() => deleteUser(user.user_id)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const deleteUser = (userId: number) => {
        setLoading(true);
        axiosUsers.delete(`/api/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setUsers(users.filter(user => user.user_id != userId));
            }
        }).catch((err) => {
            const res = err?.res;

            if (res && res.status === 403) {
                // TODO: do indication for user
                console.log("Unauthorized");
            }
        }).finally(() => {
            setLoading(false);
        })
    };

    if (loading) {
        return <Spinner/>;
    }

    return (
        <div style={{padding: 20}}>
            <Button type="primary" style={{marginBottom: 20}}>Add new</Button>

            <Table columns={columns} dataSource={users} rowKey={(user: User) => user.user_id}/>

            {editUser && <EditUserModal open={openEditModal} handleClose={handleCloseEditModal} editUser={editUser}/>}
        </div>
    )
}

export default UserManagement