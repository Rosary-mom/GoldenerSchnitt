// script.js – Interaktive Simulationen für Labyrinth und Goldenen Schnitt

const canvas = document.getElementById('labyrinthCanvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
const visualization = document.getElementById('visualization');

function showCanvas() {
    visualization.style.display = 'none';
    canvas.style.display = 'block';
}

function drawLabyrinth() {
    showCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Einfaches Labyrinth zeichnen (erweitere für komplexere Formen)
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(550, 50);
    ctx.lineTo(550, 350);
    ctx.lineTo(50, 350);
    ctx.closePath();
    ctx.stroke();
    // Innere Pfade
    ctx.moveTo(100, 100);
    ctx.lineTo(500, 100);
    ctx.lineTo(500, 300);
    ctx.stroke();
    // Goldener Schnitt anwenden: Teile in φ-Verhältnis
    const phi = (1 + Math.sqrt(5)) / 2;
    const split = canvas.width / phi;
    ctx.fillStyle = 'gold';
    ctx.fillRect(split, 150, 50, 50); // "Gabe" als goldener Punkt
}

function extendModel() {
    // Lucas-Folge berechnen
    let lucas = [2, 1];
    for (let i = 2; i < 10; i++) {
        lucas[i] = lucas[i-1] + lucas[i-2];
    }
    output.innerHTML = `Erweiterte Lucas-Folge: ${lucas.join(', ')}<br>Verwendet für Pyramiden-Wachstum.`;
    drawLabyrinth();
}

function simulateEvent() {
    const phi = (1 + Math.sqrt(5)) / 2;
    const randomEvent = Math.random() * phi;
    const points = Math.floor(randomEvent * 10);
    output.innerHTML = `Simuliertes Event: Wert ${randomEvent.toFixed(3)} (basierend auf φ).<br>Gesammelte Punkte: ${points} Gaben.`;
    drawLabyrinth();
}

function liturgicalPath() {
    const paths = ['Linker Weg (Fibonacci)', 'Rechter Weg (Lucas)', 'Zentraler Pfad (Golden Schnitt)'];
    const chosen = paths[Math.floor(Math.random() * paths.length)];
    output.innerHTML = `Liturgischer Weg: ${chosen}<br>Erklärt Abzweigungen für spirituelle Reflexion.`;
    drawLabyrinth();
}

function downloadSVG() {
    // Placeholder für SVG-Export (erweitere bei Bedarf)
    const svg = `<svg width="${canvas.width}" height="${canvas.height}"><rect x="0" y="0" width="100%" height="100%" fill="white"/></svg>`;
    download('labyrinth.svg', 'image/svg+xml', svg);
}

function downloadSTL() {
    // Placeholder für 3D-Export (integriere Three.js für echte Funktionalität)
    alert('STL-Download: Implementiere mit Three.js für 3D-Modelle.');
}

function download(filename, mime, data) {
    const element = document.createElement('a');
    element.setAttribute('href', `data:${mime};charset=utf-8,${encodeURIComponent(data)}`);
    element.setAttribute('download', filename);
    element.click();
}

// Initialisiere bei Laden (optional)
window.addEventListener('load', () => {
    // drawLabyrinth(); // Zeichne initial, falls gewünscht
});
