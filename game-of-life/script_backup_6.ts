// class Chunk {

//     x: number;
//     y: number;
//     cells: boolean[][];

//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//         this.cells = Array.from({ length: chunkSize }, () => Array(chunkSize).fill(false));
//     }

//     getCell(x: number, y: number): boolean {
//         return this.cells[y][x];
//     }

//     setCell(x: number, y: number, value: boolean) {
//         this.cells[y][x] = value;
//     }

//     isDead(): boolean {
//         return this.cells.every(row => row.every(cell => !cell));
//     }

//     isRowDead(n: number): boolean {
//         return this.cells[n].every(cell => !cell);
//     }

//     isColumnDead(n: number): boolean {
//         return this.cells.every(row => !row[n]);
//     }

// }

// class World {

//     chunks: Map<string, Chunk>;

//     constructor() {
//         this.chunks = new Map();
//     }

//     getChunk(x: number, y: number): Chunk | undefined {
//         return this.chunks.get(World.getChunkKey(x, y));
//     }

//     getOrCreateChunk(x: number, y: number): Chunk {
//         const chunk = this.getChunk(x, y);
//         if (chunk)
//             return chunk;
//         const key = World.getChunkKey(x, y);
//         const newChunk = new Chunk(x, y);
//         this.chunks.set(key, newChunk);
//         return newChunk;
//     }

//     getCell(x: number, y: number): boolean {
//         const chunkX = Math.floor(x / chunkSize);
//         const chunkY = Math.floor(y / chunkSize);
//         const chunk = this.getChunk(chunkX, chunkY);
//         if (!chunk) {
//             return false;
//         }
//         const cellX = ((x % chunkSize) + chunkSize) % chunkSize;
//         const cellY = ((y % chunkSize) + chunkSize) % chunkSize;
//         return chunk.getCell(cellX, cellY);
//     }

//     setCell(x: number, y: number, value: boolean): void {
//         const chunkX = Math.floor(x / chunkSize);
//         const chunkY = Math.floor(y / chunkSize);
//         const chunk = this.getOrCreateChunk(chunkX, chunkY);
//         const cellX = ((x % chunkSize) + chunkSize) % chunkSize;
//         const cellY = ((y % chunkSize) + chunkSize) % chunkSize;
//         chunk.setCell(cellX, cellY, value);
//         if (value) {
//             if (cellX === 0) {
//                 this.getOrCreateChunk(chunkX - 1, chunkY);
//             } else if (cellX === chunkSize - 1) {
//                 this.getOrCreateChunk(chunkX + 1, chunkY);
//             }
//             if (cellY === 0) {
//                 this.getOrCreateChunk(chunkX, chunkY - 1);
//             } else if (cellY === chunkSize - 1) {
//                 this.getOrCreateChunk(chunkX, chunkY + 1);
//             }
//         }
//     }

//     drawOrErase(mousePosition: { x: number, y: number }) {
//         const cellSize = parseInt(cellSizeInput.value);
//         const [worldX, worldY] = getWorldPosition(mousePosition, cellSize);
//         this.setCell(worldX, worldY, isDrawMode);
//     }

//     cleanUpDeadChunks(): void {
//         this.chunks.forEach((chunk, key) => {
//             if (chunk.isDead() && this.isIsolated(chunk)) {
//                 this.chunks.delete(key);
//             }
//         });
//     }

//     isIsolated(chunk: Chunk): boolean {
//         const leftNeighboringChunk = this.getChunk(chunk.x - 1, chunk.y);
//         if (leftNeighboringChunk && !leftNeighboringChunk.isRowDead(chunkSize - 1))
//             return false;
//         const rightNeighboringChunk = this.getChunk(chunk.x + 1, chunk.y);
//         if (rightNeighboringChunk && !rightNeighboringChunk.isRowDead(0))
//             return false;
//         const topNeighboringChunk = this.getChunk(chunk.x, chunk.y - 1);
//         if (topNeighboringChunk && !topNeighboringChunk.isColumnDead(chunkSize - 1))
//             return false;
//         const bottomNeighboringChunk = this.getChunk(chunk.x, chunk.y + 1);
//         if (bottomNeighboringChunk && !bottomNeighboringChunk.isColumnDead(0))
//             return false;
//         return true;
//     }

