import React, { useState, useEffect } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import jsonData from '../data/calories.json';
import jsonData2 from '../data/sport.json'
import { useSelector } from 'react-redux';

export const DiaryPage = () => {
    const navigate = useNavigate();
    const [showText1, setShowText1] = useState(true);
    const [showText2, setShowText2] = useState(true);
    const [showSearch1, setShowSearch1] = useState(false);
    const [showSearch2, setShowSearch2] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)
    const [formData, setFormData] = useState({ foodItemName: '', quantityGrams: '', activityItemName: '', quantityMinutes: '' });

    const [jsonResults, setJsonResults] = useState([]);
    const [jsonResults2, setJsonResults2] = useState([]);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const productNames = jsonData.map(item => item.FoodItem);
        setJsonResults(productNames);
        const activityNames = jsonData2.map(item => item.Activity);
        setJsonResults2(activityNames);
    }, []);

    const handleGoToProfile = () => {
        navigate('/profile');
    };

    const handleGoToAuthPage = () => {
        navigate('/auth');
    };

    const handlePlusButtonClick1 = () => {
        setShowText1(false);
        setShowSearch1(true);
    };

    const handleCancel1 = () => {
        setShowText1(true);
        setShowSearch1(false);
    };

    const handlePlusButtonClick2 = () => {
        setShowText2(false);
        setShowSearch2(true);
    };

    const handleCancel2 = () => {
        setShowText2(true);
        setShowSearch2(false);
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
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
            if (res.ok) {
                console.log('Added');
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
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
            if (res.ok) {
                console.log('Added');
                // Reset form data after successful submission
                setFormData({ activityItemName: '', quantityMinutes: '' });
                // Show the add button again
                setShowSearch2(false);
                setShowText2(true);
            }
            console.log('The received data:', data);
        } catch (error) {
            console.error('Error sending request:', error.message);
            setErrorMessage(error.message);
        }
    };
    


    return (
        <div className="page_diary">
            <HeaderProfile click1={handleGoToProfile} click2={handleGoToAuthPage} child1="Profile" child2="Log out" />
            <div className="form_diary">
                <form className='section_diary' onSubmit={handleSubmit}>
                    <p className='text_diary' style={{ marginRight: '465px' }}>Food:</p>
                    {showSearch1 && (
                        <>
                            <div className="search-container">
                                <Autocomplete
                                    options={jsonResults}
                                    name="foodItemName"
                                    sx={{ width: 400 }}
                                    renderInput={(params) => <TextField {...params} label="Product search" />}
                                    onChange={(e, value) => handleChange(value, 'foodItemName')}
                                />
                                <TextField
                                    label="Grams"
                                    name="quantityGrams"
                                    sx={{ width: 200 }}
                                    onChange={(e) => handleChange(e.target.value, 'quantityGrams')}
                                    id="quantityGrams"
                                />
                                <Button buttonClass="submit_button_diary" type="submit" onSubmit={handleSubmit}>Submit</Button> {/* Додано кнопку "Submit" для відправлення введених даних */
                                }
                            </div>
                        </>
                    )}
                    {showText1 && <p className='little_text_diary'>Click here to select:</p>}
                    {showSearch1 ? (
                        <>
                            <Button buttonClass="cancel_button_diary" handleClick={handleCancel1}>Cancel</Button>
                        </>
                    ) : (
                        <Button buttonClass="add_button_diary" handleClick={handlePlusButtonClick1}>+</Button>
                    )}
                </form>
                <form className='section_diary' onSubmit={handleSubmitActivity}>
                    <p className='text_diary'>Activities:</p>
                    {showSearch2 && (
                        <>
                            <div className="search-container">
                                <Autocomplete
                                    options={jsonResults2}
                                    name="activityItemName"
                                    sx={{ width: 400 }}
                                    renderInput={(params) => <TextField {...params} label="Activity search" />}
                                    onChange={(e, value) => handleChange(value, 'activityItemName')}
                                />
                                <TextField
                                    label="Minutes"
                                    name="quantityMinutes"
                                    sx={{ width: 200 }}
                                    onChange={(e) => handleChange(e.target.value, 'quantityMinutes')}
                                    id="quantityMinutes"
                                />

                                <Button buttonClass="submit_button_diary" type="submit" onSubmit={handleSubmitActivity}>Submit</Button> {/* Додано кнопку "Submit" для відправлення введених даних */
                                }
                            </div>
                        </>
                    )}
                    {showText2 && <p className='little_text_diary'>Click here to select:</p>}
                    {showSearch2 ? (
                        <Button buttonClass="cancel_button_diary" handleClick={handleCancel2}>Cancel</Button>
                    ) : (
                        <Button buttonClass="add_button_diary" handleClick={handlePlusButtonClick2}>+</Button>
                    )}
                </form>
            </div>
        </div>
    );
};
