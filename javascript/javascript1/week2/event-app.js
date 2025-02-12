function getEventWeekday(days) {
    const weekdayArray= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date().getDay();
    const finalDay = today + days;
    const dayIndex = finalDay % 7;



    console.log(weekdayArray[dayIndex])

}
getEventWeekday(1)
getEventWeekday(10)
getEventWeekday(2)
getEventWeekday(6)