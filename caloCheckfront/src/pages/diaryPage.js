import './static/styles/style.min.css'
import React, { useState, useEffect, useContext } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import jsonDataEN from '../data/calories.json';
import jsonData2EN from '../data/sport.json';
import jsonDataUKR from '../data/caloriesUKR.json';
import jsonDataUKR2 from '../data/sportUKR.json';
import { useSelector } from 'react-redux';
import { LanguageContext } from '../LanguageContext';
import i18next from '../i18n';

export const DiaryPage = () => {
    const navigate = useNavigate();
    const [showText1, setShowText1] = useState(true);
    const [showText2, setShowText2] = useState(true);
    const [showSearch1, setShowSearch1] = useState(false);
    const [showSearch2, setShowSearch2] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const { currentLanguage } = useContext(LanguageContext);
    const [formData, setFormData] = useState({ foodItemName: '', quantityGrams: '', activityItemName: '', quantityMinutes: '' });

    const [jsonResults, setJsonResults] = useState([]);
    const [jsonResults2, setJsonResults2] = useState([]);
    const { currentUser } = useSelector(state => state.user);

    const [isFoodSectionActive, setIsFoodSectionActive] = useState(false);
    const [isActivitySectionActive, setIsActivitySectionActive] = useState(false);

    const [foodItems, setFoodItems] = useState([]);
    const [activityItems, setActivityItems] = useState([]);

    //Loading
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        i18next.on('initialized', () => {
            setIsInitialized(true);
        });
        if (i18next.isInitialized) {
            setIsInitialized(true);
        }
    }, []);

    //Change dataset (language)
    useEffect(() => {
        const loadData = () => {
            if (currentLanguage === 'ua') {
                setJsonResults(jsonDataUKR.map(item => item.FoodItem));
                setJsonResults2(jsonDataUKR2.map(item => item.Activity));
            } else {
                setJsonResults(jsonDataEN.map(item => item.FoodItem));
                setJsonResults2(jsonData2EN.map(item => item.Activity));
            }
        };

        loadData();
    }, [currentLanguage]);

    // Products of user
    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const accountId = currentUser._id;
                const response = await fetch(`/auth/diary/food/${accountId}`);

                if (!response.ok) {
                    throw new Error('Не вдалося отримати дані про їжу');
                }

                let data = await response.json();

                // Перевірка, що дані є масивом об'єктів
                if (!Array.isArray(data)) {
                    // Якщо дані не є масивом, то перетворюємо їх у масив
                    data = [data];
                }

                // Оновлення стану з отриманими даними
                setFoodItems(data);

            } catch (error) {
                console.error('Помилка отримання даних про їжу:', error.message);
                setFoodItems([]); // Встановлення порожнього масиву або обробка стану помилки
            }
        };

        fetchFoodItems();
    }, [currentUser]);

    // Activities of user
    useEffect(() => {
        const fetchActivityItems = async () => {
            try {
                const accountId = currentUser._id;
                const response = await fetch(`/auth/diary/activity/${accountId}`);

                if (!response.ok) {
                    throw new Error('Не вдалося отримати дані про їжу');
                }

                let data = await response.json();

                // Перевірка, що дані є масивом об'єктів
                if (!Array.isArray(data)) {
                    // Якщо дані не є масивом, то перетворюємо їх у масив
                    data = [data];
                }

                // Оновлення стану з отриманими даними
                setActivityItems(data);

            } catch (error) {
                console.error('Помилка отримання даних про їжу:', error.message);
                setFoodItems([]); // Встановлення порожнього масиву або обробка стану помилки
            }
        };

        fetchActivityItems();
    }, [currentUser]);

    useEffect(() => {
        console.log(foodItems); // Перевірка стану foodItems
    }, [foodItems]);


    const handleGoToProfile = () => {
        navigate('/profile');
    };

    const handleGoToAuthPage = () => {
        navigate('/auth');
    };

    const handlePlusButtonClick1 = () => {
        setShowText1(false);
        setShowSearch1(true);
        setIsFoodSectionActive(true);
    };

    const handleCancel1 = (e) => {
        e.preventDefault(); 
        setShowText1(true);
        setShowSearch1(false);
        setIsFoodSectionActive(false);
        setFormData({ ...formData, foodItemName: '', quantityGrams: '' });
    };

    const handlePlusButtonClick2 = () => {
        setShowText2(false);
        setShowSearch2(true);
        setIsActivitySectionActive(true);
    };

    const handleCancel2 = (e) => {
        e.preventDefault();
        setShowText2(true);
        setShowSearch2(false);
        setIsActivitySectionActive(false);
        setFormData({ ...formData, activityItemName: '', quantityMinutes: '' });
    };


    const handleChange = (value, name) => {
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.foodItemName || !formData.quantityGrams) {
            return console.log('Please fill all fields.');
        }
        try {
            const accountId = currentUser._id;
            const res = await fetch(`/auth/diary/food/${accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, language: currentLanguage })
            });
            const data = await res.json();
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
            if (res.ok) {
                console.log('Added');
                setFoodItems([...foodItems, { ...formData, foodItem: [formData.foodItemName], quantityGrams: [formData.quantityGrams], caloriesForProduct: [data.caloriesForProduct] }]);
                // Reset form data after successful submission
                setFormData({ foodItemName: '', quantityGrams: '' });
                // Show the add button again
                setShowSearch1(false);
                setShowText1(true);
            }
            console.log('The received data:', data);
        } catch (error) {
            console.error('Error sending request:', error.message);
            setErrorMessage(error.message);
        }
    };

    const handleSubmitActivity = async (e) => {
        e.preventDefault();
        if (!formData.activityItemName || !formData.quantityMinutes) {
            return console.log('Please fill all fields.');
        }
        try {
            const accountId = currentUser._id;
            const res = await fetch(`/auth/diary/activity/${accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, language: currentLanguage })
            });
            const data = await res.json();
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }
            if (res.ok) {
                console.log('Added activity:', data);
                // Обновление состояния activityItems
                setActivityItems([...activityItems, { ...formData, activityItem: [formData.activityItemName], quantityMinutes: [formData.quantityMinutes], caloriesForActivity: [data.caloriesForActivity] }]);
                // Сброс формы после успешной отправки
                setFormData({ activityItemName: '', quantityMinutes: '' });
                // Показ кнопки добавления снова
                setShowSearch2(false);
                setShowText2(true);
            }
            console.log('The received data:', data);
        } catch (error) {
            console.error('Error sending request:', error.message);
            setErrorMessage(error.message);
        }
    };
    
    

    if (!isInitialized) {
        return <div>Завантаження...</div>;
    }

    return (
        <div className="page_diary">
            <HeaderProfile click1={handleGoToProfile} click2={handleGoToAuthPage} child1={i18next.t('profile_diary.profile_button')} child2={i18next.t('profile_diary.logout_button')} />
            <main className="container_form_dairy">
                <div className="form_diary">
                    <form className={`section_diary ${isFoodSectionActive ? 'active' : ''}`} onSubmit={handleSubmit}>
                        <p className='text_diary'>{i18next.t('profile_diary.food')}</p>
                        {showSearch1 && (
                            <>
                                <div className="search-container">
                                    <Autocomplete
                                        options={jsonResults}
                                        name="foodItemName"
                                        sx={{ width: '80%' }}
                                        renderInput={(params) => <TextField {...params} label={i18next.t('profile_diary.product_search')} />}
                                        onChange={(e, value) => handleChange(value, 'foodItemName')}
                                    />
                                    <TextField
                                        label={i18next.t('profile_diary.grams')}
                                        name="quantityGrams"
                                        sx={{ width: '50%' }}
                                        onChange={(e) => handleChange(e.target.value, 'quantityGrams')}
                                        id="quantityGrams"
                                    />
                                    <Button buttonClass="submit_button_diary" type="submit" onSubmit={handleSubmit}>{i18next.t('profile_diary.submit_button')}</Button>
                                </div>
                            </>
                        )}
                        {showText1 && <p className='little_text_diary'>{i18next.t('profile_diary.select_text')}</p>}
                        {showSearch1 ? (
                            <>
                                <Button buttonClass="cancel_button_diary" handleClick={handleCancel1}>{i18next.t('profile_diary.cancel_button')}</Button>
                            </>
                        ) : (
                            <Button buttonClass="add_button_diary" handleClick={handlePlusButtonClick1}>+</Button>
                        )}
                        
                        <div style={{ color: 'black' }}>
                            {(foodItems && foodItems.filter(item => item).length > 0) ? (
                                foodItems.filter(item => item).map((item, index) => (
                                    <div key={item._id || index}>
                                        {item.foodItem && item.foodItem.map((activity, idx) => (
                                            <p key={idx}><strong>{activity}</strong>: {item.quantityGrams[idx]} гр, {item.caloriesForProduct[idx]} кк</p>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <p>No food items found.</p>
                            )}
                        </div>
                    </form>
                    <form className={`section_diary ${isActivitySectionActive ? 'active' : ''}`} onSubmit={handleSubmitActivity}>
                        <p className='text_diary'>{i18next.t('profile_diary.activity')}</p>
                        {showSearch2 && (
                            <>
                                <div className="search-container">
                                    <Autocomplete
                                        options={jsonResults2}
                                        name="activityItemName"
                                        sx={{ width: '80%' }}
                                        renderInput={(params) => <TextField {...params} label={i18next.t('profile_diary.activity_search')} />}
                                        onChange={(e, value) => handleChange(value, 'activityItemName')}
                                    />
                                    <TextField
                                        label={i18next.t('profile_diary.minutes')}
                                        name="quantityMinutes"
                                        sx={{ width: '50%' }}
                                        onChange={(e) => handleChange(e.target.value, 'quantityMinutes')}
                                        id="quantityMinutes"
                                    />
                                    <Button buttonClass="submit_button_diary" type="submit" onSubmit={handleSubmitActivity}>{i18next.t('profile_diary.submit_button')}</Button>
                                </div>
                            </>
                        )}
                        {showText2 && <p className='little_text_diary'>{i18next.t('profile_diary.select_text')}</p>}
                        {showSearch2 ? (
                            <Button buttonClass="cancel_button_diary" handleClick={handleCancel2}>{i18next.t('profile_diary.cancel_button')}</Button>
                        ) : (
                            <Button buttonClass="add_button_diary" handleClick={handlePlusButtonClick2}>+</Button>
                        )}

                        <div style={{ color: 'black' }}>
                            {(activityItems && activityItems.filter(item => item).length > 0) ? (
                                activityItems.filter(item => item).map((item, index) => (
                                    <div key={item._id || index}>
                                        {item.activityItem && item.activityItem.map((activity, idx) => (
                                            <p key={idx}><strong>{activity}</strong>: {item.quantityMinutes[idx]} хв, {item.caloriesForActivity[idx]} кк</p>
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <p>No activity items found.</p>
                            )}
                        </div>



                    </form>
                </div>
            </main>
        </div>
    );
};
