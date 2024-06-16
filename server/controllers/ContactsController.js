import nodemailer from 'nodemailer'

export const sendEmail = async (req,res) =>{
    try{

        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        let transporter = nodemailer.createTransport({
            host: 'smtp.ukr.net',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'admincalo@ukr.net', // Ваша пошта на ukr.net
                pass: 'CaloCheck2024' // Ваш пароль до пошти
            }
        });

        let mailOptions = {
            from: email, // від кого
            to: 'admincalo@ukr.net', // кому
            subject: 'New Message from Contact Form', // тема
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // текст листа
            html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>` // HTML листа
        };

        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Email sent successfully');
    } catch (err) {
        console.error('Error sending email: ', err);
        res.status(500).send('Error sending email');
    }
};