import logo from './LOGO 2.svg'
import Button from '../Button/Button'
import './Header.css'
export default function Header() {
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
                            <Button buttonClass="header_button" >Головна сторінка</Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>)
}