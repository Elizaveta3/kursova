import React, { useState, useEffect } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import FormRowForEditing from '../components/FormInputEditingProfile/FormInputEditingProfile';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import iconForReturn from './static/images/icon for return.svg';
export const ProfileEdit = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        userName: '',
        age: '',
        weight: '',
        height: '',
        goal: ''
    });
    const handleGoToDiary = () => {
        navigate('/diary');
    };
    const handleGoToAuthPage = () => {
        navigate('/authEnter');
    };
    useEffect(() => {
        const fetchProfileData = async () => {
            const accountId = currentUser._id;
            try {
                const response = await fetch(`/auth/profile/${accountId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const profileDataResponse = await response.json();

                setFormData({
                    userName: currentUser.userName,
                    age: profileDataResponse.age || '',
                    weight: profileDataResponse.weight || '',
                    height: profileDataResponse.height || '',
                    goal: profileDataResponse.goal || ''
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [currentUser._id, currentUser.userName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Отправка данных на сервер
        console.log('Form data submitted:', formData);
        // Здесь можно использовать fetch или axios для отправки данных
    };
    return (
        <>
            <body className="page_profile_editing">
                <HeaderProfile
                    click1={handleGoToDiary}
                    click2={handleGoToAuthPage}
                    child1="Diary"
                    child2="Log out"
                ></HeaderProfile>
                <main className="main">
                    <section>
                        <div className="form_profile">
                            <div className="header_form_editing">
                                <a href="/profile" className="header_form_link">
                                    <img src={iconForReturn} alt="iconForReturn" />
                                </a>
                                <div className="title_wrappper_form_editing">

                                    <h1>Profile editing</h1>

                                </div>
                            </div>
                            <form className="form_container">
                                <FormRowForEditing label="Username" type="text" id="username" name="username" value={formData.userName}
                onChange={handleChange} />
                                {/* place for gender */}
                                <FormRowForEditing label="Age" type="number" id="age" name="age" value={formData.age}
                                    onChange={handleChange} />
                                <FormRowForEditing label="Weight" type="number" id="weight" name="weight" value={formData.weight}
                                    onChange={handleChange} />
                                <FormRowForEditing label="Height" type="number" id="height" name="height" value={formData.height}
                                    onChange={handleChange} />
                                {/* place for goal */}
                                <div className="form_row">
                                    <button type="submit">Submit</button>
                                </div>
                            </form>

                        </div>
                    </section>
                </main>
            </body>
        </>
    );
};