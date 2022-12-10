import "./index.less";

function render() {
  const element = document.createElement("div");
  const span = document.createElement("span");

  element.innerHTML = "hello home";
  span.innerHTML = "hello span";
  element.appendChild(span);

  document.body.appendChild(element);
}
render();

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11111);
  }, 1000);
});

promise.then((data) => {
  console.log("data", data);
});
