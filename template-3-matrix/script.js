// Matrix Rain Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = Math.random() * canvas.height / fontSize;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}

setInterval(draw, 30);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Counter Animation
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
    });
});

// Command Input Handler
const commandInput = document.querySelector('.command-input');
const commandOutput = document.querySelector('.command-output');

commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = commandInput.value.trim();
        if (command) {
            processCommand(command);
            commandInput.value = '';
        }
    }
});

function processCommand(cmd) {
    const line = document.createElement('p');
    line.className = 'output-line';

    switch(cmd.toLowerCase()) {
        case 'help':
            line.innerHTML = '> Available commands: help, status, hack, clear, disconnect';
            break;
        case 'status':
            line.innerHTML = '> All systems operational. Network: ONLINE';
            line.className = 'output-line success';
            break;
        case 'hack':
            hackEffect();
            return;
        case 'clear':
            clearTerminal();
            return;
        case 'disconnect':
            disconnectEffect();
            return;
        default:
            line.innerHTML = `> Command not found: ${cmd}`;
            line.style.color = '#f00';
    }

    commandOutput.appendChild(line);
    commandOutput.scrollTop = commandOutput.scrollHeight;
}

// Button Actions
function hackEffect() {
    const output = document.querySelector('.command-output');
    const messages = [
        'Initializing hack sequence...',
        'Scanning network ports...',
        'Bypassing firewall...',
        'Accessing mainframe...',
        'Decrypting data...',
        'Download complete!',
        'Connection terminated.'
    ];

    messages.forEach((msg, index) => {
        setTimeout(() => {
            const line = document.createElement('p');
            line.className = 'output-line';
            line.textContent = `> ${msg}`;
            if (index === messages.length - 1) {
                line.className = 'output-line success';
            }
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
        }, index * 600);
    });
}

function clearTerminal() {
    const output = document.querySelector('.command-output');
    output.innerHTML = `
        <p class="output-line">> System Status: Operational</p>
        <p class="output-line">> Firewall: Active</p>
        <p class="output-line">> Encryption: Enabled</p>
        <p class="output-line success">> Ready for input...</p>
    `;
}

function disconnectEffect() {
    const output = document.querySelector('.command-output');
    const line = document.createElement('p');
    line.className = 'output-line';
    line.style.color = '#f00';
    line.textContent = '> DISCONNECTING FROM MATRIX...';
    output.appendChild(line);

    setTimeout(() => {
        const line2 = document.createElement('p');
        line2.className = 'output-line success';
        line2.textContent = '> Connection closed. Goodbye.';
        output.appendChild(line2);
        output.scrollTop = output.scrollHeight;
    }, 1000);
}

// Random system messages
function addRandomMessage() {
    const messages = [
        'Packet received from node 0x7f3b...',
        'New block validated: #892341',
        'Mining reward: 0.00234 BTC',
        'Network latency: 23ms',
        'Peer connected: 192.168.1.105'
    ];

    setInterval(() => {
        if (Math.random() > 0.7) {
            const output = document.querySelector('.command-output');
            const line = document.createElement('p');
            line.className = 'output-line';
            line.textContent = `> ${messages[Math.floor(Math.random() * messages.length)]}`;
            output.appendChild(line);

            if (output.children.length > 10) {
                output.removeChild(output.firstChild);
            }

            output.scrollTop = output.scrollHeight;
        }
    }, 5000);
}

addRandomMessage();
