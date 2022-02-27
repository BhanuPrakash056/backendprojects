const router = require('express').Router();
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', (req, res) => {
    res.render('index', {
        ci: null,
        des: null,
        temperature: null
    });
});

router.post('/', async (req, res) => {
    const ci = req.body.ci;
    const url_api = `http://api.openweathermap.org/data/2.5/weather?q=${ci}&units=imperial&appid=8da260d5243112ee3ecef42ec23ca465`;

    try {
        await fetch(url_api)
            .then(res => res.json())
            .then(data => {
                if (data.message === 'Not Available') {
                    res.render('index', {
                        ci: data.message,
                        des: null,

                        temperature: null
                    })
                } else {
                    const ci = data.name;
                    const des = data.weather[0].description;
                    const temperature = data.main.temp;

                    res.render('index', {
                        ci, des, temperature
                    });
                }
            });

    } catch (err) {
        res.render('index', {
            ci: 'something wrong',
            des: null,
            temperature: null
        })
    }

})


module.exports = router;