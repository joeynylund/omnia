const express = require('express')
var nodemailer = require('nodemailer');
var admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "omnia-tournaments",
    "private_key_id": "c81dd73a766c46aaf5cfead1f09d3c49b663569d",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBxDZxiUfNCgcj\nKsEopFbOyuFRfyphuChbnyuVzo0+307n4uGa2neorL0+R4LzoHRMVEaRZTVx0Ib5\nK+nUd2zjbzey3TX2/CnL7Rt8dWG3kIjdODdnwtCLrRXAMi3SlE8VPXKegAbmtk3d\nJDvoZMgvlZjjpxaXd/6crD0YuxbrcBe6wQSejnOkEtpsJ72chTE9qd/NrbONl0hz\nY667IbOKZw+SZUt7y3mB4FEvn1CBp7h4uMKEQHYQykHKlQnKMiYkjBCMqNzrhxMj\nN6Y424zUBxh+uM+Ge9rKwMvpJJMMoPEP6MMJ7bziG1h60YCOpOKogz1rSLUPopGw\nuaGh++l5AgMBAAECggEACaEPbDynFEyYxonJN+n+zwpXAH6iI7a2pA2jaVpD5lQg\n7uDKrFrfUm2509P9m896qBESFrH3DMpmQrteGesQvratXRalfWTSS5TjZkp2X4ca\naL/ymkCcrixHpe74caa2zWE/MRrp/OIiDsjOWgH+zsU6PVSgM0kec+O9VN119J+I\nYrlktSC0prpOzbI/sLlIf1Rjmks4YbAB3ehnBJ9r70KXHtkHB2J/Ys3fnTS4gQIy\nWkT/7wcMyIKrhG71YWiIe4OOvAQxtAdCPcvoQpJeS0FwqT9EBd4w0nhI6jYX0w83\nBkGwvuoW625gsV1lGNfe4ag3yArehlmiqs5NiUHFmQKBgQDwgli6j6HfBQXjLd9x\nbp/XNheweadE7w/4I0hRVOHIry2vwh1PrailjDo7FikaYQLrBqeDTW6V9nvglpAm\nmbLfTOJjbYQF7EApzDeOrAuhY2lNe7AIoaxKtqQ1Kw27g9ObvcwlUeDsDBmkAX+P\num5AWVAJA2yd09Y/d88VUnWCbQKBgQDOPyU4IorrXbHVzAcGoUnhwbN3Qz52g1p6\nnyKW0VAhqxcgHCYJUaNt0PJP+NCW6QdepJGkxLArTxRNYwoM9v33/GF8NglPqbg2\nA3+H4HMmv/zsZ2DEFGo22bawF7XQzT/70bwQZNWivwfrBOM65Pwb2ukmyWiTsuWQ\nlgm9dam7vQKBgQCHkSGMf1vBxyYLaRcS7EVC3OW7fscvTwWUW+bumUbvhPbepC87\nc2qlbgaAubwPd3FaoxSXKXVVKGupK5UzfN1biw3s95U8dW+xX8BNNmMT5GI936NZ\nKjBgqNSkd5E1Clij5/cDbkS3KRbm4EVT8cUllnJLslduGzMf8VuT7Df6fQKBgE03\nJuAVTp0/vsykTh0VVWvH8UC9VC1akA1IdtKwGqgAPfAvma3zepQqng2CwdU9+Rxd\n0Ik3eh08xgUTBzhDYGHvgy/Vqza/+899D8n3JiVjy3VWXswKOJnAeL0Eo3VA4quM\nojQhDDqZ+oTql4f9IsXq908mKJjjaT7wbUUZQCqhAoGBAMllFya3e47PCVXpB1Kd\nYlhwyvjeoXM2Ro14KUUW2gZHnqo8rBlNI2yl/F/mCrQCgnZUq5pPWN+A4uw1IMXL\n0ZwgWRnpv4A3qIU3PA3/UI4F5CNhvA0UdQF/Vnvkbx01EfCwLjb5V7t4Wl3/NtIF\n6Ne8ZiWuPtpVrVt2JTuGHAQG\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ruj9v@omnia-tournaments.iam.gserviceaccount.com",
    "client_id": "112557656044048176988",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ruj9v%40omnia-tournaments.iam.gserviceaccount.com"
  })
});

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:example', (req, res) => {
    var test = req.params.example;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nylundja@gmail.com',
          pass: 'Nylund3221'
        }
    });
      
    var mailOptions = {
        from: 'nylundja@gmail.com',
        to: test,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send(error)
        } else {
          console.log('Email sent: ' + info.response);
          res.send('Email sent: ' + info.response)
        }
    });
    
})

app.get('/admin/:email', (req, res) => {
    var email = req.params.email;
    console.log('Received')
    admin
  .auth()
  .getUserByEmail('test@test.com')
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    res.send(userRecord)
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})