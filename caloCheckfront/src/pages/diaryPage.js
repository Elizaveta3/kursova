import React, { useState, useEffect } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import jsonData from '../data/calories.json';
import { useSelector } from 'react-redux';

export const DiaryPage = () => {
    const navigate = useNavigate();
    const [showText1, setShowText1] = useState(true);
    const [showText2, setShowText2] = useState(true);
    const [showSearch1, setShowSearch1] = useState(false);
    const [showSearch2, setShowSearch2] = useState(false);
    const [formData, setFormData] = useState({ foodItem: '', quantityGrams: '' });
    const [jsonResults, setJsonResults] = useState([]);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const productNames = jsonData.map(item => item.FoodItem);
        setJsonResults(productNames);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.foodItem || !formData.quantityGrams) {
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
            if (data.success === false) {
                return console.log(data.message);
            }
            if (res.ok) {
                console.log('Added');
                // Reset form data after successful submission
                setFormData({ foodItem: '', quantityGrams: '' });
            }
            console.log('The received data:', data);
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    return (
        <div className="page_diary">
            <HeaderProfile click1={handleGoToProfile} click2={handleGoToAuthPage} child1="Profile" child2="Log out" />
            <div className="form_diary">
                <section className='section_diary' onSubmit={handleSubmit}>
                    <p className='text_diary' style={{ marginRight: '465px' }}>Food:</p>
                    {showSearch1 && (
                    <>
                        <div className="search-container">
                        <Autocomplete
                            options={jsonResults}
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label="Product search" />}
                            onChange={(e, value) => setFormData({ ...formData, foodItem: value })}
                        />
                        <TextField
                            label="Grams"
                            name="quantityGrams"
                            sx={{ width: 200 }}
                            value={formData.quantityGrams}
                            onChange={handleChange}
                        />
                    
                            <Button buttonClass="submit_button_diary" type="submit">Submit</Button> {/* Додано кнопку "Submit" для відправлення введених даних */
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
                </section>
                <section className='section_diary'>
                    <p className='text_diary'>Activities:</p>
                    {showSearch2 && (
                        <>
                        <div className="search-container">
                        <Autocomplete
                            options={jsonResults}
                            sx={{ width: 400 }}
                            renderInput={(params) => <TextField {...params} label="Activities search" />}
                        />
                        <TextField
                            label="Minutes"
                            //value={gramValue}
                            //onChange={handleGramChange}
                            sx={{ width: 200 }}
                        />
                    
                            <Button buttonClass="submit_button_diary">Submit</Button> {/* Додано кнопку "Submit" для відправлення введених даних */
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
                </section>
            </div>
        </div>
    );
};
