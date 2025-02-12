const dogYearOfBirth = 2021;
const dogYearFuture = 2045;
const dogYear = dogYearFuture - dogYearOfBirth;
const dogAge = dogYear * 7;
const shouldShowResultInDogYears = true;

if (shouldShowResultInDogYears) {
    console.log(`Your dog will be ${dogAge} years old in ${dogYearFuture}`);
} else {
    console.log(`Your dog will be ${dogYear} years old in ${dogYearFuture}`);
}