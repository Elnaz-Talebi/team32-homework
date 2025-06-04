const parameters = process.argv;
let total = 0;
let count = 0;
parameters.forEach((element) => {
  const num = parseInt(element);
  if (num >= 0) {
    total = total + num;
    count = count + 1;
  }
});

if (count > 0) {
  const avg = total / count;
  console.log("The average is: ", avg);
} else {
  console.log("There is no valid number to calculate the average");
}
