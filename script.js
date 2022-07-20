class Weather {
    constructor() {
        this.data = {}
    }
    geocode = (query) => {
        const apiKey = 'f8f7a86acb216286bdcaa84ea257f83c';
        const resultLimit = 1;

        const apiCall = async (query) => {
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${resultLimit}&appid=${apiKey}`);
                const weatherData = await response.json();
                const firstResult = weatherData[0];
                
                this.data = firstResult;
                
                console.log(this.data)
            } catch (error) {
                console.log(error);
            };
        };

        apiCall();
    };
};

const weatherFunc = new Weather;
weatherFunc.geocode('London');