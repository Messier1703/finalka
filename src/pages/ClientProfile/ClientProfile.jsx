import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api/BASE_URL';
import AppHeader from '../../components/header/AppHeader';
import { Card, Button, message, Modal } from 'antd';
import s from './ClientProfile.module.scss';

const { Meta } = Card;

const Profile = () => {
    
    const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
    };
    
    const [userApplications, setUserApplications] = useState([])

    const getUserInfo = () => {
        return axios.get(`${API_BASE_URL}/Application`, { headers })
    }

    useEffect(() => {
        getUserInfo().then((res) => setUserApplications(res.data.applications))
    }, [])

    return (
        <div>
            <AppHeader />
            {userApplications.map((item, index) => (
                <Card key={index} hoverable>
                    <p>{item.description}</p>
                    <p>{item.adress}</p>
                </Card>
            ))}
        </div>
    );

};

export default Profile;