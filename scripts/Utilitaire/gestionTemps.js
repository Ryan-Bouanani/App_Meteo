
// On déclare un tabeaux des jours de la semaine 
const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// On selectionne le jour axtuelle
let ajd = new Date();
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
// console.log(ajd);
// console.log(jourActuel);

// On range le tableau en fonction du jour actuelle
jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
// console.log(tabJoursEnOrdre);

export default tabJoursEnOrdre;
