let dogYearOfBirth = 2021;
let dogYearFuture = 2045;
let dogYear = dogYearFuture - dogYearOfBirth;
let dogAge = dogYear * 7;
let shouldShowResultInDogYears = true;

if (shouldShowResultInDogYears) {
    console.log(`Your dog will be ${dogAge} years old in ${dogYearFuture}`);
} else {
    console.log(`Your dog will be ${dogYear} years old in ${dogYearFuture}`);
}