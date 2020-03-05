import "@babel/polyfill";
import { App } from "./app";
import { WebService } from "./WebService";
import "./style.scss";

let foo = [
  { type: "dir", name: "package.json", url: "www.github.com" },
  { type: "file", name: "index.js", url: "www.github.com" },
  { type: "file", name: "app.js", url: "www.github.com" }
];

let app = new App();
app.updatePage(foo);
