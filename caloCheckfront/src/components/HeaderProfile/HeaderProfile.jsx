import logo from './LOGO 2.svg'
import Button from '../Button/Button'
import './HeaderProfile.css'


export default function HeaderProfile({ click1, click2, child1, child2 }) {
    return (<header className="header_profile">
        <div className="wrapper_profile">
            <div className="header_wrappper_profile">
                <div className="header_logo">
                    <a href="/" className="header_logo_link">
                        <img src={logo} alt="logo" className="header_logo_pic" />
                    </a>
                </div>
                <nav className="header_nav_profile">
                    <ul className="header_list_profile">
                        <li className="header_item_profile">
                            <Button buttonClass="header_button_profile" handleClick={click1}>{child1}</Button>
                            <Button buttonClass="header_button_profile" handleClick={click2}>{child2}</Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>)
}