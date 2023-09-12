import App from "./app.js";
const app = new App();

window.addEventListener("load", () => {
  app.init();
  app.render();
});
