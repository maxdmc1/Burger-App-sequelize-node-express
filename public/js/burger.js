import API from "/js/api.js";

// Get references to page elements
const burgerTextEl = document.getElementById("burger-text");

// refreshBurger gets new burgers from the db and repopulates the list
const refreshBurger = function() {
  // get the id to query from the url
  const search = window.location.search.substring(1);
  const params = new URLSearchParams(search);
  const id = params.get("id"); // "foo"

  API.getBurger(id).then(function(data) {
    burgerTextEl.innerHTML = data.text;
  });
};
refreshBurger();
