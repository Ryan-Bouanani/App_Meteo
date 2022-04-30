import tabJoursEnOrdre from './Utilitaire/gestionTemps.js';
// console.log('DEPUIS MAIN.js; ' + tabJoursEnOrdre);

// Cle api
const CLEAPI = '103cdc77e8521ee6b6800732fb1a8bb4 ';
let resultatsAPI;

// On selectionne les elements dans lesquelles on va insérer le temps actuel
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');

// De meme avec la température par heure
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');

// De meme avec les températures par jours
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');

// On selectionnne l'icone pour la modifier plus tard selon le tzmps qu'il fait
const imgIcone = document.querySelector('.logo-meteo');

// 
const chargementContainer = document.querySelector('.overlay-icone-chargement')

// On demande la géolocalisation de l'utilisateur
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        // Si c'est bon on selectionne sa longitude et sa lattitude (sa position quoi)
        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long, lat);

        // Si refus de géolocalisation on met une alert
    }, () => {
        alert('Vous avez refusé la géolocalisation l\'application ne peut pas fonctionner veuiller l\'activer');
    })
}

// On crée une fonction qui va appeler l'API
function AppelAPI(long, lat) {

    // On envoi une requette à l'API
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEAPI}`)
        // On met la reponse de l'APIen json (mieux comprhensible (il parrait))
        .then((reponse) => {
            return reponse.json();
        })
        // Onc peut maintenant commencer à manier les données renvoyées par l'API
        .then((data) => {
            console.log(data);
            resultatsAPI = data;

            // On affiche les temps actuelle
            temps.innerText = resultatsAPI.current.weather[0].description;
            temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`;
            localisation.innerText = resultatsAPI.timezone;

            // On affiche les heure, par tranches de trois

            let heureActuelle = new Date().getHours();

            for (let i = 0; i < heure.length; i++) {

                let heureIncr = heureActuelle + i * 3;
                console.log(heureActuelle);
                if (heureIncr > 24) {
                    heure[i].innerText = `${heureIncr - 24} h`;
                } else if (heureIncr === 24) {
                    heure[i].innerText = '00 h';
                } else {
                    heure[i].innerText = `${heureIncr} h`;
                }
            }

            // On affiche les températures pour chaque heures (donc toutes les 3h)

            for (let j = 0; j < tempPourH.length; j++) {

                // let heureIncr = heureActuelle + i * 3;
                tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`;
            }


            // On affiche le jour de la semaine pour chaque températures
            for (let k = 0; k < tabJoursEnOrdre.length; k++) {
                joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0, 3);
            }

            // On affiche la température pour chaque jour de la semaine
            for (let m = 0; m < 7; m++) {
                tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`;
            }

            // Icon Dynamique
            if (heureActuelle >= 6 && heureActuelle < 21) {
                imgIcone.src = `resources/jour/${resultatsAPI.current.weather[0].icon}.svg`;
            } else {
                imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`;
            }

            chargementContainer.classList.add('disparition');

        })

};