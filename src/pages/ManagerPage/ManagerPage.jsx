import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, message, Modal } from 'antd';

const { Meta } = Card;

const ManagerPage = () => {
    const [applications, setApplications] = useState([]);
    const [brigades, setBrigades] = useState([]);
    const [selectedApplicationId, setSelectedApplicationId] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`https://ecoboxwebapi20230517185257.azurewebsites.net/api/Application`, { headers });
                if (Array.isArray(response.data.applications)) {
                    setApplications(response.data.applications);
                } else {
                    console.error('Invalid response format. Expected "applications" to be an array.');
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        const fetchBrigades = async () => {
            try {
                const response = await axios.get(`https://ecoboxwebapi20230517185257.azurewebsites.net/api/Manager/allBrigades`, { headers });
                if (Array.isArray(response.data.brigades)) {
                    setBrigades(response.data.brigades);
                } else {
                    console.error('Invalid response format. Expected "brigades" to be an array.');
                }
            } catch (error) {
                console.error('Error fetching brigades:', error);
            }
        };

        fetchApplications();
        fetchBrigades();
    }, []);

    const handleAssignToBrigade = (applicationId, brigadeId) => {
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        };
        axios.post(
            `https://ecoboxwebapi20230517185257.azurewebsites.net/api/Manager/assingToBrigade?applicationId=${applicationId}`,
            { brigadeId },
            { headers }
        )
            .then(() => {
                message.success('Assigned to brigade successfully!');
                // You can perform any additional action here, such as updating the UI
                setIsModalVisible(false);
            })
            .catch((error) => {
                console.error('Error assigning to brigade:', error);
                message.error('Failed to assign to brigade. Please try again.');
            });
    };

    const showModal = (applicationId) => {
        setSelectedApplicationId(applicationId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            {applications.map((application) => (
                <Card key={application.id} title={application.description}>
                    <Meta title={`Address: ${application.adress}`} />
                    <Button type="primary" onClick={() => showModal(application.id)}>
                        Assign to Brigade
                    </Button>
                </Card>
            ))}

            <Modal
                title="Select Brigade"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {brigades.map((brigade) => (
                    <Card
                        key={brigade.id}
                        style={{ marginBottom: '12px' }}
                        onClick={() => handleAssignToBrigade(selectedApplicationId, brigade.id)}
                    >
                        <Meta title={brigade.userName} />
                    </Card>
                ))}
            </Modal>
        </div>
    );
};

export default ManagerPage;
