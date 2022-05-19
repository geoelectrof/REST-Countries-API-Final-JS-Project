// GLOBAL VARIABLES
let countries; //will contain the fetched data
const countriesList = document.getElementById("countries");

//Event Listener
countriesList.addEventListener("change", function (event) {
    // console.log(event);
    // console.log(event.target.value);
    displayCountryInfo(event.target.value);
})

// console.log(1);
fetch("https://restcountries.com/v2/all")
    .then(function (res) {
        // console.log(2);
        // console.log(res);
        return res.json();
    })
    .then(function (data) {
        // console.log(data);
        initialize(data);
        // console.log(3);
    })
    .catch(function (err) {
        console.log("Error: " + err);
    })
// console.log(4);


function initialize(countriesData) {
    // console.log(countriesData);
    // console.log(countriesData[0].name);
    countries = countriesData;
    let countriesDiv = "";
    for (let i = 0; i < countries.length; i++) {
        // options += `<option value="${countries[i].alpha3Code}">${countries[i].name}</option>`;
        countriesDiv +=
            `<p><strong>Country: <span id="country-name">${countries[i].name}</span></strong></p>
            <img src="${countries[i].flag}" alt="">
            <p>Capital: <span id="capital">${countries[i].capital}</span></p>
            <p>Population: <span id="population">${countries[i].population.toLocaleString("en-US")}</span></p>
            <p>Region: <span id="region">${countries[i].region}</span></p>
        <p>Subregion: <span id="subregion">${countries[i].subregion}</span></p>`;
        // `<option value="${countries[i].alpha3Code}">${countries[i].name} (+${countries[i].callingCodes[0]})</option>`;
    }
    countriesList.innerHTML = countriesDiv;
    // countriesList.selectedIndex = Math.floor(Math.random() * countriesList.length);

    // displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

// function displayCountryInfo(countryByAlpha3Code) {
//     const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
//     console.log(countryData);
//     document.querySelector("#flag-container img").src = countryData.flag;
//     document.querySelector("#flag-container img").alt = `Flag of ${countryData.name}`;
//     document.getElementById("capital").innerHTML = countryData.capital;
//     document.getElementById("dialing-code").innerHTML = "+" + countryData.callingCodes[0];
//     document.getElementById("population").innerHTML = "+" + countryData.population;
//     document.getElementById("population").innerHTML = countryData.population.toLocaleString("en-US");
//     document.getElementById("currencies").innerHTML = countryData.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ");
//     document.getElementById("region").innerHTML = countryData.region;
//     document.getElementById("subregion").innerHTML = countryData.subregion;

// }





// setTimeout(() => {
//     console.log(countries);
// }, 1000);

// function open() {
//     var opened = window.open("");
//     opened.document.write("<html><head><title>MyTitle</title></head><body>test</body></html>");
// }