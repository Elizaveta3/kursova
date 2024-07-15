import './static/styles/style.min.css'
import React, { useState, useEffect, useContext } from 'react';
import { updateUserNameSuccess } from '../redux/user/userSlice';

import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import FormRowForEditing from '../components/FormInputEditingProfile/FormInputEditingProfile';
import RadioBox from '../components/RadioBox/RadioBox';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LanguageContext } from '../LanguageContext';
import i18next from '../i18n'

import iconForReturn from './static/images/icon for return.svg';
export const ProfileEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentLanguage } = useContext(LanguageContext);
    const [isInitialized, setIsInitialized] = useState(false);


    useEffect(() => {
        i18next.on('initialized', () => {
          setIsInitialized(true);
        });
        if (i18next.isInitialized) {
          setIsInitialized(true);
        }
      }, []);
    const { currentUser } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        userName: '',
        age: '',
        weight: '',
        height: '',
        gender: '',
        goal: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Отримання токену з localStorage
            if (!token) {
                throw new Error('The token could not be found');
            }

            // Перевірка на наявність обов'язкових полів
            const requiredFields = ['userName', 'gender', 'age', 'height', 'weight', 'goal'];
            const missingFields = requiredFields.filter(field => !formData[field]);
            if (missingFields.length > 0) {
                throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            }

            setErrorMessage(null);
            const accountId = currentUser._id;

            const res = await fetch(`/auth/updateProfile/${accountId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }

            console.log('Отримані дані:', data);
            dispatch(updateUserNameSuccess(formData.userName));

            navigate('/profile');
        } catch (error) {
            console.error('Error sending request:', error.message);
            setErrorMessage(error.message);
        }

        try {
            const accountId = currentUser._id;
            const afterRes = await fetch(`/auth/profile/calo/${accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const secondData = await afterRes.json();
            if (!afterRes.ok) {
                throw new Error(secondData.message);
            }
            console.log('Отримані дані:', secondData);
            navigate('/profile');
        } catch (error) {
            console.error('Помилка відправки запиту:', error.message);
            setErrorMessage(error.message);
        }
    };

    if (!isInitialized) {
        return <div>Завантаження...</div>;
      }

    return (
        <>
            <body className="page_profile_editing">
                <HeaderProfile
                    click1={handleGoToDiary}
                    click2={handleGoToAuthPage}
                    child1={i18next.t('edit_profile.diary_button')}
                    child2={i18next.t('edit_profile.logout_button')}
                ></HeaderProfile>
                <main className="main_profile">
                    <div className="form_profile">
                        <div className="header_form_editing">
                            <a href="/profile" className="header_form_link">
                                <img src={iconForReturn} alt="iconForReturn" />
                            </a>
                            <div className="title_wrappper_form_editing">
                                <h1>{i18next.t('edit_profile.title')}</h1>
                            </div>
                        </div>
                        <form className="form_container" onSubmit={handleSubmit}>
                            <FormRowForEditing label={i18next.t('edit_profile.username')} type="text" id="userName" name="userName" value={formData.userName}
                                onChange={handleChange} />
                            <p className="form_sex_editing">
                                <label htmlFor="gender" className="label_sex_editing" >{i18next.t('edit_profile.gender')}</label>
                                <RadioBox
                                    label={i18next.t('edit_profile.female')}
                                    name="gender"
                                    value="female"
                                    onChange={handleChange}
                                    checked={formData.gender === 'female'} // Додано атрибут checked
                                />
                                <RadioBox
                                    label={i18next.t('edit_profile.male')}
                                    name="gender"
                                    value="male"
                                    onChange={handleChange}
                                    checked={formData.gender === 'male'} // Додано атрибут checked
                                />
                            </p>
                            <FormRowForEditing label={i18next.t('edit_profile.age')} type="number" id="age" name="age" value={formData.age}
                                onChange={handleChange} />
                            <FormRowForEditing label={i18next.t('edit_profile.weight')} type="number" id="weight" name="weight" value={formData.weight}
                                onChange={handleChange} />
                            <FormRowForEditing label={i18next.t('edit_profile.height')} type="number" id="height" name="height" value={formData.height}
                                onChange={handleChange} />
                            <p className="form_goal_editing">
                                <label htmlFor="gender" className="label_goal_editing" >{i18next.t('edit_profile.goal')}</label>
                                <RadioBox
                                    label={i18next.t('edit_profile.lose')}
                                    name="goal"
                                    value="lose_weight"
                                    onChange={handleChange}
                                    checked={formData.goal === 'lose_weight'} // Додано атрибут checked
                                />
                                <RadioBox
                                    label={i18next.t('edit_profile.maintain')}
                                    name="goal"
                                    value="maintain_weight"
                                    onChange={handleChange}
                                    checked={formData.goal === 'maintain_weight'} // Додано атрибут checked
                                />
                                <RadioBox
                                    label={i18next.t('edit_profile.gain')}
                                    name="goal"
                                    value="gain_weight"
                                    onChange={handleChange}
                                    checked={formData.goal === 'gain_weight'} // Додано атрибут checked
                                />
                            </p>
                            <div className="container_button_editing">
                                <Button buttonClass="button_editing" type="submit" onSubmit={handleSubmit}>
                                    {i18next.t('edit_profile.submit_button')}
                                </Button>
                            </div>
                        </form>

                    </div>
                </main>
            </body>
        </>
    );
};