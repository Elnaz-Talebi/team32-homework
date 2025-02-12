const boughtCandyPrices = [];
function addCandy(candyType, weight) {
  if (canBuyMoreCandy()) {
    if (candyType === "Sweet") {
      boughtCandyPrices.push(0.5 * weight);
      console.log("Sweet added to basket");
    } else if (candyType === "Chocolate") {
      boughtCandyPrices.push(0.7 * weight);
      console.log("Chocolate added to basket");
    } else if (candyType === "Toffee") {
      boughtCandyPrices.push(1.1 * weight);
      console.log("Toffee added to basket");
    } else if (candyType === "Chewing-gum") {
      boughtCandyPrices.push(0.03 * weight);
      console.log("Chewing-gum added to basket");
    } else {
      console.log(`There is no such candy in our shop.`);
    }
  }
}

let amountToSpend = Math.random() * 100;

function canBuyMoreCandy() {
  let total = 0;
  for (i = 0; i < boughtCandyPrices.length; i++) {
    total = +boughtCandyPrices[i];
  }
  if (total < amountToSpend) {
    console.log(`You can buy more, so please do`);
    return true;
  } else {
    console.log(`Enough candy for you!`);
    return false;
  }
}

addCandy("Sweet", 20);
addCandy("Chocolate", 20);
addCandy("Toffee", 30);
addCandy("Chewing-gum", 50);
addCandy("Bagali", 10);

console.log(boughtCandyPrices);
