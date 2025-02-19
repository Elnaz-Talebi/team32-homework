const activities = [];
function addActivity(activity, duration, limit) {
  const today = new Date();
  if (calculateTotalDuration(activities) >= limit) {
    console.log("You have reached your limit, no more smartphoning for you!");
    return;
  }
  const item = {
    date: today,
    activity: activity,
    duration: duration,
  };
  activities.push(item);
  console.log(`Item added:`, item);
}

function showStatus(activities, limit, date) {
  if (activities.length === 0) {
    console.log("Add some activities before calling showStatus");
    return;
  }

  const filterActivities = filterByDate(date);
  const totalDuration = calculateTotalDuration(filterActivities);
  console.log(
    `You have added ${filterActivities.length} activities. They amount to ${totalDuration} min. of usage at ${date}.`
  );
  if (totalDuration >= limit) {
    console.log("You have reached your limit, no more smartphoning for you!");
  }
}

function calculateTotalDuration(filterActivities) {
  let totalDuration = 0;

  for (let i = 0; i < filterActivities.length; i++) {
    totalDuration = totalDuration + filterActivities[i].duration;
  }
  return totalDuration;
}

function filterByDate(date) {
  const result = [];
  const validDate = new Date(date);
  for (let i = 0; i < activities.length; i++) {
    if (
      validDate.toDateString() === activities[i].date.toDateString() ||
      date === undefined
    )
      result.push(activities[i]);
  }
  return result;
}

function mostActivities(){
  const result = [];
  activities.reduce(function(res, value) {
    if (!res[value.activity]) {
      res[value.activity] = { activity: value.activity, duration: 0 };
      result.push(res[value.activity])
    }
    res[value.activity].duration += value.duration;
    return res;
  }, {});
let maxTime = -1;
let activityName;
for (let act of result){
  if (act.duration > maxTime){
    maxTime = act.duration
    activityName = act.activity
  }
}
  return `You have used ${activityName} for a total duration of ${maxTime}`
}




let limit = 50;
const date = "February 19, 2025";
showStatus(activities, limit, date);

addActivity("YouTub", 20, limit);
addActivity("Instagram", 10, limit);

showStatus(activities, limit, date);

addActivity("YouTub", 20, limit);
addActivity("Instagram", 10, limit);

showStatus(activities, limit, date);

let mostActivity = mostActivities()
console.log(mostActivity)


limit = undefined; // if user wants a day without any restriction and do not set any limit.
showStatus(activities, limit, date);

addActivity("YouTub", 20, limit);
addActivity("Instagram", 10, limit);

showStatus(activities, limit, date);

mostActivity = mostActivities()
console.log(mostActivity)
