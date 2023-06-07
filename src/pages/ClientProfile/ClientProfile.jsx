import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api/BASE_URL';
import AppHeader from '../../components/header/AppHeader';
import { Card, Button, message, Modal, Form, Input } from 'antd';
import s from './ClientProfile.module.scss';

const { Meta } = Card;

const Profile = () => {
    
    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };
    
    const [userApplications, setUserApplications] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [selectedItemId, setSelectedItemId] = useState(null);

    const getUserInfo = () => {
        return axios.get(`${API_BASE_URL}/Client/applications`, { headers });
    };

    const handleUpdate = (id) => {
        setModalVisible(true);
        setSelectedItemId(id);
        form.resetFields();
        form.setFieldsValue(userApplications.find(application => application.id === id));
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this application?',
            onOk: () => {
                console.log(headers)
                axios.delete(`https://ecoboxwebapi20230517185257.azurewebsites.net/api/Application?id=${id}`, { headers })
                    .then((res) => {
                        message.success('Application deleted successfully!');
                        setUserApplications(userApplications.filter(application => application.id !== id));
                    })
                    .catch((error) => {
                        console.error('Error deleting application:', error);
                        message.error('Failed to delete application. Please try again.');
                    });
            }
        });
    };

    const handleModalCancel = () => {
        setModalVisible(false);
    };

    const handleModalOk = () => {
        form.validateFields()
            .then((values) => {
                const { adress, description } = values;
                const number = 0
                const id = selectedItemId;
                console.log({
                    id, 
                    description,
                    adress,
                    number
                })
                axios.put('https://ecoboxwebapi20230517185257.azurewebsites.net/api/Application', { id, adress, description , number}, { headers })
                    .then(() => {
                        message.success('Item updated successfully!');
                        setModalVisible(false);
                        setUserApplications(userApplications.map(application => {
                            if (application.id === id) {
                                return {
                                    ...application,
                                    adress,
                                    description
                                };
                            }
                            return application;
                        }));
                    })
                    .catch((error) => {
                        console.error('Error updating item:', error);
                        message.error('Failed to update item. Please try again.');
                    });
            })
            .catch((error) => {
                console.error('Validation error:', error);
            });
    };

    useEffect(() => {
        getUserInfo().then((res) => setUserApplications(res.data.applications));
    }, []);

    return (
        <div>
            <AppHeader />
            {userApplications.map((item, index) => (
                <Card key={index} hoverable>
                    <p>{item.description}</p>
                    <p>{item.adress}</p>
                    <Button type="primary" onClick={() => handleUpdate(item.id)}>
                        Update
                    </Button>
                    <Button type="primary" danger onClick={() => handleDelete(item.id)}>
                        Delete
                    </Button>
                </Card>
            ))}
            <Modal
                title="Update Item"
                open={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form}>
                    <Form.Item name="adress" label="adress">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Profile;
