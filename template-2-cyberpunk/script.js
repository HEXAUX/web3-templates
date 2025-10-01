// Random number animation for balance
function animateNumber() {
    const numberElement = document.querySelector('.neon-number');
    if (!numberElement) return;

    setInterval(() => {
        const currentValue = parseFloat(numberElement.textContent);
        const change = (Math.random() - 0.5) * 0.1;
        const newValue = (currentValue + change).toFixed(3);
        numberElement.textContent = newValue;
    }, 3000);
}

// Random transaction hash generator
function generateTxHash() {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 4; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash + '...';
}

// Add random transactions
function addRandomTransaction() {
    const txList = document.querySelector('.transaction-list');
    if (!txList) return;

    setInterval(() => {
        const txItem = document.createElement('div');
        txItem.className = 'tx-item';
        txItem.style.opacity = '0';
        txItem.innerHTML = `
            <span class="tx-hash">${generateTxHash()}</span>
            <span class="tx-status pending">PENDING</span>
        `;

        if (txList.children.length >= 5) {
            txList.removeChild(txList.lastChild);
        }

        txList.insertBefore(txItem, txList.firstChild);

        // Fade in animation
        setTimeout(() => {
            txItem.style.transition = 'opacity 0.5s';
            txItem.style.opacity = '1';
        }, 10);

        // Confirm transaction after random delay
        setTimeout(() => {
            const status = txItem.querySelector('.tx-status');
            status.textContent = 'CONFIRMED';
            status.className = 'tx-status success';
        }, Math.random() * 5000 + 2000);
    }, 8000);
}

// Glitch effect on title
function glitchEffect() {
    const title = document.querySelector('.neon-text');
    if (!title) return;

    setInterval(() => {
        if (Math.random() > 0.9) {
            const originalText = title.getAttribute('data-text');
            title.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;

            setTimeout(() => {
                title.style.transform = 'translate(0, 0)';
            }, 100);
        }
    }, 500);
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    animateNumber();
    addRandomTransaction();
    glitchEffect();
});
