const colors = ['red', 'green', 'blue', 'black', 'pink'];
const addButton = () => {
    const container = document.querySelector('#container');
    const button = document.createElement('button');

    button.innerText = 'Click me bro';
    button.onclick = () => {
        button.style.color = colors[Math.round(Math.random() * (colors.length - 1))];
        
    }
    // console.log(button);
    container.append(button);
}


export default addButton;