import React, { useState, useContext, useEffect } from 'react';
import Button from '../components/Button/Button';
import RadioBox from '../components/RadioBox/RadioBox';
import FormInput from '../components/FormInputFillProf/FormInputFillProf';
import './static/styles/styles.css';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../LanguageContext';
import i18next from '../i18n'

export const FillPage = () => {
    const navigate = useNavigate();
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

    // Встановіть початкове значення для formData
    const [formData, setFormData] = useState({ gender: 'female',  goal: 'lose_weight' });
    const [errorMessage, setErrorMessage] = useState(null);
    const { currentUser } = useSelector(state => state.user);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === 'number') {
            setFormData({ ...formData, [name]: parseInt(value, 10) });
        } else if (type === 'text') {
            setFormData({ ...formData, [name]: value.trim() });
        } else if (type === 'radio') {
            setFormData({ ...formData, [name]: value });
        } else {
            console.log('Enter a valid value for the field', name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Отримання токену з localStorage
            if (!token) {
                throw new Error('The token could not be found');
            }

            // Перевірка на наявність обов'язкових полів
            const requiredFields = ['gender', 'age', 'height', 'weight', 'goal'];
            const missingFields = requiredFields.filter(field => !formData[field]);
            if (missingFields.length > 0) {
                throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
            }

            setErrorMessage(null);
            const res = await fetch('/auth/fillProfile', {
                method: 'POST',
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
            console.log('Отримані дані:', data);
            console.log('Отримані дані:', secondData);
            navigate('/profile');
        } catch (error) {
            console.error('Error sending request:', error.message);
            setErrorMessage(error.message);
        }
    };

    if (!isInitialized) {
        return <div>Завантаження...</div>;
      }

    return (
        <div className="page_fill_profile">
            <main className="main">
                <section>
                    <form className="form_fill_profile" onSubmit={handleSubmit}>
                        <h1>{i18next.t('fill_profile.title')}</h1>
                        <fieldset className="form_reg_wrap">
                            <p className="text_input_sex">{i18next.t('fill_profile.gender')}</p>
                            <p className="form_sex">
                                <RadioBox
                                    label={i18next.t('fill_profile.female')}
                                    name="gender"
                                    value="female"
                                    onChange={handleChange}
                                    checked={formData.gender === 'female'} // Додано атрибут checked
                                />
                                <RadioBox
                                    label={i18next.t('fill_profile.male')}
                                    name="gender"
                                    value="male"
                                    onChange={handleChange}
                                    checked={formData.gender === 'male'} // Додано атрибут checked
                                />
                            </p>
                            <p className="form_input_fill_prof">
                                <FormInput
                                    placeholder={i18next.t('fill_profile.age')}
                                    name="age"
                                    onChange={handleChange}
                                    id="age"
                                />
                                <FormInput
                                    placeholder={i18next.t('fill_profile.height')}
                                    name="height"
                                    onChange={handleChange}
                                    id="height"
                                />
                                <FormInput
                                    placeholder={i18next.t('fill_profile.weight')}
                                    name="weight"
                                    onChange={handleChange}
                                    id="weight"
                                />
                            </p>
                            <p className="text_input_goal">{i18next.t('fill_profile.goal')}</p>
                            <p className="form_goal">
                                <RadioBox
                                    label={i18next.t('fill_profile.lose')}
                                    name="goal"
                                    value="lose_weight"
                                    onChange={handleChange}
                                    checked={formData.goal === 'lose_weight'} 
                                />
                                <RadioBox
                                    label={i18next.t('fill_profile.maintain')}
                                    name="goal"
                                    value="maintain_weight"
                                    onChange={handleChange}
                                    checked={formData.goal === 'maintain_weight'}
                                />
                                <RadioBox
                                    label={i18next.t('fill_profile.gain')}
                                    name="goal"
                                    value="gain_weight"
                                    onChange={handleChange}
                                    checked={formData.goal === 'gain_weight'}
                                />
                            </p>
                            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                            <p className="form_buttom">
                                <Button buttonClass="submit_button_reg" type="submit" onSubmit={handleSubmit}>
                                {i18next.t('fill_profile.submit_button')}
                                </Button>
                            </p>
                        </fieldset>
                    </form>
                </section>
            </main>
        </div>
    );
};
