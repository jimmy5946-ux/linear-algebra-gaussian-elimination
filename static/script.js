const sizeInput = document.querySelector("#size");
const matrixBody = document.querySelector("#matrix-body");
const form = document.querySelector("#matrix-form");
const hiddenMatrix = document.querySelector("#matrix");
const resizeButton = document.querySelector("#resize-btn");
const sampleButton = document.querySelector("#sample-btn");

const sample = [
    [2, 1, -1, 8],
    [-3, -1, 2, -11],
    [-2, 1, 2, -3],
];

function clampSize(value) {
    const n = Number.parseInt(value, 10);
    if (Number.isNaN(n)) return 3;
    return Math.min(10, Math.max(2, n));
}

function buildGrid(values = null) {
    const n = clampSize(sizeInput.value);
    sizeInput.value = n;
    matrixBody.innerHTML = "";

    for (let row = 0; row < n; row += 1) {
        const tr = document.createElement("tr");

        for (let col = 0; col <= n; col += 1) {
            if (col === n) {
                const separator = document.createElement("td");
                separator.className = "separator";
                separator.textContent = "=";
                tr.appendChild(separator);
            }

            const td = document.createElement("td");
            const input = document.createElement("input");
            input.className = "matrix-input";
            input.type = "number";
            input.step = "any";
            input.name = `cell-${row}-${col}`;
            input.value = values?.[row]?.[col] ?? "";
            input.placeholder = col === n ? `b${row + 1}` : `x${col + 1}`;
            td.appendChild(input);
            tr.appendChild(td);
        }

        matrixBody.appendChild(tr);
    }
}

function serializeMatrix() {
    const n = clampSize(sizeInput.value);
    const rows = [String(n)];

    for (let row = 0; row < n; row += 1) {
        const values = [];
        for (let col = 0; col <= n; col += 1) {
            const input = document.querySelector(`[name="cell-${row}-${col}"]`);
            values.push(input.value.trim() || "0");
        }
        rows.push(values.join(" "));
    }

    hiddenMatrix.value = rows.join("\n");
}

resizeButton.addEventListener("click", () => buildGrid());

sampleButton.addEventListener("click", () => {
    sizeInput.value = 3;
    buildGrid(sample);
});

form.addEventListener("submit", serializeMatrix);

buildGrid(sample);