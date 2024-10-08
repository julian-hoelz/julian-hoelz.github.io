// class Cell {

//     x: number;
//     y: number;

//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }

// }

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
//     const mousePosition = getMousePosition(event);
//     const cellSize = parseInt(cellSizeInput.value);
//     if (getTool() === "paint-erase-tool") {
//         const [gridX, gridY] = getGridPositon(mousePosition, cellSize);
//         isDrawMode = !grid[gridY][gridX];
//         drawOrEraseOnGrid(mousePosition);
//     } else {
//         isPanning = true;
//         panningFrom = mousePosition;
//         offsetSetAtCellSize = cellSize;
//     }
//     renderGrid();
// }

// function handleMouseUp(event: MouseEvent) {
//     if (event.button !== 0)
//         return;
//     stopPanning();
// }

// function handleMouseLeave(_: MouseEvent) {
//     stopPanning();
// }

// function stopPanning() {
//     if (getTool() !== "pan-tool")
//         return;
//     if (!isPanning)
//         return;
//     snapToGrid();
//     renderGrid();
//     isPanning = false;
// }

// function handleMouseMove(event: MouseEvent): void {
//     if (!(event.buttons & 1))
//         return;
//     const mousePosition = getMousePosition(event);
//     if (getTool() === "paint-erase-tool") {
//         drawOrEraseOnGrid(mousePosition);
//     } else {
//         const dx = mousePosition.x - panningFrom.x;
//         const dy = mousePosition.y - panningFrom.y;
//         offset.x += dx;
//         offset.y += dy;
//         panningFrom = mousePosition;
//     }
//     renderGrid();
// }

// function drawOrEraseOnGrid(mousePosition: { x: number, y: number }) {
//     const cellSize = parseInt(cellSizeInput.value);
//     if (mousePosition.x % (cellSize + 1) === 0 || mousePosition.y % (cellSize + 1) === 0)
//         return;
//     const [gridX, gridY] = getGridPositon(mousePosition, cellSize);
//     if (!isOnGrid(gridX, gridY))
//         return;
//     grid[gridY][gridX] = isDrawMode;
// }

// function onCellSizeInput(render: boolean): void {
//     const cellSize = cellSizeInput.value;
//     cellSizeValue.textContent = cellSize;
//     snapToGrid();
//     if (render) {
//         renderGrid();
//     }
// }

// function gameLoop() {
//     if (isRunning) {
//         computeNextGeneration();
//         renderGrid();
//     }
//     setTimeout(() => {
//         requestAnimationFrame(gameLoop);
//     }, frameDelay);
// }

// function toggleIsRunning() {
//     isRunning = !isRunning;
// }

// function computeNextGeneration() {
//     for (let y = 0; y < gridSize; y++) {
//         for (let x = 0; x < gridSize; x++) {
//             const aliveNeighbors = countAliveNeighbors(x, y);
//             if (grid[y][x]) {
//                 nextGrid[y][x] = aliveNeighbors === 2 || aliveNeighbors === 3;
//             } else {
//                 nextGrid[y][x] = aliveNeighbors === 3;
//             }
//         }
//     }
//     [grid, nextGrid] = [nextGrid, grid];
// }

// function countAliveNeighbors(x: number, y: number): number {
//     let count = 0;
//     for (let dy = -1; dy <= 1; dy++) {
//         for (let dx = -1; dx <= 1; dx++) {
//             if (dx === 0 && dy === 0)
//                 continue;
//             const newX = x + dx;
//             const newY = y + dy;
//             if (isOnGrid(newX, newY)) {
//                 count += grid[newY][newX] ? 1 : 0;
//             }
//         }
//     }
//     return count;
// }


// function renderGrid(): void {
//     if (ctx == null)
//         return;
//     const cellSize = parseInt(cellSizeInput.value);
//     ctx.fillStyle = "#232323";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     [viewColumns, viewRows] = calcGridSize(cellSize);
//     viewWidth = viewColumns * (cellSize + 1) - 1;
//     viewHeight = viewRows * (cellSize + 1) - 1;
//     viewX = Math.floor((canvas.width - viewWidth) / 2);
//     viewY = Math.floor((canvas.height - viewHeight) / 2);
//     ctx.fillStyle = "white";
//     ctx.fillRect(viewX, viewY, viewWidth, viewHeight);
//     const translatedOffset = translateOffset(cellSize);
//     const startX = Math.floor(-translatedOffset.x / (cellSize + 1));
//     const startY = Math.floor(-translatedOffset.y / (cellSize + 1));
//     const endX = startX + viewColumns;
//     const endY = startY + viewRows;
//     ctx.fillStyle = "black";
//     for (let y = startY; y <= endY; y++) {
//         for (let x = startX; x <= endX; x++) {
//             const gridX = centerX - Math.floor(viewColumns / 2) + x;
//             const gridY = centerY - Math.floor(viewRows / 2) + y;
//             if (grid[gridY][gridX]) {
//                 drawCell(x, y, cellSize, translatedOffset);
//             }
//         }
//     }
//     ctx.strokeStyle = "#818181";
//     ctx.lineWidth = 1;
//     let lineX = translatedOffset.x % (cellSize + 1) + viewX - 1;
//     if (lineX < viewX)
//         lineX += cellSize + 1;
//     while (lineX < viewWidth + viewX - 1) {
//         drawLine(lineX, viewY, lineX, viewY + viewHeight - 1);
//         lineX += cellSize + 1;
//     }
//     let lineY = translatedOffset.y % (cellSize + 1) + viewY - 1;
//     if (lineY < viewY)
//         lineY += cellSize + 1;
//     while (lineY < viewHeight + viewY - 1) {
//         drawLine(viewX, lineY, viewX + viewWidth - 1, lineY);
//         lineY += cellSize + 1;
//     }
// }

