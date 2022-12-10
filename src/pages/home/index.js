function render() {
  const element = document.createElement("div");

  element.innerHTML = "hello home";

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
