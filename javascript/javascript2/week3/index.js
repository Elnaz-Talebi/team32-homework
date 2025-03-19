const entryTime = new Date().getTime();

const storageKey = "data";
const recipeList = loadFromStorage() ?? generateData();
const activeTypeFilter = [];

let searchList = [...recipeList];

function renderRecipe() {
  const recipeSection = document.getElementById("recipe");
  recipeSection.replaceChildren();

  searchList.forEach((item) => {
    const parent = document.createElement("div");
    parent.classList.add("every-recipe");
    parent.addEventListener("click", () => {
      showModal(item);
    });

    const h3 = document.createElement("h3");
    h3.textContent = item.title;
    parent.appendChild(h3);

    const img = document.createElement("img");
    img.src = item.picture_url;
    parent.appendChild(img);

    const i = document.createElement("i");
    i.classList.add("fa-solid");
    i.classList.add("fa-eye");
    parent.appendChild(i);

    recipeSection.appendChild(parent);
  });
}

function search() {
  const keyword = document.getElementById("text-box").value;
  if (keyword) {
    searchList = recipeList.filter((item) => {
      return item.title.toLowerCase().includes(keyword);
    });
  } else {
    searchList = [...recipeList];
  }
  resetSort();
  renderRecipe();
}

function convertFormToObject(formData) {
  const formDataArray = Array.from(formData.entries());
  const formDataObject = Object.fromEntries(formDataArray);

  const ingredientCount = formDataArray.filter(([key]) =>
    key.startsWith("ingredients")
  ).length;

  const result = {
    id: recipeList.length + 1,
    title: formDataObject["title"],
    picture_url: formDataObject["picture-url"],
    ingredients: [],
    description: formDataObject["description"],
  };

  for (let i = 0; i < ingredientCount; i++) {
    const ingredientsObject = {
      NAME: formDataObject[`ingredients${i}`],
      AMOUNT: formDataObject[`amount${i}`],
    };
    if (ingredientsObject.NAME) {
      result.ingredients.push(ingredientsObject);
    }
  }

  return result;
}

function convertTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.floor((totalMinutes * 60) % 60);
  return { hours, minutes, seconds };
}

