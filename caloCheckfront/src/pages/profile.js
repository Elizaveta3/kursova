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

    const handleGoToDiary = () => {
        navigate('/diary');
    };
    const handleGoToAuthPage = () => {
        navigate('/authEnter');
    };
    // const handleGoToProfileEdit = () => {
    //     navigate('/profileEditing');
    // };

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
        ])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(([profileDataResponse, secondResponseData, thirdResponseData, fourthResponseData]) => {
                setProfileData(profileDataResponse);
                setSecondResponse(secondResponseData);
                setThirdResponse(thirdResponseData);
                setFourthResponse(fourthResponseData);
                console.log('Second response data:', secondResponseData);
                console.log('third response data:', thirdResponseData);
                console.log('fourth response data:', fourthResponseData);
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    }, [currentUser._id]);

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
                    <section>
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
                                    <div>{secondResponse && secondResponse.caloriesNorm && (
                                        <p className='profile_calories'>{secondResponse.caloriesNorm}</p>
                                    )}</div>
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
                                            <p className='profile_user_info'>{profileData.goal}</p>
                                        )}
                                    </div>
                                </section>
                            </div>

                        </div>
                    </section>
                </main>
            </body>
        </>
    );
};
