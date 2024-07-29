const question = document.getElementById('question');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const buttons = document.getElementById('buttons');
const gifContainer = document.querySelector('.gif-container');

let noBtnMoved = false;
let interactionCount = 0;

const noPhrases = [
    "Really?", "Think about it!", "Are you sure?", "Pretty please?",
    "Don't be shy!", "Give it a chance!", "You might regret this!",
    "Change of heart?", "Last chance!", "But why not?",
    "Come on, be brave!", "You know you want to!", "Don't make me beg!",
    "Is that your final answer?", "I promise it'll be fun!",
    "You're breaking my heart!", "Just say yes already!",
    "What are you afraid of?", "I'll make it worth your while!",
    "Don't leave me hanging!"
];

yesBtn.addEventListener('click', () => {
    question.textContent = 'Yay!';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    document.body.style.backgroundColor = 'white';
    gifContainer.innerHTML = '<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDRheGVraHJ0cGEzdHFzb2F4eXljYmFvYjBjZXVoeXVvM2Z2ajV4YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/92YG8KKSjYhMc/giphy.gif" alt="Yay GIF">';
});

function handleNoButtonInteraction(event) {
    event.preventDefault();
    interactionCount++;
    if (interactionCount < 5) {
        moveButton();
        changeNoBtnText();
    } else {
        moveOffScreen();
    }
}

noBtn.addEventListener('mouseover', handleNoButtonInteraction);
noBtn.addEventListener('touchstart', handleNoButtonInteraction);
noBtn.addEventListener('click', (event) => {
    event.preventDefault();
    handleNoButtonInteraction(event);
});

function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const padding = 20;
    const newX = Math.random() * (maxX - 2 * padding) + padding;
    const newY = Math.random() * (maxY - 2 * padding) + padding;

    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';

    if (!noBtnMoved) {
        noBtnMoved = true;
        setTimeout(() => noBtn.classList.add('moved'), 50);
    }
}

function moveOffScreen() {
    const offScreenX = window.innerWidth + noBtn.offsetWidth;
    const offScreenY = window.innerHeight + noBtn.offsetHeight;

    noBtn.style.position = 'fixed';
    noBtn.style.left = offScreenX + 'px';
    noBtn.style.top = offScreenY + 'px';
    noBtn.style.transition = 'all 1s ease';
    setTimeout(() => {
        noBtn.style.display = 'none';
    }, 1000);
}

function changeNoBtnText() {
    const randomIndex = Math.floor(Math.random() * noPhrases.length);
    noBtn.textContent = noPhrases[randomIndex];
}

function centerNoButton() {
    if (!noBtnMoved) {
        noBtn.style.position = 'static';
        noBtn.style.left = '';
        noBtn.style.top = '';
    } else {
        moveButton();
    }
}

centerNoButton();
window.addEventListener('resize', centerNoButton);