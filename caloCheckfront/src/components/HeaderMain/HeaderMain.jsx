import logo from './LOGO 2.svg'
import Button from '../Button/Button'
import './HeaderMain.css'
import {  Link, useNavigate } from 'react-router-dom';

export default function HeaderMain() {
    const navigate = useNavigate();

    const handleGoToAuthPage = () => {
        navigate('/auth');
    };
    const handleGoToRegisterPage = () => {
        navigate('/register');
    };
    return (<header className="header">
        <div className="wrapper">
            <div className="header_wrappper">
                <div className="header_logo">
                    <a href="/" className="header_logo_link">
                        <img src={logo} alt="logo" className="header_logo_pic" />
                    </a>
                </div>
                <nav className="header_nav">
                    <ul className="header_list">
                        <li className="header_item">
                            <Button buttonClass="header_button_main" handleClick={handleGoToRegisterPage}>Зареєструватися</Button>
                            <Button buttonClass="header_button_main" handleClick={handleGoToAuthPage}>Увійти</Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>)
}