const rp = require('request-promise')
require('dotenv').config()

module.exports = async (city = '') => {
    if (!city) {
        throw new Error('Имя города не может быть пустым')
    }

    const APIKEY = process.env["APIKEY "]
    const uri = process.env["APIURL "]

    const options = {
        uri,
        qs: {
            appid: APIKEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    try {
        const response = await rp(options)
        const celsius = (response.main.temp - 32) * 5/9
        return {
            weather: `${response.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    }
    catch (error) {
        return {
            weather: null,
            error: error.error.message
        }
    }
}