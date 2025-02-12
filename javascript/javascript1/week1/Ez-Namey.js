const firstWords = ['Sky', 'Bright', 'Ever', 'Zen', 'Echo', 'Neo', 'Quantum', 'Solar', 'Apex', 'Nova'];
const secondWords = ['Tech', 'Wave', 'Nexus', 'Edge', 'Forge', 'Path', 'Core', 'Flow', 'Craft', 'Hub'];

const randomNumber = Math.floor(Math.random() * 10);
const randomNumber2 = Math.floor(Math.random() * 10);
const startupName = firstWords[randomNumber] +' '+ secondWords[randomNumber2];

console.log(`The startup: "${startupName}" contains ${startupName.length} characters.`);