// function drawCell(x: number, y: number, cellSize: number, translatedOffset: { x: number, y: number }) {
//     let cellX = x * (cellSize + 1) + viewX + translatedOffset.x;
//     let cellY = y * (cellSize + 1) + viewY + translatedOffset.y;
//     let cellWidth = cellSize;
//     let cellHeight = cellSize;
//     if (cellX < viewX) {
//         cellWidth += cellX - viewX;
//         cellX = viewX;
//     }
//     if (cellX + cellWidth > viewX + viewWidth) {
//         cellWidth = (viewX + viewWidth) - cellX;
//     }
//     if (cellY < viewY) {
//         cellHeight += cellY - viewY;
//         cellY = viewY;
//     }
//     if (cellY + cellHeight > viewY + viewHeight) {
//         cellHeight = (viewY + viewHeight) - cellY;
//     }
//     ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
// }

// function snapToGrid() {
//     const cellSize = parseInt(cellSizeInput.value);
//     const snapX = offset.x % (cellSize + 1);
//     const snapY = offset.y % (cellSize + 1);
//     offset.x -= snapX;
//     offset.y -= snapY;
// }

// function getGridPositon(mousePosition: { x: number, y: number }, cellSize: number): [number, number] {
//     const translatedOffset = translateOffset(cellSize);
//     const gridX = centerX - Math.floor(viewColumns / 2) + Math.floor((mousePosition.x - translatedOffset.x) / (cellSize + 1));
//     const gridY = centerY - Math.floor(viewRows / 2) + Math.floor((mousePosition.y - translatedOffset.y) / (cellSize + 1));
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

// function getMousePosition(event: MouseEvent): { x: number, y: number } {
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left - viewX;
//     const mouseY = event.clientY - rect.top - viewY;
//     return { x: mouseX, y: mouseY };
// }

// function getTool(): string {
//     return (document.getElementById("tool-selector") as HTMLSelectElement).value;
// }

// function translateOffset(cellSize: number): { x: number, y: number } {
//     const scaleFactor = cellSize / offsetSetAtCellSize;
//     const x = Math.floor(offset.x * scaleFactor);
//     const y = Math.floor(offset.y * scaleFactor);
//     return { x: x, y: y };
// }

// function isOnGrid(x: number, y: number): boolean {
//     if (x < 0)
//         return false;
//     if (x >= gridSize)
//         return false;
//     if (y < 0)
//         return false;
//     if (y >= gridSize)
//         return false;
//     return true;
// }

// const gridSize = 1000;
// const gridMargin = 10;
// const frameDelay = 500;
// const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// const cellSizeInput = document.getElementById("cell-size-input") as HTMLInputElement;
// const cellSizeValue = document.getElementById("cell-size-value") as HTMLSpanElement;
// const ctx = canvas.getContext("2d");

// let grid = createGrid();
// let nextGrid = createGrid();
// let centerX = Math.floor(gridSize / 2);
// let centerY = Math.floor(gridSize / 2);
// let viewX = 0;
// let viewY = 0;
// let viewWidth = 0;
// let viewHeight = 0;
// let viewColumns = 0;
// let viewRows = 0;
// let isDrawMode = true;
// let isPanning = false;
// let panningFrom = { x: 0, y: 0 };
// let offset = { x: 0, y: 0 };
// let offsetSetAtCellSize = 1;
// let isRunning = false;

// grid[centerY - 1][centerX] = true;
// grid[centerY][centerX + 1] = true;
// grid[centerY + 1][centerX - 1] = true;
// grid[centerY + 1][centerX] = true;
// grid[centerY + 1][centerX + 1] = true;

// addEventListener("resize", handleResize);
// canvas.addEventListener("mousedown", handleMouseDown);
// canvas.addEventListener("mouseup", handleMouseUp);
// canvas.addEventListener("mousemove", handleMouseMove);
// canvas.addEventListener("mouseleave", handleMouseLeave);

// onCellSizeInput(false);
// handleResize();
// gameLoop();