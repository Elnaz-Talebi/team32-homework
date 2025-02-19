const class07Students = [];
function addStudentToClass(studentName) {

  if (studentName === "" || studentName === undefined) {
    return "Student name is empty";
  }

  if (class07Students.includes(studentName)) {
    return `Student ${studentName} is already in the class 07.`;
  }

  if (getNumberOfStudents() > 5 && studentName !== "Queen of Denmark") {
    return `Cannot add more students to class 07`;
  }
 
  class07Students.push(studentName);
  return `${studentName} has been added to the class 07.`;
}

function getNumberOfStudents() {
  return class07Students.length;
}

console.log(addStudentToClass("mia"));
console.log(addStudentToClass("mia"));
console.log(addStudentToClass("leila"));
console.log(addStudentToClass("eli"));
console.log(addStudentToClass("lena"));
console.log(addStudentToClass("sam"));
console.log(addStudentToClass("sara"));
console.log(addStudentToClass("dane"));
console.log(addStudentToClass("Queen of Denmark"));
console.log(addStudentToClass("Queen of Denmark"));
console.log(addStudentToClass(""));