//     drawCells(cellSize: number, scaledOffset: { x: number, y: number }) {
//         const startX = Math.floor(-scaledOffset.x / (cellSize + 1));
//         const startY = Math.floor(-scaledOffset.y / (cellSize + 1));
//         const endX = startX + viewColumns;
//         const endY = startY + viewRows;
//         ctx.fillStyle = "black";
//         for (let y = startY; y <= endY; y++) {
//             for (let x = startX; x <= endX; x++) {
//                 const worldX = centerX - Math.floor(viewColumns / 2) + x;
//                 const worldY = centerY - Math.floor(viewRows / 2) + y;
//                 if (world.getCell(worldX, worldY)) {
//                     drawCell(x, y, cellSize, scaledOffset);
//                 }
//             }
//         }
//     }

//     computeNextGenerationWorld(): World {
//         const nextGenerationWorld = this.copyWithDeadChunks();
//         this.chunks.forEach((chunk, _) => {
//             const currentNextGenerationWorldChunk = nextGenerationWorld.getChunk(chunk.x, chunk.y);
//             for (let y = 0; y < chunkSize; y++) {
//                 for (let x = 0; x < chunkSize; x++) {
//                     const alive = chunk.getCell(x, y);
//                     const aliveNeighbors = this.countAliveNeighbors(chunk.x * chunkSize + x, chunk.y * chunkSize + y);
//                     if (alive && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
//                         currentNextGenerationWorldChunk.setCell(x, y, true);
//                     } else if (!alive && aliveNeighbors === 3) {
//                         currentNextGenerationWorldChunk.setCell(x, y, true);
//                         nextGenerationWorld.addNeighboringChunksIfNeeded(x, y, chunk);
//                     }
//                 }
//             }
//         });
//         return nextGenerationWorld;
//     }

//     copyWithDeadChunks(): World {
//         const newWorld = new World();
//         this.chunks.forEach((chunk, key) => {
//             const newChunk = new Chunk(chunk.x, chunk.y);
//             newWorld.chunks.set(key, newChunk);
//         });
//         return newWorld;
//     }

//     addNeighboringChunksIfNeeded(x: number, y: number, chunk: Chunk): void {
//         if (x === 0) {
//             const leftChunk = this.getChunk(chunk.x - 1, chunk.y);
//             if (!leftChunk) {
//                 const newKey = World.getChunkKey(chunk.x - 1, chunk.y);
//                 const newLeftChunk = new Chunk(chunk.x - 1, chunk.y);
//                 this.chunks.set(newKey, newLeftChunk);
//             }
//         }
//         if (x === chunkSize - 1) {
//             const rightChunk = this.getChunk(chunk.x + 1, chunk.y);
//             if (!rightChunk) {
//                 const newKey = World.getChunkKey(chunk.x + 1, chunk.y);
//                 const newRightChunk = new Chunk(chunk.x + 1, chunk.y);
//                 this.chunks.set(newKey, newRightChunk);
//             }
//         }
//         if (y === 0) {
//             const topChunk = this.getChunk(chunk.x, chunk.y - 1);
//             if (!topChunk) {
//                 const newKey = World.getChunkKey(chunk.x, chunk.y - 1);
//                 const newTopChunk = new Chunk(chunk.x, chunk.y - 1);
//                 this.chunks.set(newKey, newTopChunk);
//             }
//         }
//         if (y === chunkSize - 1) {
//             const bottomChunk = this.getChunk(chunk.x, chunk.y + 1);
//             if (!bottomChunk) {
//                 const newKey = World.getChunkKey(chunk.x, chunk.y + 1);
//                 const newBottomChunk = new Chunk(chunk.x, chunk.y + 1);
//                 this.chunks.set(newKey, newBottomChunk);
//             }
//         }
//     }

