import logo from './LOGO 2.svg'
import './Footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className="wrapper">
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
                </nav>
                <hr />
                <nav className="footer_botton_info">
                <ul className="footer_list_botton">
                        
                        <li className="footer_item_botton">
                            
                        </li> 
                        <li className="footer_item_botton" >
                            <p>Почувайся вільно з CaloCheck</p>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    );
}
