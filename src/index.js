const fetch = require("node-fetch");

document.addEventListener("click", function(e) {
  e.preventDefault();
  if (e.target.tagName == "A") {
    console.log(e.target.dataset.url);
  }
  if (e.target.tagName == "INPUT") {
    console.log(e.target.value);
  }
  if (e.target.tagName == "BUTTON") {
    var query = document.getElementById("repo-url").value;
    webService.post("/service/repo", query);
  }
});

const webService = {
  get: async endpoint => {
    const url = `http://localhost:3300${endpoint}`;
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9"
      }
    })
      .then(r => r.json())
      .then(result => {
        console.log(result);
      });
  },
  post: async (endpoint, query) => {
    const url = `https://futrice-github-webservice.herokuapp.com${endpoint}`;
    // const url = `http://localhost:3300${endpoint}`;
    var req = {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "accept-language": "en-US,en;q=0.9"
      },
      body: JSON.stringify({
        url: query
      })
    };
    console.log(req);
    fetch(url, req)
      .then(r => r.json())
      .then(result => {
        console.log(result.contents);
        updatePage(result.contents);
      })
      .catch(err => console.log(err));
  }
};

webService.get("/");
const updatePage = data => {
  // var tbl = document.getElementById("results");
  // var newEl = document.createElement("table");
  // newEl.id = "results";

  var newEl = data.map(item => {
    var el = document.createElement("tr");
    var li = `<td><input type='checkbox' value=${item.download_url}></td><td><a class='link' href='#' data-url='${item.url}'>${item.name}</a></td><td>${item.type}</td>`;
    el.innerHTML = li;
    document.getElementById("results-body").appendChild(el);
  });
  // document.getElementById("results").innerHTML = newEl;

  // document.getElementById("results").parentNode.replaceChild(newEl, oldEl);
  return;
};
