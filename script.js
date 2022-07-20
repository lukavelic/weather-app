class Weather {
    constructor() {
        this.location = {}
        this.weatherData = {}
    }
    initalSetup = () => {
        const obj = this;
        const searchButton = document.querySelector('#search-button');
        const searchBox = document.querySelector('#search-box');
        searchButton.addEventListener('click', this.getInput);
        searchBox.addEventListener('input', function(e) {
            obj.geocode(e.target.value);
        } );
        searchBox.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                obj.getInput();
            };
        });
    };
    
    displayResults = () => {
        const resultsDiv = document.querySelector('#results');
        console.log(this)
        resultsDiv.innerText = `${this.location[0].name}, ${this.location[1].name}, ${this.location[2].name}`;
        
    };
    getInput = () => {
        const searchBox = document.querySelector('#search-box');
        this.geocode(searchBox.value);
        searchBox.value = '';
    };
    geocode = (input) => {
        const apiKey = 'f8f7a86acb216286bdcaa84ea257f83c';
        const resultLimit = 3;
        const query = input;

        const apiCall = async (query) => {
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${resultLimit}&appid=${apiKey}`, {mode: 'cors'});
                const location = await response.json();
                this.location = location;

                this.getWeatherData();
                this.displayResults();
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
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.location[0].lat}&lon=${this.location[0].lon}&appid=${apiKey}`, {mode: 'cors'});
                const weatherData = await response.json();

                this.weatherData = weatherData;
            } catch (error) {
                console.log(error);
            };
        };

        apiCall();
    };
    displayData = () => {
    };
};

const weatherFunc = new Weather;
weatherFunc.initalSetup();