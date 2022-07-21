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
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';

        if(this.location.length === 0) {
            resultsDiv.innerHTML = 'No results.';
        } else {
            for(let i = 0; i < this.location.length; i++) {
                const div = document.createElement('div');
                div.className = `result-${i}`;
                div.innerText = `${this.location[i].name}`;
                div.addEventListener('click', this.selectResult)
    
                resultsDiv.appendChild(div);
            };
        };     
    };
    selectResult = (e) => {
        let orderOfResult = e.target.classList[0].slice(7);
        this.getWeatherData(this.location[orderOfResult].lat, this.location[orderOfResult].lon);
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
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`, {mode: 'cors'});
                const weatherData = await response.json();

                this.weatherData = weatherData;
            } catch (error) {
                console.log(error);
            };
        };

        apiCall();
        this.deleteResults();
    };
    deleteResults = () => {
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
        const searchBox = document.querySelector('#search-box');    
        searchBox.value = '';
    }
    displayData = () => {
    };
};

const weatherFunc = new Weather;
weatherFunc.initalSetup();