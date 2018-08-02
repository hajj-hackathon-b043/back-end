const key = "AAAAlbVwXig:APA91bGVcB1fPJZsha8DQoSa7edf0fOCtQTwVdS6yoX8JgTt4JO6HtKJpbjVLiO0Hh8tFdImIAgEPIB5t6POAGZdcWTHrvpVPgEl60Q8_aKGHCaBpdWcyxwteKLMgoMWgAHkpcdiY88f7pUNSlAJiRV5jYEST_-zyw"

const admin = require("firebase-admin");
const serviceAccount = require("../config/hajj-hackathon-212022-firebase-adminsdk-dc68r-ee626636d9.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hajj-hackathon-212022.firebaseio.com"
});


function notify({token, message}) {

    const message = {
        token: token,
        notification: {
            'title': message.title,
            'body': message.body,
            'icon': 'https://cdn.dextra.art/website/assets/1501776716680-image.jpg',
            'click_action': 'http://localhost:3000'
        },
        data: {},
    };

    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

function addToTopic({fcm_token, topic}) {
    admin.messaging().subscribeToTopic(fcm_token, topic)
        .then(function (response) {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log('Successfully subscribed to topic:', response);
        })
        .catch(function (error) {
            console.log('Error subscribing to topic:', error);
        });
}

module.exports = {
    addToTopic: (obj) => addToTopic(obj),
    notify: (obj) => notify(obj),
}
