import React from "react";
import HeaderContacts from '../components/HeaderContacts/Header'
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";

export const Contacts = () => {

    return (
        <>
            <body className="page_contacts">
                <HeaderContacts />
                <form className="contact_welcome">
                    <h1>WELCOME!</h1>

                    <div className="contact_welcome_inside">
                        <div className="contact_welcome_text">
                            <p>Name</p>
                            <p>Email</p>
                            <p>Message</p>
                        </div>
                        <div className="contact_welcome_text">
                            <input placeholder="Your name"></input>
                            <input placeholder="Your email"></input>
                            <input placeholder="Your message"></input>
                        </div>
                        <Button buttonClass="header_button_contacts">Send</Button>
                    </div>
                </form>

                <form className="contact_info">
                    <h1 style={{ marginBottom: "60px" }}
                    >CONTACT INFORMATION</h1>
                    <p>If you have comments or suggestions, or questions about cooperation, write or call us.</p>
                    <p>E-mail: admincalo@ukr.net.</p>

                </form>
                <Footer></Footer>

            </body>
        </>

    );
};