function convertTimeFromMs(totalMilliseconds) {
  const hours = Math.floor(
    (totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

function formatTime(hours, minutes, seconds) {
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function showModal(item) {
  const modalDetails = document.getElementById("modal-details");
  modalDetails.replaceChildren();

  const h3 = document.createElement("h3");
  h3.textContent = item.title;
  modalDetails.appendChild(h3);

  const img = document.createElement("img");
  img.src = item.picture_url;
  img.alt = `${item.title} image`;
  modalDetails.appendChild(img);

  const timerElement = document.createElement("div");
  timerElement.classList.add("set-timer");

  const span = document.createElement("span");
  const cookingTime = convertTime(item.time);
  span.textContent = formatTime(
    cookingTime.hours,
    cookingTime.minutes,
    cookingTime.seconds
  );

  const timerButton = document.createElement("button");
  timerButton.innerHTML = '<i class="fa-solid fa-bell"></i>';
  timerButton.classList.add("btn_recipe");
  timerButton.addEventListener("click", () => {
    const currentTime = new Date().getTime();
    const timeInMs = item.time * 60 * 1000;
    const countDownTime = currentTime + timeInMs;
    const cookingInterval = setInterval(function () {
      const nowTime = new Date().getTime();
      const timeDifference = countDownTime - nowTime;
      const timeDifferenceObject = convertTimeFromMs(timeDifference);
      span.textContent = formatTime(
        timeDifferenceObject.hours,
        timeDifferenceObject.minutes,
        timeDifferenceObject.seconds
      );
      span.style.color = "black";

      if (timeDifference <= 1) {
        span.style.color = "red";
        const cookingTime = convertTime(item.time);
        const cookingTimeString = formatTime(
          cookingTime.hours,
          cookingTime.minutes,
          cookingTime.seconds
        );

        span.textContent = `${cookingTimeString} Timer is up!`;
        clearInterval(cookingInterval);
      }
    }, 1000);
  });
  timerElement.appendChild(timerButton);

  timerElement.appendChild(span);

  modalDetails.appendChild(timerElement);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.innerHTML = `<p class='bold'>Description: </p><p> ${item.description} </p>`;
  modalDetails.appendChild(descriptionDiv);

  const ingredientDiv = document.createElement("div");
  const ingredientP = document.createElement("p");
  ingredientP.textContent = "Ingredients: ";
  ingredientP.classList.add("bold");
  ingredientDiv.appendChild(ingredientP);
  item.ingredients.forEach((value) => {
    if (value?.NAME) {
      const p = document.createElement("p");
      p.textContent = `${value.NAME}: ${value.AMOUNT}`;
      ingredientDiv.appendChild(p);
    }
  });

  modalDetails.appendChild(ingredientDiv);

  const modal = document.getElementById("recipe-modal");
  modal.style.display = "block";
}

function saveToStorage() {
  localStorage.setItem(storageKey, JSON.stringify(recipeList, true));
}

function loadFromStorage() {
  const stringData = localStorage.getItem(storageKey);
  if (stringData) {
    return JSON.parse(stringData);
  } else {
    return null;
  }
}

function renderTypes() {
  const types = recipeList.map((item) => item.type);
  const uniqTypes = types.filter((item, index) => {
    return types.indexOf(item) === index;
  });
  const container = document.getElementById("type-filter-container");
  uniqTypes.forEach((item) => {
    const button = document.createElement("button");
    button.innerHTML = item;
    button.classList.add("btn_recipe");

    button.addEventListener("click", () => {
      const findIndex = activeTypeFilter.indexOf(item);
      if (findIndex > -1) {
        activeTypeFilter.splice(findIndex, 1);
        button.classList.remove("btn_selected");
      } else {
        activeTypeFilter.push(item);
        button.classList.add("btn_selected");
      }
    });
    container.appendChild(button);
  });
}

function tabSearch() {} // to be written

function generateData() {
  return [
    {
      id: 1,
      title: "Gløgg",
      type: "Alcoholic Drinks",
      time: 20,
      picture_url:
        "https://images.unsplash.com/photo-1602522785856-8fc84c0f000d?q=80&w=2784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ingredients: [
        { NAME: "Orange zest", AMOUNT: "0.5", UNIT: "piece" },
        { NAME: "Water", AMOUNT: "200", UNIT: "ml" },
        { NAME: "Sugar", AMOUNT: "275", UNIT: "g" },
        { NAME: "Whole cloves", AMOUNT: "5", UNIT: "pieces" },
        { NAME: "Cinnamon sticks", AMOUNT: "2", UNIT: "pieces" },
        { NAME: "Spice", AMOUNT: "1", UNIT: "pinch" },
        { NAME: "Bottle of red wine", AMOUNT: "1", UNIT: "bottle" },
        { NAME: "Raisins", AMOUNT: "100", UNIT: "g" },
        { NAME: "Slipped Almonds", AMOUNT: "50", UNIT: "g" },
      ],
      description: "Mix everything, heat it, and you are good to go!",
    },
    {
      id: 2,
      title: "Pancakes",
      type: "Vegetarian",
      time: 1,
      picture_url:
        "https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ingredients: [
        { NAME: "All-purpose flour", AMOUNT: "200", UNIT: "g" },
        { NAME: "Milk", AMOUNT: "250", UNIT: "ml" },
        { NAME: "Eggs", AMOUNT: "2", UNIT: "pieces" },
        { NAME: "Sugar", AMOUNT: "50", UNIT: "g" },
        { NAME: "Baking powder", AMOUNT: "1", UNIT: "tsp" },
        { NAME: "Butter", AMOUNT: "30", UNIT: "g" },
        { NAME: "Salt", AMOUNT: "1", UNIT: "pinch" },
      ],
      description: "Mix all ingredients, cook in a pan until golden brown.",
    },
    {
      id: 3,
      title: "Tomato Soup",
      type: "Vegetarian",
      time: 40,
      picture_url:
        "https://images.unsplash.com/photo-1620791144170-8a443bf37a33?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ingredients: [
        { NAME: "Tomatoes", AMOUNT: "500", UNIT: "g" },
        { NAME: "Onion", AMOUNT: "1", UNIT: "piece" },
        { NAME: "Garlic", AMOUNT: "2", UNIT: "cloves" },
        { NAME: "Vegetable broth", AMOUNT: "500", UNIT: "ml" },
        { NAME: "Olive oil", AMOUNT: "2", UNIT: "tbsp" },
        { NAME: "Salt", AMOUNT: "1", UNIT: "tsp" },
        { NAME: "Black pepper", AMOUNT: "0.5", UNIT: "tsp" },
      ],
      description: "Blend everything together and simmer for 20 minutes.",
    },
    {
      id: 4,
      title: "Guacamole",
      type: "Vegan",
      time: 10,
      picture_url:
        "https://plus.unsplash.com/premium_photo-1661741106657-cd8c21acec59?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ingredients: [
        { NAME: "Avocados", AMOUNT: "2", UNIT: "pieces" },
        { NAME: "Lime", AMOUNT: "1", UNIT: "piece" },
        { NAME: "Tomato", AMOUNT: "1", UNIT: "piece" },
        { NAME: "Onion", AMOUNT: "1", UNIT: "piece" },
        { NAME: "Cilantro", AMOUNT: "10", UNIT: "g" },
        { NAME: "Salt", AMOUNT: "1", UNIT: "tsp" },
        { NAME: "Jalapeño", AMOUNT: "1", UNIT: "piece" },
      ],
      description: "Mash avocados and mix with the other ingredients.",
    },
    {
      id: 5,
      title: "Spaghetti Carbonara",
      type: "Meat-Based",
      time: 25,
      picture_url:
        "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ingredients: [
        { NAME: "Spaghetti", AMOUNT: "200", UNIT: "g" },
        { NAME: "Egg yolks", AMOUNT: "3", UNIT: "pieces" },
        { NAME: "Parmesan cheese", AMOUNT: "50", UNIT: "g" },
        { NAME: "Pancetta", AMOUNT: "100", UNIT: "g" },
        { NAME: "Black pepper", AMOUNT: "1", UNIT: "tsp" },
        { NAME: "Salt", AMOUNT: "1", UNIT: "tsp" },
      ],
      description:
        "Cook pasta, mix with eggs, cheese, pancetta, and season with pepper.",
    },
    {
      id: 6,
      title: "Chicken Curry",
      type: "Meat-Based",
      time: 45,
      picture_url:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ingredients: [
        { NAME: "Chicken breast", AMOUNT: "500", UNIT: "g" },
        { NAME: "Onion", AMOUNT: "1", UNIT: "piece" },
        { NAME: "Garlic", AMOUNT: "3", UNIT: "cloves" },
        { NAME: "Coconut milk", AMOUNT: "400", UNIT: "ml" },
        { NAME: "Curry powder", AMOUNT: "2", UNIT: "tbsp" },
        { NAME: "Salt", AMOUNT: "1", UNIT: "tsp" },
        { NAME: "Olive oil", AMOUNT: "1", UNIT: "tbsp" },
      ],
      description:
        "Sauté ingredients, add coconut milk, and simmer for 20 min.",
    },
  ];
}

