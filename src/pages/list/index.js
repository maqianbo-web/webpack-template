function render() {
    const element = document.createElement('div');

    element.innerHTML = 'hello list';

    document.body.appendChild(element);
}
const promise = new Promise((resolve, reject) => {
    resolve(1);
});
render();
