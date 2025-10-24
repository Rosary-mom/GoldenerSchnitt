// script.js – Erweiterte Simulationen mit spiralförmigem Labyrinth für liturgischen Weg

const canvas = document.getElementById('labyrinthCanvas');
const ctx = canvas.getContext('2d');
const output = document.getElementById('output');
const visualization = document.getElementById('visualization');

function showCanvas() {
    visualization.style.display = 'none';
    canvas.style.display = 'block';
}

function drawLabyrinth(isSpiral = false) {
    showCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (isSpiral) {
        drawSpiralLabyrinth(); // Für liturgischen Weg: Vollständiger Hügel-Pfad
    } else {
        // Einfaches Rechteck-Labyrinth (für andere Buttons)
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(550, 50);
        ctx.lineTo(550, 350);
        ctx.lineTo(50, 350);
        ctx.closePath();
        ctx.stroke();
        ctx.moveTo(100, 100);
        ctx.lineTo(500, 100);
        ctx.lineTo(500, 300);
        ctx.stroke();
        const phi = (1 + Math.sqrt(5)) / 2;
        const split = canvas.width / phi;
        ctx.fillStyle = 'gold';
        ctx.fillRect(split, 150, 50, 50);
    }
}

function drawSpiralLabyrinth(circles = 7) { // 7 Kreise für klassisches/druidisches Design
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radiusStep = 20; // Abstand zwischen Kreisen
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    // Zeichne spiralförmigen Pfad (Hügel von oben: Spirale zum Zentrum)
    for (let i = 1; i <= circles; i++) {
        const radius = i * radiusStep;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); // Vollkreis
        ctx.stroke();

        // Abzweigungen hinzufügen (wie in salomonischen Designs)
        if (i % 2 === 0) {
            ctx.beginPath();
            ctx.moveTo(centerX + radius, centerY);
            ctx.lineTo(centerX + radius + 30, centerY + 30); // Kurze Abzweigung
            ctx.stroke();
        }
    }

    // Zentraler "Gipfel" (Hügelspitze)
    ctx.fillStyle = 'green'; // Hügel-Farbe
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fill();

    // Goldene Gaben entlang des Pfads platzieren (Gamifizierung)
    const phi = (1 + Math.sqrt(5)) / 2;
    for (let i = 1; i <= 5; i++) { // 5 Gaben
        const angle = (i * phi) * Math.PI * 2; // Golden Schnitt für Platzierung
        const r = (circles / 2) * radiusStep;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Erklärungstext auf Canvas (für Lehre)
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText('Ritueller Prozessionsweg (Spirale zum Gipfel)', 10, 20);
}

function extendModel() {
    let lucas = [2, 1];
    for (let i = 2; i < 10; i++) {
        lucas[i] = lucas[i-1] + lucas[i-2];
    }
    output.innerHTML = `Erweiterte Lucas-Folge: ${lucas.join(', ')}<br>Verwendet für Pyramiden-Wachstum.`;
    drawLabyrinth(); // Einfaches Labyrinth
}

function simulateEvent() {
    const phi = (1 + Math.sqrt(5)) / 2;
    const randomEvent = Math.random() * phi;
    const points = Math.floor(randomEvent * 10);
    output.innerHTML = `Simuliertes Event: Wert ${randomEvent.toFixed(3)} (basierend auf φ).<br>Gesammelte Punkte: ${points} Gaben.`;
    drawLabyrinth();
}

function liturgicalPath() {
    const paths = ['Linker Weg (Fibonacci-Spirale)', 'Rechter Weg (Lucas-Kreise)', 'Zentraler Pfad (Golden Schnitt-Abzweigungen)'];
    const chosen = paths[Math.floor(Math.random() * paths.length)];
    output.innerHTML = `Liturgischer Weg: ${chosen}<br>Der gesamte Prozessionsweg auf dem Hügel, inspiriert von salomonischen und druidischen Designs (z.B. 7-Kreis-Spirale). Sammle Gaben entlang des Pfads für spirituelle Reflexion.`;
    drawLabyrinth(true); // Spiralförmiges Labyrinth aktivieren
}

function downloadSVG() {
    const svg = `<svg width="${canvas.width}" height="${canvas.height}"><rect x="0" y="0" width="100%" height="100%" fill="white"/></svg>`; // Erweitere für realen Export
    download('labyrinth.svg', 'image/svg+xml', svg);
}

function downloadSTL() {
    alert('STL-Download: Implementiere mit Three.js für 3D-Modelle (z.B. Hügel mit Labyrinth-Pfad).');
}

function download(filename, mime, data) {
    const element = document.createElement('a');
    element.setAttribute('href', `data:${mime};charset=utf-8,${encodeURIComponent(data)}`);
    element.setAttribute('download', filename);
    element.click();
}

window.addEventListener('load', () => {
    // Optional: Initiales Zeichnen
});
