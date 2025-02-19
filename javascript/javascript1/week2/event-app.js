function getEventWeekday(days) {
    const weekdayArray= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date().getDay();
    const finalDay = today + days;
    const dayIndex = finalDay % 7;



    return(weekdayArray[dayIndex])

}

console.log(getEventWeekday(1))
console.log(getEventWeekday(10))
console.log(getEventWeekday(2))
console.log(getEventWeekday(6))