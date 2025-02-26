const user = {
  name: "",
  todo: [],
};
console.log(
  "How can I help you?",
  "These are some Commands to warm up:",
  "My name is Elnaz - ",
  "What is my name - ",
  "Add Shower to my todo - ",
  "Remove Shower from my todo - ",
  "What is on my todo - ",
  "What day is it today - ",
  "Set a timer for 1 minutes - ",
  "How can I learn JavaScript - ",
  "what is 3 + 3 "
);
function getReply(command) {

  if (command.startsWith("My name is")) {
    const name = command.replace("My name is", "").trim();
    user.name = name;
    console.log(`Nice to meet you ${name}`);
  } else if (command.startsWith("What is my name")) {
    if (user.name) {
      console.log(user.name);
    } else {
      console.log(`What is your name?`);
    }
  } else if (command.startsWith("Add") & command.includes("to my todo")) {
    const todo = command.replace("Add", "").replace("to my todo", "").trim();
    user.todo.push(todo);
    console.log(`${todo} has been added to todo`);
  } else if (command.startsWith("Remove") & command.includes("from my todo")) {
    const todo = command
      .replace("Remove", "")
      .replace("from my todo", "")
      .trim();
    const index = user.todo.indexOf(todo);
    if (index > -1) {
      user.todo.splice(index, 1);
      console.log(`${todo} has been removed from todo`);
    }
  } else if (command.startsWith("What") & command.includes("todo")) {
    const count = user.todo.length;
    if (count > 0) {
      console.log(`You have ${count} todos. ${user.todo.join(" and ")} `);
    } else {
      console.log(`You do not have any todos for today.`);
    }
  } else if (command.startsWith("What day is it today")) {
    const today = new Date();
    const month = today.toLocaleDateString("en-US", { month: "long" });
    console.log(`${today.getDay()}. of ${month} ${today.getFullYear()}`);
  } else if (command.startsWith("Set a timer")) {
    const time = command
      .replace("Set a timer for", "")
      .replace("minutes", "")
      .trim();
    setTimeout(() => {
      console.log("Time is up.");
    }, time * 60 * 1000);
  } else if (command.startsWith("How can I learn JavaScript")) {
    console.log(
      "You can apply for HackYourFuture at https://www.hackyourfuture.dk/ "
    );
  }

  const regex = /what is (\d+)\s*([\+\-\*\/])\s*(\d+)/i;
  const mathMatch = command.match(regex);

  if (mathMatch) {
    const num1 = parseInt(mathMatch[1]);
    const operator = mathMatch[2];
    const num2 = parseInt(mathMatch[3]);
    let result;
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      default:
        result = "Invalid operator";
    }
    console.log(result);
  }
}

getReply("My name is Elnaz");

getReply("What is my name");

getReply("Add Shower to my todo");

getReply("Remove Shower from my todo");

getReply("What is on my todo");

getReply("What day is it today");

getReply("Set a timer for 1 minutes");

getReply("How can I learn JavaScript");

getReply("what is 3 + 3");