//     countAliveNeighbors(globalX: number, globalY: number): number {
//         let count = 0;
//         const neighbors = [
//             [-1, -1], [-1, 0], [-1, 1],
//             [ 0, -1],          [ 0, 1],
//             [ 1, -1], [ 1, 0], [ 1, 1]
//         ];
//         for (const [dy, dx] of neighbors) {
//             const neighborX = globalX + dx;
//             const neighborY = globalY + dy;
//             const chunkX = Math.floor(neighborX / chunkSize);
//             const chunkY = Math.floor(neighborY / chunkSize);
//             const chunk = this.getChunk(chunkX, chunkY);
//             if (chunk) {
//                 const cellX = (neighborX % chunkSize + chunkSize) % chunkSize;
//                 const cellY = (neighborY % chunkSize + chunkSize) % chunkSize;
//                 if (chunk.getCell(cellX, cellY)) {
//                     count++;
//                 }
//             }
//         }
//         return count;
//     }

//     static getChunkKey(x: number, y: number): string {
//         return `${x},${y}`;
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
//     const cellSize = parseInt(cellSizeInput.value);
//     const mousePosition = getMousePosition(event);
//     if (getTool() === "paint-erase-tool") {
//         const [worldX, worldY] = getWorldPosition(mousePosition, cellSize);
//         isDrawMode = !world.getCell(worldX, worldY);
//         world.drawOrErase(mousePosition);
//     } else {
//         isPanning = true;
//         panningFrom = mousePosition;
//         panningAtCellSize = cellSize;
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
//         world.drawOrErase(mousePosition);
//     } else if (isPanning) {
//         const dx = mousePosition.x - panningFrom.x;
//         const dy = mousePosition.y - panningFrom.y;
//         offset.x += dx;
//         offset.y += dy;
//         panningFrom = mousePosition;
//     }
//     renderGrid();
// }

// // Funktion zum Ändern der Zellgröße und Skalieren des Offsets
// function onCellSizeInput(render: boolean): void {
//     const newCellSize = parseInt(cellSizeInput.value);
//     const scaledOffset = scaleOffset(newCellSize); // Berechne den neuen skalierten Offset

//     // Aktualisiere den Offset
//     offset.x = scaledOffset.x + snap.x;
//     offset.y = scaledOffset.y + snap.y;

//     // Aktualisiere den Wert von panningAtCellSize
//     panningAtCellSize = newCellSize;

//     // Zeige die neue Zellgröße an
//     cellSizeValue.textContent = cellSizeInput.value;

//     if (render) {
//         renderGrid();
//     }
// }

// // function onCellSizeInput(render: boolean): void {
// //     cellSizeValue.textContent = cellSizeInput.value;
// //     const cellSize = parseInt(cellSizeInput.value);
// //     panningAtCellSize = cellSize;
// //     if (render) {
// //         renderGrid();
// //     }
// // }

// function gameLoop() {
//     if (isRunning) {
//         world = world.computeNextGenerationWorld();
//         renderGrid();
//     }
//     setTimeout(() => {
//         requestAnimationFrame(gameLoop);
//     }, frameDelay);
// }

// function toggleIsRunning() {
//     isRunning = !isRunning;
// }


