const recipeList = [
  {
    id: 1,
    title: "Gløgg",
    picture_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
    ingredients: [
      { NAME: "Orange zest", AMOUNT: "0.5" },
      { NAME: "Water", AMOUNT: "200 ml" },
      { NAME: "Sugar", AMOUNT: "275 g" },
      { NAME: "Whole cloves", AMOUNT: "5" },
      { NAME: "Cinnamon sticks", AMOUNT: "2" },
      { NAME: "Spice", AMOUNT: undefined },
      { NAME: "Bottle of red wine", AMOUNT: "1" },
      { NAME: "Raisins", AMOUNT: "100 g" },
      { NAME: "Slipped Almonds", AMOUNT: "50 g" },
    ],
    description: "Mix everything, heat it, and you are good to go!",
  },
];

let ingredientCount = 5;

let insertButton = document.getElementById("button-insert");
insertButton.addEventListener("click", function () {
  let insertForm = document.getElementById("recipe-form");
  insertForm.style.display = "block";
});

function renderRecipe() {
  let secRecipe = document.getElementById("recipe");
  secRecipe.replaceChildren();

  recipeList.forEach((item) => {
    let parent = document.createElement("div");

    let h1 = document.createElement("h1");
    h1.innerHTML = item.title;
    parent.appendChild(h1);

    let img = document.createElement("img");
    img.src = item.picture_url;
    parent.appendChild(img);

    let p = document.createElement("p");
    p.innerHTML = item.description;
    parent.appendChild(p);

    let ingDiv = document.createElement("div");
    item.ingredients.forEach((value) => {
        if(value?.NAME){
            let p = document.createElement("p");
            p.innerHTML = `${value.NAME}: ${value.AMOUNT}`;
            ingDiv.appendChild(p);
        }
    });
    parent.appendChild(ingDiv);

    secRecipe.appendChild(parent);
  });
}

renderRecipe();

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  let form = document.getElementById("recipe-form");
  const data = Object.fromEntries(new FormData(form));
  const recipe = convertFormToObject(data);
  recipeList.push(recipe);
  renderRecipe();
});

function convertFormToObject(formData) {
  const result = {
    id: recipeList.length + 1,
    title: formData.title,
    picture_url: formData["picture-url"],
    ingredients: [],
    description: formData.description,
  };

  for (let i = 0; i < ingredientCount; i++) {
    const object = {
      NAME: formData[`ingredients${i}`],
      AMOUNT: formData[`amount${i}`],
    };
    result.ingredients.push(object);
  }

  return result;
}
