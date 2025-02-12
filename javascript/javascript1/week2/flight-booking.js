
const firstname = "Eli"
const surname = "Talebi"
function getFullname2(firstname, surname, useFormalName, isfemale){
    let prefix = "";
  if (useFormalName){
    if (isfemale){
        prefix = "Lady"
    }
    else {
        prefix = "Lord"
    } 
  }
return `${prefix} ${firstname} ${surname}`
};

fullname1 = getFullname2(firstname, surname, true,true);
fullname2 = getFullname2(firstname, surname, true,false);
fullname3 = getFullname2(firstname, surname, false,true);
fullname4 = getFullname2(firstname, surname, false, false);
fullname5 = getFullname2(firstname, surname);
console.log(fullname1)
console.log(fullname2)
console.log(fullname3)
console.log(fullname4)
console.log(fullname5)