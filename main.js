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
    displayMatches();
    const divs = document.querySelectorAll(".card")
    divs.forEach(div => div.addEventListener('click', logText))
})

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
    // console.log(countriesFilteredByContinent)
    const matchArray = findMatches(searchInputCountry.value, countriesFilteredByContinent);
    //I am using .join because it returns an array, so i make it a string
    const html = matchArray.map(country => {
        // console.log(country)
        let hello = country.name;
        return `
            <div class="card" data-key="${country.name}">
                <div class="card__flag-container">
                    <img src=${country.flag} class="card__flag" />
                </div>
                <div class="card__info">
                    <h2 class="card__name">${country.name}</h2>
                    <p class="card__info-data"><span class="card__info-data-title">Population: </span>${country.population}</p>
                    <p class="card__info-data"><span class="card__info-data-title">Region: </span>${country.region}</p>
                    <p class="card__info-data"><span class="card__info-data-title">Capital: </span>${country.capital}</p>
                </div>
            </div>
        `;
    }).join('');
    countriesList.innerHTML = html;
    const divs = document.querySelectorAll(".card")
    divs.forEach(div => div.addEventListener('click', logText))
}

const searchInputCountry = document.querySelector('input');
const continentSelect = document.getElementById("continents");
const countriesList = document.getElementById("countries");

searchInputCountry.addEventListener('change', displayMatches);
searchInputCountry.addEventListener('keyup', displayMatches);
continentSelect.addEventListener('change', displayMatches);

function myFunction(e) {
    document.getElementById("countries").innerHTML = `<button onclick="displayMatches()">Back</button><h1>Hello World</h1>`;
    console.log(e.target)
}



function logText(e) {
    console.log(e.currentTarget.getAttribute('data-key'));
    let selectedCountry = e.currentTarget.getAttribute('data-key');
    let theCountry = allCountries.find( country => country.name === selectedCountry);
    console.log(theCountry);
    // document.getElementById("countries").innerHTML = `
    //     <button onclick="displayMatches()">Back</button>
    //     <h1>${theCountry.name}</h1>
    // `;
    document.querySelector('.filters').style.display = "none";
    document.getElementById("countries").innerHTML = `
        <div>
            <button class="back">Back</button>
            <div  class="single-country">
                <div class="single-country__flag">
                    <img src=${theCountry.flag} class="card__flag" />
                </div>
                <div class="single-country__info">
                    <h1>${theCountry.name}</h1>
                </div>
            </div>
        <div>
    `;
    let back = document.querySelector(".back");
    back.addEventListener('click', function(){
        document.querySelector('.filters').style.display = "flex";
        displayMatches();
    })
}


// function initialize(countriesData) {
//     countries = countriesData;
//     let countriesDiv = "";
//     countries.forEach(country => {
//         countriesDiv +=
//             `<div class="country-single-card">
//             <p><strong>Country: <span id="country-name">${country.name}</span></strong></p>
//             <img src="${country.flag}" alt="" width="200px">
//             <p>Capital: <span id="capital">${country.capital}</span></p>
//             <p>Population: <span id="population">${country.population.toLocaleString("en-US")}</span></p>
//             <p>Region: <span id="region">${country.region}</span></p>
//             <p>Subregion: <span id="subregion">${country.subregion}</span></p>
//             </div>
//             <br />
//             <br />`;
//         })
//         countriesList.innerHTML = countriesDiv;

// }

// let countriesCards = document.querySelectorAll(".country-single-card");
// countriesCards.forEach((card) => {
//     console.log(card);
// })

//todo
//1. .fetch remove initialize function                                      OK
//2. At initialize function use .forEach                                    OK
//3. When typing in input search only in the selected continent             OK
//4. Style with CSS (BEM & CSS custom properties (variables) (practice)
//5. On country click show country's details on new page/modal window
//5.1 Show countries with shared borders & display them on modal window
//5.2 Return back button
//6. Apply light/dark mode
//7. Write Readme documentation and comments