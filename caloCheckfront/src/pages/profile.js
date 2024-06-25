import React, { useEffect, useState } from 'react';
import HeaderProfile from '../components/HeaderProfile/HeaderProfile';
// import Button from '../components/Button/Button';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import iconForUpdate from './static/images/icon for update.svg';
import iconForDelete from './static/images/icon for delete.svg';
export const Profile = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);
    const [profileData, setProfileData] = useState(null);
    const [secondResponse, setSecondResponse] = useState(null);
    const [thirdResponse, setThirdResponse] = useState(null);
    const [fourthResponse, setFourthResponse] = useState(null);
    const [leftCalories, setLeftCalories] = useState(null);
    const handleGoToDiary = () => {
        navigate('/diary');
    };
    const handleGoToAuthPage = () => {
        navigate('/authEnter');
    };


    useEffect(() => {
        const accountId = currentUser._id;

        // Виконання двох асинхронних запитів паралельно
        Promise.all([
            fetch(`/auth/profile/${accountId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            fetch(`/auth/profile/calo/${accountId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            fetch(`/auth/diary/food/${accountId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            fetch(`/auth/diary/activity/${accountId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            fetch(`/auth/leftCalories/${accountId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        ])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(([profileDataResponse, secondResponseData, thirdResponseData, fourthResponseData, leftCaloriesData]) => {
                setProfileData(profileDataResponse);
                setSecondResponse(secondResponseData);
                setThirdResponse(thirdResponseData);
                setFourthResponse(fourthResponseData);
                setLeftCalories(leftCaloriesData);
                console.log('Second response data:', secondResponseData);
                console.log('third response data:', thirdResponseData);
                console.log('fourth response data:', fourthResponseData);
                console.log('setLeftCalories:', leftCaloriesData);

            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    }, [currentUser._id]);
    const goalMapping = {
        lose_weight: "lose weight",
        maintain_weight: "maintain current weight",
        gain_weight: "gain weight"
    };
    return (
        <>
            <body className="page_profile">
                <HeaderProfile
                    click1={handleGoToDiary}
                    click2={handleGoToAuthPage}
                    child1="Diary"
                    child2="Log out"
                ></HeaderProfile>
                <main className="main">
                    
                        <div className="form_profile">
                            <div className="header_form_profile">
                                <div className="header_wrappper_form">
                                    <div className="header_username">
                                        <h1>@{currentUser.userName}</h1>
                                    </div>
                                    <div>
                                        <a href="/profileEditing" className="header_form_link">
                                            <img src={iconForUpdate} alt="iconForUpdate" />
                                        </a>
                                        <a href="/" className="header_form_link">
                                            <img src={iconForDelete} alt="iconForDelete" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="profile_section_wrapper">
                                <section className='profile_section_calories'>
                                    <div className='profile_calories_user'>
                                        <p>{(thirdResponse && thirdResponse.quantityCalories) || 0}</p>
                                        <p>eaten</p>
                                    </div>
                                    <div className='profile_calories'>
                                        <div className='profile_calories_container'>
                                            <div className='word_left'>
                                                <span>Left</span>
                                            </div>
                                            <div className='rest_calories'>
                                                {leftCalories !== null && (
                                                    <span>{leftCalories}</span>
                                                )}
                                            </div>
                                            <div className='calories_norm'>
                                                {secondResponse && secondResponse.caloriesNorm && (
                                                    <span>{secondResponse.caloriesNorm}</span>
                                                )}
                                                <span> kcal</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='profile_calories_user'>
                                        <p>{(fourthResponse && fourthResponse.quantityCalories) || 0}</p>
                                        <p>burned</p>
                                    </div>
                                </section>
                            </div>

                            <div className="profile_section_wrapper">
                                <section className='profile_section_inf'>
                                    <div className="profile_info_container">
                                        <div className='profile_item_container'>
                                            <p className='profile_item'>Gender:</p>
                                            {profileData && profileData.gender && (
                                                <p className='profile_user_info'>{profileData.gender}</p>
                                            )}
                                        </div>
                                        <div className='profile_item_container'>
                                            <p className='profile_item'>Weight:</p>
                                            {profileData && profileData.weight && (
                                                <p className='profile_user_info'>{profileData.weight}</p>
                                            )}
                                            <span className="measurement">kg</span>
                                        </div>
                                        <div className='profile_item_container'>
                                            <p className='profile_item'>Age:</p>
                                            {profileData && profileData.age && (
                                                <p className='profile_user_info'>{profileData.age}</p>
                                            )}
                                            <span className="measurement">years</span>
                                        </div>

                                        <div className='profile_item_container'>
                                            <p className='profile_item'>Height:</p>
                                            {profileData && profileData.height && (
                                                <p className='profile_user_info'>{profileData.height}</p>
                                            )}
                                            <span className="measurement">cm</span>
                                        </div>
                                    </div>
                                    <div className='profile_goal'>
                                        <p className='profile_item'>My goal:</p>
                                        {profileData && profileData.goal && (
                                            <p className='profile_user_info'>{<p className='profile_user_info'>{goalMapping[profileData.goal]}</p>}</p>
                                        )}
                                    </div>
                                </section>
                            </div>

                        </div>
                    
                </main>
            </body>
        </>
    );
};
