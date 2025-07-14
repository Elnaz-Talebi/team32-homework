const entryTime = new Date().getTime();

const storageKey = "data";

let recipeList = [];

const activeTypeFilter = [];

let searchList = recipeList ? [...recipeList] : [];

function renderRecipe(listToRender) {
  const recipeSection = document.getElementById("recipe");
  recipeSection.replaceChildren();

  listToRender.forEach((item) => {
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
      return (
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.ingredients.some((ingredients) =>
          ingredients.NAME.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    });
  } else {
    searchList = [...recipeList];
  }
  resetType();
  resetSort();
  renderRecipe(searchList);
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
      p.textContent = `${value.NAME}: ${value.AMOUNT} - ${value.UNIT}`;
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
  const types = recipeList?.map((item) => item.type);
  const uniqTypes = types?.filter((item, index) => {
    return types.indexOf(item) === index;
  });
  const container = document.getElementById("type-filter-container");
  uniqTypes?.forEach((item) => {
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
      filterByType();
    });
    container.appendChild(button);
  });
}

function filterByType() {
  const filteredList = searchList.filter(
    (item) =>
      activeTypeFilter.length === 0 || activeTypeFilter.includes(item.type)
  );
  renderRecipe(filteredList);
}

function resetType() {
  activeTypeFilter.splice(0, activeTypeFilter.length);
  const listOfType = document.querySelectorAll("button.btn_recipe");
  listOfType.forEach((item) => {
    item.classList.remove("btn_selected");
  });
}

async function fetchApiDataAsync() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Elnaz-Talebi/team32-homework/refs/heads/javascript-javascript3-week1/javascript/javascript3/week1/database.json"
    );
    if (response.status === 200) {
      const data = await response.json();
      initData(data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function resetSort() {
  const recipeElement = document.getElementById("recipe");
  recipeElement.dataset.sort = "none";
  const buttonSort = document.getElementById("button-sort");
  buttonSort.innerHTML = '<i class="fa-solid fa-arrows-up-down"></i>';
}

function initData(data) {
  recipeList = data;
  searchList = data;
  renderTypes();
  renderRecipe(searchList);
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
    let sortedList;
    switch (sort) {
      case "none":
        this.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        recipeElement.dataset.sort = "asc";
        sortedList = searchList.sort(
          (a, b) => a.ingredients.length - b.ingredients.length
        );
        break;
      case "asc":
        this.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        recipeElement.dataset.sort = "desc";
        sortedList = searchList.sort(
          (a, b) => b.ingredients.length - a.ingredients.length
        );
        break;
      default:
        this.innerHTML = '<i class="fa-solid fa-arrows-up-down"></i>';
        recipeElement.dataset.sort = "none";
        sortedList = searchList.sort((a, b) => a.id - b.id);
        break;
    }
    renderRecipe(sortedList);
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
    inputIngredient.required = true;
    inputIngredient.setAttribute("placeholder", "Ingredients of your recipe");
    inputIngredient.name = `ingredients${index}`;
    divItem.appendChild(inputIngredient);
    const inputAmount = document.createElement("input");
    inputAmount.required = true;
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
    const removeIngredient = document.createElement("button");
    removeIngredient.innerHTML = '<i class="fa-solid fa-minus"></i>';
    removeIngredient.classList.add("btn-remove");
    divItem.appendChild(removeIngredient);
    removeIngredient.addEventListener("click", function () {
      divItem.removeChild(removeIngredient);
      divItem.removeChild(inputUnit);
      divItem.removeChild(inputAmount);
      divItem.removeChild(inputIngredient);
    });

    const divContainer = document.getElementById("ingredients-container");
    divContainer.appendChild(divItem);
  });

  const pageTimerElement = document.getElementById("page-timer");
  setInterval(function () {
    const elapsedTime = new Date().getTime();
    const diffTime = elapsedTime - entryTime;
    const diffTimeMs = convertTimeFromMs(diffTime);
    const diffFormatted = formatTime(
      diffTimeMs.hours,
      diffTimeMs.minutes,
      diffTimeMs.seconds
    );
    pageTimerElement.textContent = `Your visit elapsed time: ${diffFormatted}`;
  }, 1000);

  const localData = loadFromStorage();
  if (localData) {
    initData(localData);
  } else {
    fetchApiDataAsync();
  }

  const hamburger = document.querySelector(".hamburger-bar");
  const menu = document.querySelector(".menu");
  const items = document.querySelectorAll(".item");
  function adjustMenu() {
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
      hamburger.querySelector("span").innerHTML = "<i class='fas fa-bars'></i>";
    } else {
      menu.classList.add("active");
      hamburger.querySelector("span").innerHTML =
        "<i class='fas fa-times'></i>";
    }
  }
  hamburger.addEventListener("click", adjustMenu);
  for (let item of items) {
    item.addEventListener("click", adjustMenu);
  }
});
