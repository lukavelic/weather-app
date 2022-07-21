class Weather {
    constructor() {
        this.location = {}
        this.weatherData = {}
    }
    initalSetup = () => {
        const obj = this;
        const searchButton = document.querySelector('#search-button');
        const searchBox = document.querySelector('#search-box');
        searchButton.addEventListener('click', this.searchButton);
        searchBox.addEventListener('input', function(e) {
            obj.geocode(e.target.value);
        } );
        searchBox.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                obj.searchButton();
            };
        });
    };

    searchButton = () => {
        const searchButton = document.querySelector('#search-button');

        if(this.location.length === 0) {
            searchButton.addEventListener('click', function(e) {
                e.preventDefault();
            });
        } else this.getWeatherData(this.location[0].lat, this.location[0].lon)
    };
    
    displayResults = () => {
        const resultsDiv = document.querySelector('.results');
        resultsDiv.innerHTML = '';

        if(this.location.length === 0) {
            resultsDiv.innerHTML = '<div class="result">No results.</div>';
        } else {
            for(let i = 0; i < this.location.length; i++) {
                const div = document.createElement('div');
                div.attributes.id = `result-${i}`;
                div.classList = 'result name';

                if(this.location[i].name.length > 25) {
                    div.innerText = `${this.location[i].name.slice(0,23)}...`;
                } else {
                    div.innerText = `${this.location[i].name}, ${this.location[i].country}`;
                };

                div.addEventListener('click', this.selectResult);
    
                resultsDiv.appendChild(div);
            };
        };     
    };
    selectResult = (e) => {
        let orderOfResult = e.target.attributes.id.slice(7);
        this.getWeatherData(this.location[orderOfResult].lat, this.location[orderOfResult].lon);
    };
    geocode = (input) => {
        const apiKey = 'f8f7a86acb216286bdcaa84ea257f83c';
        const resultLimit = 3;
        const query = input;

        const apiCall = async (query) => {
            try {
                const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${resultLimit}&appid=${apiKey}`, {mode: 'cors'});
                const location = await response.json();
                this.location = location;
                
                this.displayResults();
            } catch (error) {
                console.log(error);
            };
        };

        apiCall(query);
    };
    getWeatherData = (lat, lon) => {
        const latitude = lat;
        const longitude = lon;
        const apiKey = 'f8f7a86acb216286bdcaa84ea257f83c';

        const apiCall = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`, {mode: 'cors'});
                const weatherData = await response.json();

                this.weatherData = weatherData;
                this.displayData();
            } catch (error) {
                console.log(error);
            };
        };

        apiCall();
        console.log(this);
        this.deleteResults();
    };
    deleteResults = () => {
        const resultsDiv = document.querySelector('.results');
        resultsDiv.innerHTML = '';
        const searchBox = document.querySelector('#search-box');    
        searchBox.value = '';
    }
    displayData = () => {
        const location = document.querySelector('#location-name');
        const weather = document.querySelector('#weather-icon');
        const temperature = document.querySelector('#temperature');
        const weatherDescription = document.querySelector('#weather-description');

        location.innerText = `${this.weatherData.name.toUpperCase()}`;
        weather.innerHTML = '';
        const weatherIcon = document.createElement('img');
        weatherIcon.src = `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
        weather.appendChild(weatherIcon);
        temperature.innerText = `${Math.round(this.weatherData.main.temp*10)/10}`;
        weatherDescription.innerText = `${this.weatherData.weather[0].main}`
    };
};

const weatherFunc = new Weather;
weatherFunc.initalSetup();