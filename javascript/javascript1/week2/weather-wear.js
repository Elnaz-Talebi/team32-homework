function whatToWear(temperature){
    if (temperature<10){
        return `Jacket and boot`
    } else if (temperature<20){
        return `sweatshirt and pant`
    } else {
        return `Shorts and a t-ishirt`
    }

}


console.log(whatToWear(15))
console.log(whatToWear(9))
console.log(whatToWear(30))