const searchDiv = document.getElementById("search-box")
const searchBtn = document.getElementById("search-btn")
const randomBtn = document.getElementById('random-search-btn')
const heading = document.getElementById('heading')
const heroDiv = document.getElementById('hero-div');


// CONSTANTS


const apiURL = 'https://superheroapi.com/api.php/'
const accessToken = '102964106046700'




const fetchAPI = async () => {
    const fetchURL = `${apiURL}${accessToken}/search/${searchDiv.value}`;
    const response = await fetch(fetchURL);
    const data = await response.json();
    return data;
}

const fetchApiId = async (id) => {
    const fetchURL = `${apiURL}${accessToken}/${id}`;
    const response = await fetch(fetchURL);
    const data = await response.json();
    return data;
}

const searchHero = () => {
    fetchAPI(searchDiv.value)
        .then(data => {
            heroDiv.innerHTML = '';
            searchDiv.value = ''
            data.results.forEach((result) => {
                heroDiv.innerHTML += `<img src = ${result.image.url}> <br>
            <h1>${result.name}</h1><br> `
                heroDiv.innerHTML += `<h4>Your Hero's Stats</h4>`
                const statObj = result.powerstats;
                for (stat in statObj) {
                    heroDiv.innerHTML += `<p>${stat} : ${statObj[stat]}</p> <br>`
                }
            })
        })
        .catch(err => heroDiv.innerHTML = "No Hero Found...");
}


searchBtn.addEventListener('click', () => {
    searchHero();
})

searchDiv.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        searchHero();
    }
})




randomBtn.addEventListener('click', () => {
    const id = (Math.floor(Math.random() * 731) + 1);
    searchDiv.value = ''
    fetchApiId(id)
        .then(data => {
            heroDiv.innerHTML = `<img src = ${data.image.url} alt=${data.name}'s image><h1>${data.name}</h1><br>`
            const statsObj = data.powerstats;
            heroDiv.innerHTML += `<h4>Your Hero's Stats</h4>`
            for (stat in statsObj) {
                heroDiv.innerHTML += `<p>${stat} : ${statsObj[stat]}</p> <br>`;
            }
        })
        .catch(err => err)
})
