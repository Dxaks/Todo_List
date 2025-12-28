export const clearDiv = (containerToClear) => {
    const container = document.querySelector(containerToClear);
    container.innerHTML = '';
}

export const errorLogger = (div, comment) => {
    const container = document.querySelector(div);
    const para = document.createElement('p');
    para.textContent = '';
    para.textContent = comment;
    container.appendChild(para)
};