// function renderGrid(): void {
//     const cellSize = parseInt(cellSizeInput.value);
//     ctx.fillStyle = "#232323";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     [viewColumns, viewRows] = calculateGridSize(cellSize);
//     viewWidth = viewColumns * (cellSize + 1) - 1;
//     viewHeight = viewRows * (cellSize + 1) - 1;
//     viewX = Math.floor((canvas.width - viewWidth) / 2);
//     viewY = Math.floor((canvas.height - viewHeight) / 2);
//     ctx.fillStyle = "white";
//     ctx.fillRect(viewX, viewY, viewWidth, viewHeight);
//     const scaledOffset = scaleOffset(cellSize);
//     world.drawCells(cellSize, scaledOffset);
//     ctx.strokeStyle = "#818181";
//     ctx.lineWidth = 1;
//     let lineX = scaledOffset.x % (cellSize + 1) + viewX - 1;
//     if (lineX < viewX)
//         lineX += cellSize + 1;
//     while (lineX < viewWidth + viewX - 1) {
//         drawLine(lineX, viewY, lineX, viewY + viewHeight - 1);
//         lineX += cellSize + 1;
//     }
//     let lineY = scaledOffset.y % (cellSize + 1) + viewY - 1;
//     if (lineY < viewY)
//         lineY += cellSize + 1;
//     while (lineY < viewHeight + viewY - 1) {
//         drawLine(viewX, lineY, viewX + viewWidth - 1, lineY);
//         lineY += cellSize + 1;
//     }
// }

// function drawCell(x: number, y: number, cellSize: number, scaledOffset: { x: number, y: number }) {
//     let cellX = x * (cellSize + 1) + viewX + scaledOffset.x;
//     let cellY = y * (cellSize + 1) + viewY + scaledOffset.y;
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
//     snap.x = offset.x % (cellSize + 1);
//     snap.y = offset.y % (cellSize + 1);
// }

// function getWorldPosition(mousePosition: { x: number, y: number }, cellSize: number): [number, number] {
//     const scaledOffset = scaleOffset(cellSize);
//     const worldX = centerX - Math.floor(viewColumns / 2) + Math.floor((mousePosition.x - scaledOffset.x) / (cellSize + 1));
//     const worldY = centerY - Math.floor(viewRows / 2) + Math.floor((mousePosition.y - scaledOffset.y) / (cellSize + 1));
//     return [worldX, worldY];
// }

// function calculateGridSize(cellSize: number): [number, number] {
//     const columns = Math.floor((canvas.width - 2 * gridMargin) / (cellSize + 1));
//     const rows = Math.floor((canvas.height - 2 * gridMargin) / (cellSize + 1));
//     return [columns, rows];
// }

// function drawLine(x1: number, y1: number, x2: number, y2: number): void {
//     ctx.beginPath();
//     ctx.moveTo(x1 + 0.5, y1 + 0.5);
//     ctx.lineTo(x2 + 0.5, y2 + 0.5);
//     ctx.stroke();
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

// function scaleOffset(cellSize: number): { x: number, y: number } {
//     const scaleFactor = (cellSize + 1) / (panningAtCellSize + 1);
//     const x = Math.floor((offset.x - snap.x) * scaleFactor);
//     const y = Math.floor((offset.y - snap.y) * scaleFactor);
//     return { x: x, y: y };
// }

// function drawGlider() {
//     const center = Math.floor(chunkSize / 2)
//     world.setCell(center, center - 1, true);
//     world.setCell(center + 1, center, true);
//     world.setCell(center - 1, center + 1, true);
//     world.setCell(center, center + 1, true);
//     world.setCell(center + 1, center + 1, true);
// }

// const chunkSize = 100;
// const gridMargin = 10;
// const frameDelay = 500;
// const canvas = document.getElementById("canvas") as HTMLCanvasElement;
// const cellSizeInput = document.getElementById("cell-size-input") as HTMLInputElement;
// const cellSizeValue = document.getElementById("cell-size-value") as HTMLSpanElement;
// const ctx = canvas.getContext("2d")!;

// let isRunning = false;
// let centerX = Math.floor(chunkSize / 2);
// let centerY = Math.floor(chunkSize / 2);
// let world = new World();
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
// let panningAtCellSize = 1;
// let snap = { x: 0, y: 0 };

// addEventListener("resize", handleResize);
// canvas.addEventListener("mousedown", handleMouseDown);
// canvas.addEventListener("mouseup", handleMouseUp);
// canvas.addEventListener("mousemove", handleMouseMove);
// canvas.addEventListener("mouseleave", handleMouseLeave);

// drawGlider();
// onCellSizeInput(false);
// handleResize();
// gameLoop();