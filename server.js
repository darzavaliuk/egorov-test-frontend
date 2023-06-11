const express = require('express');
const path = require('path');

const app = express();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'smilikk1111@gmail.com',
        pass: 'xuvkwnlbxhmgbwnk'
    }
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(express.json()); // для считывания JSON из POST запроса

app.post('/subscribe', (req, res) => {
    // здесь можно сохранить email в базу данных или отправить на сервис рассылок
    const {email} = req.body;

    // Отправка email
    transporter.sendMail({
            from: 'smilikk',
            to: email,
            subject: 'Вы подписались на рассылку',
            text: 'Спасибо за подписку! Теперь вы будете регулярно получать новости на почту.'
        }, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Ошибка отправки письма');
            } else {
                console.log('Email успешно отправлен: ' + info.response);
                res.status(200).send('Сообщение успешно отправлено');
                console.log("new")
            }
        }
    )
});

app.listen(5000);