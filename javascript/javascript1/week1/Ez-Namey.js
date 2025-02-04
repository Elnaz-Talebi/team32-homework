let firstWords = ['Sky', 'Bright', 'Ever', 'Zen', 'Echo', 'Neo', 'Quantum', 'Solar', 'Apex', 'Nova'];
let secondWords = ['Tech', 'Wave', 'Nexus', 'Edge', 'Forge', 'Path', 'Core', 'Flow', 'Craft', 'Hub'];

const randomNumber = Math.floor(Math.random() * 10);
const randomNumber2 = Math.floor(Math.random() * 10);
let startupName = firstWords[randomNumber] +' '+ secondWords[randomNumber2];

console.log(`The startup: "${startupName}" contains ${startupName.length} characters.`);