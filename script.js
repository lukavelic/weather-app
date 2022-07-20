class Weather {
    constructor() {
        this.location = {}
        this.weatherData = {}
    }
    geocode = (input) => {
        const apiKey = 'f8f7a86acb216286bdcaa84ea257f83c';
        const resultLimit = 1;
        const query = input;

        const apiCall = async (query) => {
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${resultLimit}&appid=${apiKey}`, {mode: 'cors'});
                const location = await response.json();
                const firstResult = location[0];
                
                this.location = firstResult;

                this.getWeatherData();
            } catch (error) {
                console.log(error);
            };
        };

        apiCall(query);
    };
    getWeatherData = () => {
        const apiKey = 'f8f7a86acb216286bdcaa84ea257f83c';

        const apiCall = async () => {
            try {
                console.log(this)
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.location.lat}&lon=${this.location.lon}&appid=${apiKey}`, {mode: 'cors'});
                const weatherData = await response.json();

                this.weatherData = weatherData;
            } catch (error) {
                console.log(error);
            };
        };

        apiCall();
    };
};

const weatherFunc = new Weather;
weatherFunc.geocode('London');