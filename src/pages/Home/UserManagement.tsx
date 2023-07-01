import React, {useState} from "react";
import {Button, message, Popconfirm, Space, Table, Tag} from "antd";
import {User} from "../../api/types";
import {axiosUsers} from "../../api/api";
import Spinner from "../../components/Spinner";
import useUser from "../../hooks/useUser";
import EditUserModal from "../../components/EditUserModal";
import AddUserModal from "../../components/AddUserModal";
import useGetUsers from "../../hooks/useGetUsers";

const UserManagement: React.FC = () => {
    const {user} = useUser();
    const {users, loading, getUsers} = useGetUsers();

    const [editUser, setEditUser] = useState<User | undefined>();
    const [openEditModal, setOpenEditModal] = useState(false);

    const [openAddModal, setOpenAddModal] = useState(false);

    const handleOpenEditModal = (user: User) => {
        setEditUser(user);
        setOpenEditModal(true);
    }

    const handleCloseEditModal = (withReload: boolean) => {
        setEditUser(undefined);
        setOpenEditModal(false);

        if (withReload) getUsers();
    }

    const handleCloseAddModal = (withReload: boolean) => {
        setOpenAddModal(false);

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
                    <a onClick={() => handleOpenEditModal(user)}>Edit</a>

                    <Popconfirm title="Confirm delete?" onConfirm={() => deleteUser(user.user_id)}>
                        <a>Delete</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const deleteUser = (userId: number) => {
        axiosUsers.delete(`/api/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        }).then((res) => {
            if (res.status === 200) {
                getUsers();
            }
        }).catch((err) => {
            const res = err?.response;

            if (res && res.status === 403) {
                message.error("Unauthorized.").then();
            }
        })
    };

    if (loading) {
        return <Spinner/>;
    }

    return (
        <div style={{padding: 20}}>
            <Button type="primary" style={{marginBottom: 20}} onClick={() => setOpenAddModal(true)}>Add new</Button>

            <Table columns={columns} dataSource={users} rowKey={(user: User) => user.user_id}/>

            {editUser && <EditUserModal open={openEditModal} handleClose={handleCloseEditModal} editUser={editUser}/>}

            {openAddModal && <AddUserModal open={openAddModal} handleClose={handleCloseAddModal}/>}
        </div>
    )
}

export default UserManagement