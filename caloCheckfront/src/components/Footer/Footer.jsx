import logo from './LOGO 2.svg'
import './Footer.css';
import facebook from './icons/facebook.png'
import github from './icons/github.png'
import instagram from './icons/instagram.png'
import linkedin from './icons/linkedin.png'
import telegram from './icons/telegram.png'
import twitter from './icons/twitter.png'



export default function Footer() {
    return (
        <div className="footer">
            <div className="wrapper_footer">
                <nav className="footer_main_info">
                    <ul className="footer_list">

                        <li className="footer_item">
                            <div className="header_logo">
                                <a href="/" className="header_logo_link">
                                    <img src={logo} alt="logo" className="header_logo_pic" />
                                </a>
                            </div>
                        </li>
                        <li className="footer_item" style={{ width: '173px' }}>
                            <p>Почувайся вільно з CaloCheck</p>
                        </li>

                    </ul>
                    <ul className="footer_right_info">
                        <li>
                            <ul>
                                <li className='footer_right_items'>ABOUT</li>
                                <li className='footer_right_items'
                                style={{ fontWeight: 400, fontSize: '15px', marginTop: '30px'}}>CaloCheck Info</li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li className='footer_right_items'>FOLLOW US</li>
                                <li className='footer_right_items'
                                style={{ fontWeight: 400, fontSize: '15px', marginTop: '30px'}}>Github</li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li className='footer_right_items'>LEGAL</li>
                                <li className='footer_right_items'
                                style={{ fontWeight: 400, fontSize: '15px', marginTop: '30px'}}>Privacy Policy</li>
                                <li className='footer_right_items'
                                style={{ fontWeight: 400, fontSize: '15px', marginTop: '30px'}}> Term & Conditions</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <hr />
                <nav className="footer_botton_info">
                    <ul className="footer_list_botton">

                        <li className="footer_item_botton" >
                            <p>2024 CaloCheck</p>
                        </li>
                        <div className='footer_icons'>
                            <li className="footer_item_botton">
                                <a href="/">
                                    <img src={facebook} alt="facebook" />
                                </a>
                            </li>
                            <li className="footer_item_botton">
                                <a href="/">
                                    <img src={github} alt="facebook" />
                                </a>
                            </li>
                            <li className="footer_item_botton">
                                <a href="/">
                                    <img src={instagram} alt="facebook" />
                                </a>
                            </li>
                            <li className="footer_item_botton">
                                <a href="/">
                                    <img src={linkedin} alt="facebook" />
                                </a>
                            </li>
                            <li className="footer_item_botton">
                                <a href="/">
                                    <img src={telegram} alt="facebook" />
                                </a>
                            </li>
                            <li className="footer_item_botton">
                                <a href="/">
                                    <img src={twitter} alt="facebook" />
                                </a>
                            </li>
                        </div>

                    </ul>
                </nav>
            </div>
        </div>
    );
}
