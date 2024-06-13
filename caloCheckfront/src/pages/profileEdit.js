import React, { useState, useEffect } from 'react';

import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import FormRowForEditing from '../components/FormInputEditingProfile/FormInputEditingProfile';
import RadioBox from '../components/RadioBox/RadioBox';
import Button from '../components/Button/Button';
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
        gender: '',
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
                    gender: profileDataResponse.gender || '',
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
                                <p className="form_sex_editing">
                                    <label htmlFor="gender" className="label_sex_editing" >Gender:</label>
                                    <RadioBox
                                        label="Female"
                                        name="gender"
                                        value="female"
                                        onChange={handleChange}
                                        checked={formData.gender === 'female'} // Додано атрибут checked
                                    />
                                    <RadioBox
                                        label="Male"
                                        name="gender"
                                        value="male"
                                        onChange={handleChange}
                                        checked={formData.gender === 'male'} // Додано атрибут checked
                                    />
                                </p>
                                <FormRowForEditing label="Age" type="number" id="age" name="age" value={formData.age}
                                    onChange={handleChange} />
                                <FormRowForEditing label="Weight" type="number" id="weight" name="weight" value={formData.weight}
                                    onChange={handleChange} />
                                <FormRowForEditing label="Height" type="number" id="height" name="height" value={formData.height}
                                    onChange={handleChange} />
                                <p className="form_goal_editing">
                                    <label htmlFor="gender" className="label_goal_editing" >Goal:</label>
                                    <RadioBox
                                        label="Lose"
                                        name="goal"
                                        value="lose_weight"
                                        onChange={handleChange}
                                        checked={formData.goal === 'lose_weight'} // Додано атрибут checked
                                    />
                                    <RadioBox
                                        label="Maintain"
                                        name="goal"
                                        value="maintain_weight"
                                        onChange={handleChange}
                                        checked={formData.goal === 'maintain_weight'} // Додано атрибут checked
                                    />
                                    <RadioBox
                                        label="Gain"
                                        name="goal"
                                        value="gain_weight"
                                        onChange={handleChange}
                                        checked={formData.goal === 'gain_weight'} // Додано атрибут checked
                                    />
                                </p>
                                <div className="container_button_editing">
                                    <Button buttonClass="button_editing" type="submit" onSubmit={handleSubmit}>
                                        Submit
                                    </Button>
                                </div>
                            </form>

                        </div>
                    </section>
                </main>
            </body>
        </>
    );
};