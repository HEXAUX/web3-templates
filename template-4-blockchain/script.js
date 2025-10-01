// Blockchain Data
let blockchain = [];
let blockCount = 0;

// Generate random hash
function generateHash() {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
}

// Create a new block
function createBlock(previousHash = '0x0') {
    blockCount++;
    return {
        number: blockCount,
        timestamp: new Date().toISOString(),
        hash: generateHash(),
        previousHash: previousHash,
        transactions: Math.floor(Math.random() * 50) + 1
    };
}

// Render block in UI
function renderBlock(block) {
    const blockElement = document.createElement('div');
    blockElement.className = 'block';
    blockElement.innerHTML = `
        <div class="block-header">Block #${block.number}</div>
        <div class="block-number">#${block.number}</div>
        <div class="block-hash">${block.hash.substring(0, 16)}...</div>
        <div style="margin-top: 10px; font-size: 0.8rem;">
            <div>Txs: ${block.transactions}</div>
        </div>
    `;
    return blockElement;
}

// Add new block to chain
function addNewBlock() {
    const previousHash = blockchain.length > 0
        ? blockchain[blockchain.length - 1].hash
        : '0x0';

    const newBlock = createBlock(previousHash);
    blockchain.push(newBlock);

    const container = document.getElementById('chainContainer');
    const blockElement = renderBlock(newBlock);
    container.appendChild(blockElement);

    // Auto scroll to new block
    container.scrollLeft = container.scrollWidth;

    // Update latest block info
    updateLatestBlockInfo(newBlock);

    // Update stats
    updateStats();

    // Add random transaction
    addRandomTransaction();
}

// Update latest block information
function updateLatestBlockInfo(block) {
    const latestBlockDiv = document.getElementById('latestBlock');
    latestBlockDiv.innerHTML = `
        <div class="info-row">
            <span class="label">Block #:</span>
            <span class="value">${block.number}</span>
        </div>
        <div class="info-row">
            <span class="label">Hash:</span>
            <span class="value hash">${block.hash.substring(0, 20)}...</span>
        </div>
        <div class="info-row">
            <span class="label">Timestamp:</span>
            <span class="value">${new Date(block.timestamp).toLocaleTimeString()}</span>
        </div>
        <div class="info-row">
            <span class="label">Transactions:</span>
            <span class="value">${block.transactions}</span>
        </div>
    `;
}

// Counter animation
function animateCounter(id, target) {
    const element = document.getElementById(id);
    const duration = 1000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = id === 'marketCap' ? `$${target.toLocaleString()}` : Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = id === 'marketCap' ? `$${Math.floor(current).toLocaleString()}` : Math.floor(current);
        }
    }, 16);
}

// Update network statistics
function updateStats() {
    animateCounter('totalBlocks', blockchain.length);
    animateCounter('tps', Math.floor(Math.random() * 1000) + 500);
    animateCounter('activeNodes', Math.floor(Math.random() * 500) + 1000);
    animateCounter('marketCap', Math.floor(Math.random() * 1000000000) + 5000000000);
}

// Generate random wallet address
function generateAddress() {
    const chars = '0123456789abcdefABCDEF';
    let address = '0x';
    for (let i = 0; i < 4; i++) {
        address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    address += '...';
    for (let i = 0; i < 4; i++) {
        address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address;
}

// Add random transaction
function addRandomTransaction() {
    const txList = document.getElementById('transactionsList');
    const txItem = document.createElement('div');
    txItem.className = 'transaction-item';
    txItem.style.opacity = '0';

    const amount = (Math.random() * 10).toFixed(4);
    txItem.innerHTML = `
        <div class="tx-from">${generateAddress()}</div>
        <div class="tx-arrow">→</div>
        <div class="tx-to">${generateAddress()}</div>
        <div class="tx-amount">${amount} ETH</div>
    `;

    // Remove oldest if too many
    if (txList.children.length >= 8) {
        txList.removeChild(txList.lastChild);
    }

    txList.insertBefore(txItem, txList.firstChild);

    // Fade in animation
    setTimeout(() => {
        txItem.style.transition = 'opacity 0.5s';
        txItem.style.opacity = '1';
    }, 10);
}

// Activity Chart
function drawActivityChart() {
    const canvas = document.getElementById('activityChart');
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const bars = 20;
    const barWidth = canvas.width / bars;
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < bars; i++) {
            const height = Math.random() * canvas.height * 0.8 + 20;
            ctx.fillStyle = gradient;
            ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height);
        }
    }

    draw();
    setInterval(draw, 2000);
}

// Auto-generate blocks periodically
function autoGenerateBlocks() {
    setInterval(() => {
        if (Math.random() > 0.6) {
            addNewBlock();
        }
    }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Create genesis block
    addNewBlock();

    // Add initial blocks
    for (let i = 0; i < 3; i++) {
        setTimeout(() => addNewBlock(), (i + 1) * 500);
    }

    // Draw activity chart
    setTimeout(() => {
        drawActivityChart();
    }, 500);

    // Start auto-generation
    autoGenerateBlocks();

    // Initial stats
    updateStats();
});

// Random transaction generator
setInterval(() => {
    if (Math.random() > 0.5) {
        addRandomTransaction();
    }
}, 3000);