function resetSort() {
  const recipeElement = document.getElementById("recipe");
  recipeElement.dataset.sort = "none";
  const buttonSort = document.getElementById("button-sort");
  buttonSort.innerHTML = '<i class="fa-solid fa-arrows-up-down"></i>';
}

document.addEventListener("DOMContentLoaded", function () {
  const insertRecipeButton = document.getElementById("button-insert");
  insertRecipeButton.addEventListener("click", function () {
    const insertRecipeForm = document.getElementById("recipe-form");
    insertRecipeForm.style.display = "block";
  });

  const sortButton = document.getElementById("button-sort");
  sortButton.addEventListener("click", function () {
    const recipeElement = document.getElementById("recipe");
    const sort = recipeElement.dataset.sort;
    switch (sort) {
      case "none":
        this.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        recipeElement.dataset.sort = "asc";
        searchList = searchList.sort(
          (a, b) => a.ingredients.length - b.ingredients.length
        );
        break;
      case "asc":
        this.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        recipeElement.dataset.sort = "desc";
        searchList = searchList.sort(
          (a, b) => b.ingredients.length - a.ingredients.length
        );
        break;
      case "desc":
        this.innerHTML = '<i class="fa-solid fa-arrows-up-down"></i>';
        recipeElement.dataset.sort = "none";
        searchList = searchList.sort((a, b) => a.id - b.id);
        break;
    }
    renderRecipe();
  });

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    const form = document.getElementById("recipe-form");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    const recipe = convertFormToObject(data);
    recipeList.push(recipe);
    saveToStorage();
    form.reset();
    form.style.display = "none";
    search();
  });

  const closeModalButton = document.getElementById("recipe-modal-close");
  closeModalButton.addEventListener("click", function () {
    const modal = document.getElementById("recipe-modal");
    modal.style.display = "none";
  });

  const closeFormButton = document.getElementById("recipe-form-close");
  closeFormButton.addEventListener("click", function () {
    const form = document.getElementById("recipe-form");
    form.style.display = "none";
  });

  const ingredientAddButton = document.getElementById("button-add-ingredient"); // to be written
  ingredientAddButton.addEventListener("click", function () {
    const index = document.getElementsByClassName("ingredients-item").length;

    const divItem = document.createElement("div");
    divItem.classList.add("ingredients-item");
    divItem.classList.add("grid");
    const inputIngredient = document.createElement("input");
    inputIngredient.setAttribute("placeholder", "Ingredients of your recipe");
    inputIngredient.name = `ingredients${index}`;
    divItem.appendChild(inputIngredient);
    const inputAmount = document.createElement("input");
    inputAmount.setAttribute("placeholder", "Amounts of your recipe");
    inputAmount.name = `amount${index}`;
    divItem.appendChild(inputAmount);
    const inputUnit = document.createElement("select");
    inputUnit.name = `unit${index}`;
    inputUnit.innerHTML = `<option value="">pieces</option>
              <option>g</option>
              <option>kg</option>
              <option>cloves</option>
              <option>tbsp</option>
              <option>tsp</option>
              <option>l</option>
              <option>ml</option>
              <option>pinch</option>
              <option>bottles</option>`;
    divItem.appendChild(inputUnit);
    const divContainer = document.getElementById("ingredients-container");
    divContainer.appendChild(divItem);
  });

  const pageTimerElement = document.getElementById("page-timer");
  setInterval (function(){
    const elapsedTime = new Date().getTime();
    const diffTime = elapsedTime - entryTime;
    const diffTimeMs = convertTimeFromMs(diffTime);
    const diffFormatted = formatTime(diffTimeMs.hours, diffTimeMs.minutes, diffTimeMs.seconds);
    pageTimerElement.textContent = `Your visit elapsed time: ${diffFormatted}`;
  }, 1000) 

  renderTypes();
  renderRecipe();
});
