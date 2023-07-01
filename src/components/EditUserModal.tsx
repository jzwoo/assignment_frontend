import React, {useState} from "react";
import {Form, message, Modal, Select, Switch} from "antd";
import {User} from "../api/types";
import {Roles} from "../constants/constants";
import useUser from "../hooks/useUser";
import {axiosUsers} from "../api/api";

interface EditUserModalProps {
    open: boolean;
    handleClose: (withReload: boolean) => void;
    editUser: User
}

const EditUserModal: React.FC<EditUserModalProps> = (props) => {
    const [form] = Form.useForm();
    const {user} = useUser();
    const {open, handleClose, editUser} = props;

    const [loading, setLoading] = useState(false);

    const handleSubmit = (formValues: {}) => {
        axiosUsers.put(`/api/v1/users/${editUser.user_id}`, formValues, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setLoading(false);
                handleClose(true);
            }
        }).catch((err) => {
            const res = err?.response;

            if (res && res.status === 403) {
                message.error("Unauthorized.").then();
            }
        }).finally(() => {
            setLoading(false);
        })
    }

    const initialValues = {
        role: editUser.role,
        locked: editUser.locked
    }

    return (
        <Modal
            open={open}
            title={
                <b>
                    {`Editing ${editUser.name}`}
                </b>
            }
            onOk={form.submit}
            okText="Submit"
            onCancel={() => handleClose(false)}
            maskClosable={false}
            closable={false}
            okButtonProps={{loading}}
        >
            <Form
                initialValues={initialValues}
                form={form}
                onFinish={handleSubmit}
                labelCol={{
                    span: 3,
                }}
                style={{marginTop: 20}}
                labelAlign="left"
                autoComplete="off"
            >
                <Form.Item
                    label={<b>Role</b>}
                    name="role"
                >
                    <Select>
                        <Select.Option value={Roles.VIEWER}>
                            {Roles.VIEWER}
                        </Select.Option>

                        <Select.Option value={Roles.OPERATOR}>
                            {Roles.OPERATOR}
                        </Select.Option>

                        <Select.Option value={Roles.ADMIN}>
                            {Roles.ADMIN}
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<b>Locked</b>}
                    name="locked"
                    valuePropName="checked"
                >
                    <Switch/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditUserModal;