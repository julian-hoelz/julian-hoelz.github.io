// function handleResize(): void {
//     const computedStyle = getComputedStyle(canvas);
//     const cssWidth = parseInt(computedStyle.width);
//     const cssHeight = parseInt(computedStyle.height);
//     canvas.width = cssWidth;
//     canvas.height = cssHeight;
//     renderGrid();
// }

// function handleMouseMove(event: MouseEvent): void {
//     if (!(event.buttons & 1))
//         return;
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left - viewX;
//     const mouseY = event.clientY - rect.top - viewY;
//     drawOrEraseOnGrid(mouseX, mouseY);
// }

// function handleMouseDown(event: MouseEvent): void {
//     if (event.button != 0)
//         return;
//     const cellSize = parseInt(cellSizeInput.value);
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left - viewX;
//     const mouseY = event.clientY - rect.top - viewY;
//     const x = Math.floor(mouseX / (cellSize + 1));
//     const y = Math.floor(mouseY / (cellSize + 1));
//     drawMode = !grid[y][x];
//     drawOrEraseOnGrid(mouseX, mouseY);
// }

// function drawOrEraseOnGrid(mouseX: number, mouseY: number) {
//     const cellSize = parseInt(cellSizeInput.value);
//     if (mouseX % (cellSize + 1) == 0 || mouseY % (cellSize + 1) == 0)
//         return;
//     const x = Math.floor(mouseX / (cellSize + 1));
//     const y = Math.floor(mouseY / (cellSize + 1));
//     grid[y][x] = drawMode;
//     renderGrid();
// }

// function onCellSizeInput(render: boolean): void {
//     const cellSize = cellSizeInput.value;
//     cellSizeValue.textContent = cellSize;
//     if (render)
//         renderGrid();
// }

// function renderGrid(): void {
//     if (ctx == null)
//         return;
//     const cellSize = parseInt(cellSizeInput.value);
//     ctx.fillStyle = "#232323";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     [viewColumns, viewRows] = calcGridSize(cellSize);
//     const gridWidth = viewColumns * (cellSize + 1);
//     const gridHeight = viewRows * (cellSize + 1);
//     viewX = Math.floor((canvas.width - gridWidth) / 2);
//     viewY = Math.floor((canvas.height - gridHeight) / 2);
//     ctx.fillStyle = "white";
//     ctx.fillRect(viewX, viewY, gridWidth, gridHeight);
//     ctx.fillStyle = "black";
//     for (let y = 0; y < viewRows; y++) {
//         for (let x = 0; x < viewColumns; x++) {
//             if (grid[y][x]) {
//                 const rectX = x * (cellSize + 1) + viewX;
//                 const rectY = y * (cellSize + 1) + viewY;
//                 ctx.fillRect(rectX, rectY, cellSize, cellSize);
//             }
//         }
//     }
//     ctx.strokeStyle = "#818181";
//     ctx.lineWidth = 1;
//     for (let i = 1; i < viewColumns; i++) {
//         const lineX = viewX + i * (cellSize + 1) - 1;
//         drawLine(lineX, viewY - 1, lineX, viewY + gridHeight - 1);
//     }
//     for (let i = 1; i < viewRows; i++) {
//         const lineY = viewY + i * (cellSize + 1) - 1;
//         drawLine(viewX - 1, lineY, viewX + gridWidth - 1, lineY);
//     }
// }

// function calcGridSize(cellSize: number): [number, number] {
//     const columns = Math.floor((canvas.width - 2 * gridMargin) / (cellSize + 1));
//     const rows = Math.floor((canvas.height - 2 * gridMargin) / (cellSize + 1));
//     return [columns, rows];
// }

// function drawLine(x1: number, y1: number, x2: number, y2: number): void {
//     if (ctx == null)
//         return;
//     ctx.beginPath();
//     ctx.moveTo(x1 + 0.5, y1 + 0.5);
//     ctx.lineTo(x2 + 0.5, y2 + 0.5);
//     ctx.stroke();
// }

// function createGrid(): boolean[][] {
//     return Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
// }

// const gridSize = 1000;
// const gridMargin = 10;
// const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// const cellSizeInput = document.getElementById("cell-size-input") as HTMLInputElement;
// const cellSizeValue = document.getElementById("cell-size-value") as HTMLSpanElement;
// const ctx = canvas.getContext("2d");

// let grid = createGrid();
// let viewX = 0;
// let viewY = 0;
// let viewColumns = 0;
// let viewRows = 0;
// let centerX = Math.floor(gridSize / 2);
// let centerY = Math.floor(gridSize / 2);
// let drawMode = true;

// addEventListener("resize", handleResize);
// canvas.addEventListener("mousemove", handleMouseMove);
// canvas.addEventListener("mousedown", handleMouseDown);

// onCellSizeInput(false);
// handleResize();