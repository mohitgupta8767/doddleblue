import React, { useEffect, useRef } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const AddEditRecord = (props) => {
    const { show, handleOk, handleCancel, selectedRecord } = props;
    const formRef = useRef(null);
    const [form] = Form.useForm();

    useEffect(() => {
        formRef.current.setFieldsValue({
            id: selectedRecord?.id,
            fullName: selectedRecord?.basicInfo?.name,
            email: selectedRecord?.basicInfo?.email,
            company: selectedRecord?.company,
            address: selectedRecord?.address,
            mobile: selectedRecord?.mobile,
        })
    }, [selectedRecord])

    return (
        <div>
            <Modal title="Contact" visible={show}
                onOk={() => {
                    formRef.current.submit();
                }}
                onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    ref={formRef}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 15 }}
                    initialValues={{
                        id: 0,
                        fullName: '',
                        email: '',
                        company: '',
                        address: '',
                        mobile: null
                    }}
                    onFinish={handleOk}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Id"
                        name="id"
                        hidden={true}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please enter your full name.' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{
                            type: 'email',
                            message: 'The input is not valid email!',
                        },
                        {
                            required: true,
                            message: 'Please enter your email!',
                        },]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mobile"
                        name="mobile"
                        rules={[{
                            message: 'Enter 10 digir numbers only.',
                            pattern: new RegExp(/^\d{10}$/)
                        },
                        {
                            required: true,
                            message: 'Please enter valid mobile.',
                        },]}
                    >
                        <Input maxLength={10} />
                    </Form.Item>
                    <Form.Item
                        label="Company"
                        name="company"
                        rules={[{ required: true, message: 'Please enter your comnapny.' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please enter your address.' }]}
                    >
                        <Input.TextArea
                            // value={value}
                            // onChange={(e) => setValue(e.target.value)}
                            // placeholder="Controlled autosize"
                            autoSize={{
                                minRows: 3,
                                maxRows: 5,
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddEditRecord