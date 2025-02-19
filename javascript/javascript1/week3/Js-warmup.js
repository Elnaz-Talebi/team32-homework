//Item array removal

const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "katrine",
  "Tala",
];
const nameToRemove = "Ahmad";
console.log(names);
const index = names.indexOf(nameToRemove);
if (index > -1) {
  names.splice(index, 1);
}

console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala']

//When will we be there??

const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};
function timeCalculator(travelInformation) {
  const timeTravel =
    (travelInformation.destinationDistance / travelInformation.speed) * 60;
  const hours = Math.floor(timeTravel / 60);
  const minutes = Math.round(timeTravel % 60);
  return `${hours} hours and ${minutes} minutes. `;
}
const travelTime = timeCalculator(travelInformation);

console.log(travelTime);

//Series duration of my life

const seriesDurations = [
  {
    title: "Game of thrones",
    days: 2,
    hours: 20,
    minutes: 8,
  },
  {
    title: "Breaking Bad",
    days: 2,
    hours: 3,
    minutes: 40,
  },
  {
    title: "House of Cards",
    days: 2,
    hours: 14,
    minutes: 3,
  },
];

const avgLife = 80 * 365 * 24 * 60;

function logOutSeriesText(seriesDurations) {
  let totalMinutes = 0;
  for (let i = 0; i < seriesDurations.length; i++) {
    const series = seriesDurations[i];
    const totalMinutesPerFilm =
      series.days * 24 * 60 + series.hours * 60 + series.minutes;
    const percentage = (totalMinutesPerFilm / avgLife) * 100;
    console.log(`${series.title} took ${percentage.toFixed(3)} % of my life`);
    totalMinutes += totalMinutesPerFilm;
  }
  const totalPercentage = (totalMinutes / avgLife) * 100;
  console.log(`In total, that is ${totalPercentage.toFixed(3)}% of my life`);
}

logOutSeriesText(seriesDurations);
