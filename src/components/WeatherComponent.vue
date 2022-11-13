<template>
    <div class="wrapper q-pa-md q-my-md font text-white">
        <div class="row justify-between items-center">
            <h3 class="font text-white q-pa-none text-left">Today's weather</h3>
            <q-img v-if="img != ''" class='image' :src="require(`@/assets/weather/${img}`)"></q-img>
        </div>

        <div class="row justify-center text-center">
            <div class="col-10 text-left" style="font-size: 20px;">{{ weatherDesc }}</div>
        </div>
        <div class="row justify-center text-left">
            <div class="col-4 temp">{{ this.feelsLike }}</div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'
export default {
    mounted() {
        this.getLocation()
        this.animate()
    },
    data() {
        return {
            //api_key: "b14210f72f1ac7b474488b9bfb16831d",
            api_key: "0e8985f71a00d62a07abedf89d424104",
            weather_url_base: "https://api.openweathermap.org/data/2.5/weather?",
            location_url_base: "http://api.openweathermap.org/geo/1.0/direct?q=Singapore&limit=1&appid=",
            temp: '',
            humidity: '',
            feelsLike: '',
            weather: '',
            weatherDesc: '',
            img: 'cloud.png',
        }
    },
    methods: {
        getWeather(lat, lon) {
            fetch(`${this.weather_url_base}lat=${lat}&lon=${lon}&appid=${this.api_key}&units=metric`)
                .then(res => res.json())
                .then(data => {
                    let weather = data;
                    this.temp = weather.main.temp + '°C'
                    this.feelsLike = weather.main.feels_like + '°C'
                    this.weather = weather.weather[0].main
                    if (this.weather == 'Clouds') {
                        this.img = 'sun-cloud.png'
                    } else if (this.weather = 'Sunny') {
                        this.img = 'sun.png'
                    } else if (this.weather = 'Rainy') {
                        this.img = 'rain.png'
                    } else {
                        this.img = 'cloud.png'
                    }

                    let weatherDesc = weather.weather[0].description
                    this.weatherDesc = weatherDesc[0].toUpperCase() + weatherDesc.slice(1)
                })
        },
        getLocation() {
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Singapore&limit=1&appid=${this.api_key}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    var lat = data[0].lat
                    var lon = data[0].lon
                    console.log(lat, lon)
                    this.getWeather(lat, lon)
                })
        },
        animate() {
            gsap.from('.wrapper',
                { opacity: 0, x: 700, duration: 1, ease: 'power1' })

        }

    },
}
</script>

<style>
.wrapper {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    background: url('@/assets/weather/weather-bg.jpg');
    background-size: cover;
    background-position: bottom center;
    background-repeat: no-repeat;
}

.font {
    font-family: 'Open Sans', sans-serif;
}

.image {
    width: 65px;
    height: 65px;
}

.temp {
    font-size: 70px;
}
</style>