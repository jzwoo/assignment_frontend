import React, {useState} from "react";
import {Form, Input, Modal, Select, Switch} from "antd";
import {Roles} from "../constants/constants";
import useUser from "../hooks/useUser";
import {axiosUsers} from "../api/api";

interface AddUserModalProps {
    open: boolean;
    handleClose: (withReload: boolean) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = (props) => {
    const [form] = Form.useForm();
    const {user} = useUser();
    const {open, handleClose} = props;

    const [loading, setLoading] = useState(false);

    const handleSubmit = (formValues: {}) => {
        setLoading(true);
        axiosUsers.post("/api/v1/users", formValues, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`
            }
        }).then((res) => {
            if (res.status === 201) {
                setLoading(false);
                handleClose(true);
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
    }

    return (
        <Modal
            open={open}
            title={
                <b>
                    {`Adding a new user`}
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
                form={form}
                initialValues={{
                    role: Roles.VIEWER,
                    locked: false
                }}
                onFinish={handleSubmit}
                labelCol={{
                    span: 4,
                }}
                style={{marginTop: 20}}
                labelAlign="left"
                autoComplete="off"
                requiredMark={false}
            >
                <Form.Item
                    label={<b>Name</b>}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Username/name is required."
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label={<b>Password</b>}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Password is required."
                        }
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

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

export default AddUserModal;