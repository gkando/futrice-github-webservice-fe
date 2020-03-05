import { WebService } from "./WebService";
import dirIcon from "./dir.svg";
import fileIcon from "./file.svg";

export function App() {
  const init = () => {
    addListeners();
    console.log("init");
    return this;
  };
  const addListeners = () => {
    document.addEventListener("click", function(e) {
      e.preventDefault();
      if (e.target.className == "js-navigation-open") {
        if (e.target.dataset.type == "dir") {
          let query = {};
          query.url = e.target.dataset.url;
          api.post("/service/repo", query);
        }
        if (e.target.dataset.type == "file") {
          let query = {};
          query.url = e.target.dataset.url;
          query.type = e.target.dataset.type;
          api.post("/service/contents", query);
        }
      }
      if (e.target.tagName == "INPUT") {
        console.log(e.target.value);
      }
      if (e.target.tagName == "BUTTON") {
        let query = {};
        query.url = document.getElementById("repo-url").value;
        console.log(query);
        api.post("/service/repo", query);
      }
    });
  };

  const toggleLoader = () => {
    document.getElementById("loader").classList.toggle("hide");
    document.getElementById("results").classList.toggle("hide");
  };

  const iconTemplate = item =>
    `<td class="icon"><img src='${
      item.type == "dir" ? dirIcon : fileIcon
    }'></td>`;

  const dependencyTemplate = item =>
    `<td class="content"><span> ${item}</span></td>`;

  const contentTemplate = item =>
    `<td class="content"> <span> <a class="js-navigation-open" title="${item.name}" data-url="${item.url}" data-type=${item.type} href="#">${item.name}</a></span></td>`;

  const msgTemplate = item =>
    `<td class="message"><span><a title="foo" class="link-gray" href="#">foo</a></span></td>`;

  const rowTemplate = item =>
    iconTemplate(item) + contentTemplate(item) + msgTemplate(item);

  this.updateDependencies = (data, callback) => {
    var fragment = document.createDocumentFragment();
    console.log("UpdateDependencies:  ", data);
    data.map(item => {
      var child = document.createElement("tr");
      child.innerHTML = dependencyTemplate(item);
      fragment.appendChild(child);
    });

    document.querySelector("tbody").innerHTML = "";
    document.querySelector("tbody").appendChild(fragment);
    if (callback) callback();
  };

  this.updatePage = (data, callback) => {
    var fragment = document.createDocumentFragment();
    data.map(item => {
      var child = document.createElement("tr");
      child.innerHTML = rowTemplate(item);
      fragment.appendChild(child);
    });
    document.querySelector("tbody").innerHTML = "";
    document.querySelector("tbody").appendChild(fragment);
    if (callback) callback();
  };
  const api = new WebService(this);
  init();
}
