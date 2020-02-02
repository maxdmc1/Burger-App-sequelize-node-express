import API from "/js/api.js";

// Get references to page elements
const burgerTextEl = document.getElementById("burger-text");
const createBtnEl = document.getElementById("create");
const burgerListEl = document.getElementById("burger-list");
const eatenBurgerListEl = document.getElementById("eaten-burger-list");

// refreshBurgers gets new burgers from the db and repopulates the list
const refreshBurgers = function() {
  API.getBurgers().then(function(data) {
    burgerListEl.innerHTML = "";
    eatenBurgerListEl.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      if (!data[i].isEaten) {
        const aEl = document.createElement("a");
        aEl.innerHTML = data[i].text;

        const liEl = document.createElement("li");
        liEl.classList.add("list-group-item");
        liEl.setAttribute("data-id", data[i].id);
        liEl.append(aEl);

        const buttonEl = document.createElement("button");
        buttonEl.classList.add("btn", "btn-danger", "float-right", "eat");
        buttonEl.innerHTML = "EAT!!";
        buttonEl.addEventListener("click", handleEatBtnClick);

        liEl.append(buttonEl);
        burgerListEl.append(liEl);
      } else {
        const aEl = document.createElement("a");
        aEl.innerHTML = data[i].text;

        const liEl = document.createElement("li");
        liEl.classList.add("list-group-item");
        liEl.setAttribute("data-id", data[i].id);
        liEl.append(aEl);

        eatenBurgerListEl.append(liEl);
      }
    }
  });
};
refreshBurgers();

// handleFormCreate is called whenever we submit a new example
// Save the new burger to the db and refresh the list
const handleFormCreate = function(event) {
  event.preventDefault();

  const burger = {
    text: burgerTextEl.value.trim()
  };

  if (!burger.text) {
    alert("You must enter a name of a burger!");
    return;
  }

  API.saveBurger(burger).then(function() {
    refreshBurgers();
  });

  burgerTextEl.value = "";
};

const handleEatBtnClick = function(event) {
  const idToEat = event.target.parentElement.getAttribute("data-id");
  API.updateBurger(idToEat).then(function() {
    console.log(idToEat);
    refreshBurgers();
  });
};

// Add event listeners to the submit and eat buttons
createBtnEl.addEventListener("click", handleFormCreate);
