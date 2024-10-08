// import { off } from "process";
// import { render } from "../../node_modules/sass/types/index";

// function handleResize(): void {
//     const computedStyle = getComputedStyle(canvas);
//     const cssWidth = parseInt(computedStyle.width);
//     const cssHeight = parseInt(computedStyle.height);
//     canvas.width = cssWidth;
//     canvas.height = cssHeight;
//     renderGrid();
// }

// function handleMouseDown(event: MouseEvent): void {
//     if (event.button !== 0)
//         return;
//     const [mouseX, mouseY] = getMousePosition(event);
//     if (getTool() === "paint-erase-tool") {
//         const cellSize = parseInt(cellSizeInput.value);
//         const [gridX, gridY] = getGridPositon(mouseX, mouseY, cellSize);
//         isDrawMode = !grid[gridY][gridX];
//         drawOrEraseOnGrid(mouseX, mouseY);
//     } else {
//         isPanning = true;
//         panningFrom = { x: mouseX, y: mouseY };
//     }
//     renderGrid();
// }

// function handleMouseUp(event: MouseEvent) {
//     if (event.button !== 0)
//         return;
//     if (getTool() !== "pan-tool")
//         return;
//     if (!isPanning)
//         return;
//     snapToGrid();
//     renderGrid();
// }

// function handleMouseMove(event: MouseEvent): void {
//     if (!(event.buttons & 1))
//         return;
//     const [mouseX, mouseY] = getMousePosition(event);
//     if (getTool() === "paint-erase-tool") {
//         drawOrEraseOnGrid(mouseX, mouseY);
//     } else {
//         const dx = mouseX - panningFrom.x;
//         const dy = mouseY - panningFrom.y;
//         offset.x += dx;
//         offset.y += dy;
//         panningFrom = { x: mouseX, y: mouseY };
//     }
//     renderGrid();
// }

// function drawOrEraseOnGrid(mouseX: number, mouseY: number) {
//     const cellSize = parseInt(cellSizeInput.value);
//     if (mouseX % (cellSize + 1) === 0 || mouseY % (cellSize + 1) === 0)
//         return;
//     const [gridX, gridY] = getGridPositon(mouseX, mouseY, cellSize);
//     grid[gridY][gridX] = isDrawMode;
// }

// function onCellSizeInput(render: boolean): void {
//     const cellSize = cellSizeInput.value;
//     cellSizeValue.textContent = cellSize;
//     if (render) {
//         renderGrid();
//     }
// }

// function renderGrid(): void {
//     if (ctx == null)
//         return;
//     const cellSize = parseInt(cellSizeInput.value);
//     ctx.fillStyle = "blue";
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
//             const gridX = centerX - Math.floor(viewColumns / 2) + x;
//             const gridY = centerY - Math.floor(viewRows / 2) + y;
//             if (grid[gridY][gridX]) {
//                 const cellX = x * (cellSize + 1) + viewX + offset.x;
//                 const cellY = y * (cellSize + 1) + viewY + offset.y;
//                 ctx.fillRect(cellX, cellY, cellSize, cellSize);
//             }
//         }
//     }
//     ctx.strokeStyle = "#818181";
//     ctx.lineWidth = 1;
//     let lineX = offset.x % (cellSize + 1) + viewX - 1;
//     if (lineX < viewX)
//         lineX += cellSize + 1;
//     while (lineX < gridWidth + viewX) {
//         drawLine(lineX, viewY, lineX, viewY + gridHeight - 1);
//         lineX += cellSize + 1;
//     }
//     let lineY = offset.y % (cellSize + 1) + viewY - 1;
//     if (lineY < viewY)
//         lineY += cellSize + 1;
//     while (lineY < gridHeight + viewY) {
//         drawLine(viewX, lineY, viewX + gridWidth - 1, lineY);
//         lineY += cellSize + 1;
//     }
// }

// function snapToGrid() {
//     const cellSize = parseInt(cellSizeInput.value);
//     const snapX = offset.x % (cellSize + 1);
//     const snapY = offset.y % (cellSize + 1);
//     offset.x -= snapX;
//     offset.y -= snapY;
// }

// function getGridPositon(mouseX: number, mouseY: number, cellSize: number): [number, number] {
//     const gridX = centerX - Math.floor(viewColumns / 2) + Math.floor((mouseX - offset.x) / (cellSize + 1));
//     const gridY = centerY - Math.floor(viewRows / 2) + Math.floor((mouseY - offset.y) / (cellSize + 1));
//     console.log(gridX, gridY);
//     return [gridX, gridY];
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

// function getMousePosition(event: MouseEvent): [number, number] {
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left - viewX;
//     const mouseY = event.clientY - rect.top - viewY;
//     return [mouseX, mouseY];
// }

// function getTool(): string {
//     return (document.getElementById("tool-selector") as HTMLSelectElement).value;
// }

// const gridSize = 1000;
// const gridMargin = 10;
// const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// const cellSizeInput = document.getElementById("cell-size-input") as HTMLInputElement;
// const cellSizeValue = document.getElementById("cell-size-value") as HTMLSpanElement;
// const ctx = canvas.getContext("2d");

// let grid = createGrid();
// let centerX = Math.floor(gridSize / 2);
// let centerY = Math.floor(gridSize / 2);
// let viewX = 0;
// let viewY = 0;
// let viewColumns = 0;
// let viewRows = 0;
// let isDrawMode = true;
// let isPanning = false;
// let panningFrom = { x: 0, y: 0 };
// let offset = { x: 0, y: 0 };

// grid[centerY - 1][centerX] = true;
// grid[centerY][centerX + 1] = true;
// grid[centerY + 1][centerX - 1] = true;
// grid[centerY + 1][centerX] = true;
// grid[centerY + 1][centerX + 1] = true;

// addEventListener("resize", handleResize);
// canvas.addEventListener("mousedown", handleMouseDown);
// canvas.addEventListener("mouseup", handleMouseUp);
// canvas.addEventListener("mousemove", handleMouseMove);

// onCellSizeInput(false);
// handleResize();