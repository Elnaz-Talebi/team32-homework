
const firstName = "Eli"
const surname = "Talebi"
function getFullname2(firstName, surname, useFormalName, isFemale){
  if(firstName && surname ){
    let prefix = "";
    if (useFormalName){
      if (isFemale){
          prefix = "Lady"
      }
      else {
          prefix = "Lord"
      } 
    }
  return `${prefix} ${firstName} ${surname}`
  }
  else {
    console.log(`Pleas provide your name and surname`)
  }
  
};

fullname1 = getFullname2(firstName, surname, true,true);
fullname2 = getFullname2(firstName, surname, true,false);
fullname3 = getFullname2(firstName, surname, false,true);
fullname4 = getFullname2(firstName, surname, false, false);
fullname5 = getFullname2(firstName, surname);
console.log(fullname1)
console.log(fullname2)
console.log(fullname3)
console.log(fullname4)
console.log(fullname5)