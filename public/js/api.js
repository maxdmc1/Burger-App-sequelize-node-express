// The API object contains methods for each kind of request we'll make
export default {
  saveBurger: function(burger) {
    return fetch("/api/burgers", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(burger)
    }).then(res => res.json());
  },
  getBurgers: function() {
    return fetch("/api/burgers").then(res => res.json());
  },
  getBurger: function(id) {
    return fetch(`/api/burgers/${id}`).then(res => res.json());
  },
  updateBurger: function(id) {
    return fetch("/api/burgers/" + id, {
      method: "PUT"
    }).then(res => res.json);
  }
};
