const sgMail = require('@sendgrid/mail');

const API_KEY = process.env.SEND_GRID_API_KEY;

sgMail.setApiKey(API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'cse.zubair.shaikh@gmail.com',
        subject: 'New Joining ',
        text: `Hi ${name}, hope you are doing well. Welcome to Node js training`
    }, false, (error, response) => {
        if (!error) {
            return console.log('Error occurred ', error);
        }

        console.log(response)
    });

};


const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'cse.zubair.shaikh@gmail.com',
        subject: 'Deleting you',
        text: `Hi ${name}, I'm happy deleting you. Thank you for being with us.x`
    }, false, (error, response) => {
        if (!error) {
            return console.log('Error occurred ', error);
        }

        console.log(response)
    });

};

module.exports = {
    sendWelcomeEmail: sendWelcomeEmail,
    sendCancelEmail: sendCancellationEmail
}