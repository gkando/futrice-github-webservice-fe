import { App } from "./app";
const fetch = require("node-fetch");

export function WebService(args) {
  const init = () => {
    // console.log(app);
    // const app = args;
    return this;
  };
  // this.get = async endpoint => {
  //   const url = `http://localhost:3300${endpoint}`;
  //   fetch(url, {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       "accept-language": "en-US,en;q=0.9"
  //     }
  //   })
  //     .then(r => r.json())
  //     .then(result => {
  //       console.log(result);
  //     });
  // };
  this.get = async (endpoint, query) => {
    const url = `https://futrice-github-webservice.herokuapp.com${endpoint}`;
    // let url = new URL(`http://localhost:3300${endpoint}`);
    url.search = new URLSearchParams(query).toString();
    var req = {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "accept-language": "en-US,en;q=0.9"
      }
    };
    fetch(url, req)
      .then(r => r.json())
      .then(result => {
        if (query.type == "file") {
          app.updateDependencies(result, app.toggleLoader);
        } else {
          app.updatePage(result.contents, app.toggleLoader);
        }
      })
      .catch(err => console.log(err));
  };
  const app = args;
  init(args);
}
