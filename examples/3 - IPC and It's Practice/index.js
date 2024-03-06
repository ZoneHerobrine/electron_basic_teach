// const { ChildAPI } = window

const simpleBtn = document.getElementById('simple');
const complexBtn = document.getElementById('complex');

simpleBtn.addEventListener('click', () => {
    window.ChildAPI.SimpleInvoke();
});