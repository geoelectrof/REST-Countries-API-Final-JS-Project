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
        // const currencies = country.currencies.forEach(currency => );
        return `
            <div class="card" data-key="${country.name}">
                <div class="card__flag-container">
                    <img src=${country.flag} class="card__flag" />
                </div>
                <div class="card__info">
                    <h2 class="card__name">${country.name}</h2>
                    <p class="card__info-data"><span class="card__info-data-title">Population: </span>${country.population.toLocaleString("en-US")}</p>
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
    document.getElementById("countries").style.display = "none";
    const singleCountryDiv = document.createElement("div");
    document.querySelector(".main-content").appendChild(singleCountryDiv);
    singleCountryDiv.classList.add("single-country-content");

    let currenciesList = theCountry.currencies.map(currency => currency.name).join(", ");
    let languagesList = theCountry.languages.map(language => language.name).join(", ");


    singleCountryDiv.innerHTML = `
        
            <button class="back"><i class="fa-solid fa-arrow-left"></i> Back</button>
            <div  class="single-country">
                <div class="single-country__flag">
                    <img src=${theCountry.flag} class="card__flag" />
                </div>
                <div class="single-country__info">
                    <h1>${theCountry.name}</h1>
                    <div class="single-country__info-columns">
                        <div class="single-country__info-single-column">
                            <p><span class="single-country__data-title">Native Name: </span> ${theCountry.nativeName}</p>
                            <p><span class="single-country__data-title">Population: </span> ${theCountry.population.toLocaleString("en-US")}</p>
                            <p><span class="single-country__data-title">Region: </span> ${theCountry.subregion}</p>
                            <p><span class="single-country__data-title">Region: </span> ${theCountry.capital}</p>
                        </div>
                        <div class="single-country__info-single-column">
                            <p><span class="single-country__data-title">Top Level Domain: </span>${theCountry.topLevelDomain}</p>
                            <p><span class="single-country__data-title">Currencies: </span>${currenciesList}</p>
                            <p><span class="single-country__data-title">Languages: </span>${languagesList}</p>
                            </div>
                        </div>
                        <p><span class="single-country__data-title">Border Countries: </span></p>
                </div>
            </div>
        
    `;
    let back = document.querySelector(".back");
    back.addEventListener('click', function(){
        singleCountryDiv.remove();
        document.querySelector('.filters').style.display = "flex";
        document.getElementById("countries").style.display = "grid";
        displayMatches();
    })
}

