// GLOBAL VARIABLES
let countries; //will contain the fetched data

const continentsList = document.getElementById("continents");
const inputCountry = document.querySelector('input');

// function fetchCountries(continent) {
//     // console.log(1);
//     fetch(`https://restcountries.com/v2/${continent}`)
//         .then(function (res) {
//             // console.log(2);
//             // console.log(res);
//             return res.json();
//         })
//         .then(function (data) {
//             // console.log(data);
//             initialize(data);
//             // console.log(3);
//         })
//         .catch(function (err) {
//             console.log("Error: " + err);
//         })
//     // console.log(4);
// }

// fetchCountries("all");

const endpoint = 'https://restcountries.com/v2/all'
const allCountries = []

// fetch(endpoint)
//     .then(res => res.json())
//     .then(data => allCountries.push(...data))

async function fetchCountries() {
    const response = await fetch(endpoint);
    const data =  await response.json()
    return data;
}

fetchCountries().then(data => {
    allCountries.push(...data)
    initDisplay();
})

function initDisplay() {
    const html = allCountries.map(country => {
        return `<div>${country.name}</div>`;
    }).join('');
    countriesList.innerHTML = html;
}

function findMatches(inputToMatch, countries) {
    return countries.filter(country => {
        const regex = new RegExp(inputToMatch, 'gi')
        return country.name.match(regex)
    })
}

function filterByContinent(continent, countries){
    if (continent === 'all') {
        return countries
    } else {
        return countries.filter(country => {
           return country.region == continent
        })
    }

}

function displayMatches(){
    const countriesFilteredByContinent = filterByContinent(continentSelect.value, allCountries);
    console.log(countriesFilteredByContinent)
    const matchArray = findMatches(searchInputCountry.value, countriesFilteredByContinent);
    //I am using .join because it returns an array, so i make it a string
    const html = matchArray.map(country => {
        return `<div>${country.name}</div>`;
    }).join('');
    countriesList.innerHTML = html;
}

const searchInputCountry = document.querySelector('input');
const continentSelect = document.getElementById("continents");
const countriesList = document.getElementById("countries");

searchInputCountry.addEventListener('change', displayMatches);
searchInputCountry.addEventListener('keyup', displayMatches);
continentSelect.addEventListener('change', displayMatches)


// inputCountry.addEventListener('input', function (event) {
//     let input = event.target.value;
//     continentsList.value = "all";
//     // console.log(input.length);
//     if (input.length >= 1) {
//         fetchCountries("name/" + input);
//     } else {
//         fetchCountries("all");
//     }
// })

//Event Listener
// continentsList.addEventListener("change", function (event) {
//     // console.log(event);
//     inputCountry.value = "";
//     console.log(event.target.value);
//     let selectedContinent = event.target.value;
//     if (selectedContinent === "all") {
//         fetchCountries("all");
//     } else {
//         fetchCountries("region/" + selectedContinent);
//     }
//     // displayCountryInfo(event.target.value);
// })

function initialize(countriesData) {
    // console.log(countriesData);
    // console.log(countriesData[0].name);
    countries = countriesData;
    let countriesDiv = "";
    countries.forEach(country => {
        countriesDiv +=
            `<div class="country-single-card">
            <p><strong>Country: <span id="country-name">${country.name}</span></strong></p>
            <img src="${country.flag}" alt="" width="200px">
            <p>Capital: <span id="capital">${country.capital}</span></p>
            <p>Population: <span id="population">${country.population.toLocaleString("en-US")}</span></p>
            <p>Region: <span id="region">${country.region}</span></p>
            <p>Subregion: <span id="subregion">${country.subregion}</span></p>
            </div>
            <br />
            <br />`;
        })
        countriesList.innerHTML = countriesDiv;


    // for (let i = 0; i < countries.length; i++) {
    //     // options += `<option value="${countries[i].alpha3Code}">${countries[i].name}</option>`;
    //     countriesDiv +=
    //         `<div class="country-single-card">
    //         <p><strong>Country: <span id="country-name">${countries[i].name}</span></strong></p>
    //         <img src="${countries[i].flag}" alt="">
    //         <p>Capital: <span id="capital">${countries[i].capital}</span></p>
    //         <p>Population: <span id="population">${countries[i].population.toLocaleString("en-US")}</span></p>
    //         <p>Region: <span id="region">${countries[i].region}</span></p>
    //         <p>Subregion: <span id="subregion">${countries[i].subregion}</span></p>
    //         </div>`;
    //     // `<option value="${countries[i].alpha3Code}">${countries[i].name} (+${countries[i].callingCodes[0]})</option>`;
    // }
    // countriesList.selectedIndex = Math.floor(Math.random() * countriesList.length);

    // displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

let countriesCards = document.querySelectorAll(".country-single-card");
countriesCards.forEach((card) => {
    console.log(card);
})

//todo
//1. .fetch remove initialize function
//2. At initialize function use .forEach    OK
//3. When typing in input search only in the selected continent
//4. Style with CSS and BEM (practice)
//5. On country click show country's details on modal window
//5.1 Show countries with shared borders & display them on modal window
//5.2 Return back button
//6. Apply light/dark mode
//7. Write Readme documentation and comments



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