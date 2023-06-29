import React, {useState} from 'react'
import {Button, Form, Input, Spin} from "antd";
import "./Login.css"
import {axiosUsers} from "../../api/api";
import useUser from "../../hooks/useUser";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const {setUser} = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (formValues: {}) => {
        setLoading(true);
        axiosUsers.post("/login", formValues).then((res) => {
            if (res.status === 200) {
                setUser(res.data);
                navigate("/home")
            }
        }).catch((err) => {
            console.error(err)
        }).finally(() => {
            setLoading(false);
        })
    }

    if (loading) {
        return <Spin/>
    }

    return (
        <div className="login">
            <Form
                className="form"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Username is required."
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
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
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        LOGIN
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
