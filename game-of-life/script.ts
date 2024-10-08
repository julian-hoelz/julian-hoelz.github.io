class Chunk {

    x: number;
    y: number;
    cells: boolean[][];

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.cells = Array.from({ length: chunkSize }, () => Array(chunkSize).fill(false));
    }

    getCell(x: number, y: number): boolean {
        return this.cells[y][x];
    }

    setCell(x: number, y: number, value: boolean) {
        this.cells[y][x] = value;
    }

    isDead(): boolean {
        return this.cells.every(row => row.every(cell => !cell));
    }

    isRowDead(n: number): boolean {
        return this.cells[n].every(cell => !cell);
    }

    isColumnDead(n: number): boolean {
        return this.cells.every(row => !row[n]);
    }

}

class World {

    chunks: Map<string, Chunk>;
    isStable = false;
    changesMade = false;

    constructor() {
        this.chunks = new Map();
    }

    getChunk(x: number, y: number): Chunk | undefined {
        return this.chunks.get(World.getChunkKey(x, y));
    }

    getOrCreateChunk(x: number, y: number): Chunk {
        const chunk = this.getChunk(x, y);
        if (chunk)
            return chunk;
        const key = World.getChunkKey(x, y);
        const newChunk = new Chunk(x, y);
        this.chunks.set(key, newChunk);
        return newChunk;
    }

    getCell(x: number, y: number): boolean {
        const chunkX = Math.floor(x / chunkSize);
        const chunkY = Math.floor(y / chunkSize);
        const chunk = this.getChunk(chunkX, chunkY);
        if (!chunk)
            return false;
        const cellX = (x % chunkSize + chunkSize) % chunkSize;
        const cellY = (y % chunkSize + chunkSize) % chunkSize;
        return chunk.getCell(cellX, cellY);
    }

    setCell(x: number, y: number, value: boolean): void {
        const chunkX = Math.floor(x / chunkSize);
        const chunkY = Math.floor(y / chunkSize);
        const chunk = this.getOrCreateChunk(chunkX, chunkY);
        const cellX = ((x % chunkSize) + chunkSize) % chunkSize;
        const cellY = ((y % chunkSize) + chunkSize) % chunkSize;
        const valueBefore = chunk.getCell(cellX, cellY);
        if (valueBefore === value)
            return;
        chunk.setCell(cellX, cellY, value);
        if (value)
            this.addNeighboringChunksIfNeeded(cellX, cellY, chunk);
        this.changesMade = true;
    }

    cleanUpDeadChunks(): void {
        this.chunks.forEach((chunk, key) => {
            if (chunk.isDead() && this.isIsolated(chunk)) {
                this.chunks.delete(key);
            }
        });
    }

    isIsolated(chunk: Chunk): boolean {
        const leftNeighboringChunk = this.getChunk(chunk.x - 1, chunk.y);
        if (leftNeighboringChunk && !leftNeighboringChunk.isRowDead(chunkSize - 1))
            return false;
        const rightNeighboringChunk = this.getChunk(chunk.x + 1, chunk.y);
        if (rightNeighboringChunk && !rightNeighboringChunk.isRowDead(0))
            return false;
        const topNeighboringChunk = this.getChunk(chunk.x, chunk.y - 1);
        if (topNeighboringChunk && !topNeighboringChunk.isColumnDead(chunkSize - 1))
            return false;
        const bottomNeighboringChunk = this.getChunk(chunk.x, chunk.y + 1);
        if (bottomNeighboringChunk && !bottomNeighboringChunk.isColumnDead(0))
            return false;
        return true;
    }

    drawCells(cellSize: number, scaledOffset: { x: number, y: number }) {
        const startX = Math.floor(-scaledOffset.x / (cellSize + 1));
        const startY = Math.floor(-scaledOffset.y / (cellSize + 1));
        const endX = startX + viewColumns;
        const endY = startY + viewRows;
        ctx.fillStyle = "black";
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                const worldX = center.x - Math.floor(viewColumns / 2) + x;
                const worldY = center.y - Math.floor(viewRows / 2) + y;
                if (this.getCell(worldX, worldY)) {
                    drawCell(x, y, cellSize, scaledOffset);
                }
            }
        }
    }

    computeNextGenerationWorld(): World {
        const nextGenerationWorld = this.copyWithDeadChunks();
        let change = false;
        this.chunks.forEach((chunk, _) => {
            const currentNextGenerationWorldChunk = nextGenerationWorld.getChunk(chunk.x, chunk.y);
            for (let y = 0; y < chunkSize; y++) {
                for (let x = 0; x < chunkSize; x++) {
                    const alive = chunk.getCell(x, y);
                    const aliveNeighbors = this.countAliveNeighbors(chunk.x * chunkSize + x, chunk.y * chunkSize + y);
                    if (alive) {
                        if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                            currentNextGenerationWorldChunk.setCell(x, y, true);
                        } else {
                            change = true;
                        }
                    } else if (aliveNeighbors === 3) {
                        currentNextGenerationWorldChunk.setCell(x, y, true);
                        nextGenerationWorld.addNeighboringChunksIfNeeded(x, y, chunk);
                        change = true;
                    }
                }
            }
        });
        nextGenerationWorld.isStable = !change;
        return nextGenerationWorld;
    }

    copyWithDeadChunks(): World {
        const newWorld = new World();
        this.chunks.forEach((chunk, key) => {
            const newChunk = new Chunk(chunk.x, chunk.y);
            newWorld.chunks.set(key, newChunk);
        });
        return newWorld;
    }

    addNeighboringChunksIfNeeded(x: number, y: number, chunk: Chunk): void {
        if (x === 0) {
            this.getOrCreateChunk(chunk.x - 1, chunk.y);
        } else if (x === chunkSize - 1) {
            this.getOrCreateChunk(chunk.x + 1, chunk.y);
        }
        if (y === 0) {
            this.getOrCreateChunk(chunk.x, chunk.y - 1);
        } else if (y === chunkSize - 1) {
            this.getOrCreateChunk(chunk.x, chunk.y + 1);
        }
    }

    countAliveNeighbors(cellX: number, cellY: number): number {
        let count = 0;
        const neighbors = [
            [-1, -1], [-1, 0], [-1, 1],
            [ 0, -1],          [ 0, 1],
            [ 1, -1], [ 1, 0], [ 1, 1]
        ];
        for (const [dy, dx] of neighbors) {
            const neighborX = cellX + dx;
            const neighborY = cellY + dy;
            if (this.getCell(neighborX, neighborY)) {
                count++;
            }
        }
        return count;
    }

    static getChunkKey(x: number, y: number): string {
        return `${x},${y}`;
    }
    
}

function handleResize(): void {
    const computedStyle = getComputedStyle(canvas);
    const cssWidth = parseInt(computedStyle.width);
    const cssHeight = parseInt(computedStyle.height);
    canvas.width = cssWidth;
    canvas.height = cssHeight;
    renderGrid();
}

function handleKeydown(event: KeyboardEvent): void {
    if (event.repeat)
        return;
    if (event.key !== " ")
        return;
    event.preventDefault();
    startStopButtonClicked();
}

function handleMouseDown(event: MouseEvent): void {
    if (!(event.button === 0 || event.button === 2))
        return;
    const cellSize = parseInt(cellSizeInput.value);
    const mousePosition = getMousePosition(event);
    if (getTool() === "draw-erase-tool") {
        drawOrErase(event.button === 0, mousePosition);
    } else if (event.button === 0) {
        isPanning = true;
        panningFrom = mousePosition;
        panningAtCellSize = cellSize;
        canvas.style.cursor = "grabbing";
    }
    renderGrid();
}

function handleMouseUp(event: MouseEvent): void {
    if (event.button !== 0)
        return;
    stopPanning();
}

function handleMouseLeave(_: MouseEvent): void {
    stopPanning();
}

function stopPanning(): void {
    if (getTool() !== "pan-tool")
        return;
    if (!isPanning)
        return;
    snapToGrid();
    renderGrid();
    isPanning = false;
    canvas.style.cursor = "default";
}

function handleMouseMove(event: MouseEvent): void {
    if (!(event.buttons & 1 || event.buttons & 2))
        return;
    const mousePosition = getMousePosition(event);
    if (getTool() === "draw-erase-tool") {
        drawOrErase(!!(event.buttons & 1), mousePosition);
    } else if (isPanning && event.buttons & 1) {
        const dx = mousePosition.x - panningFrom.x;
        const dy = mousePosition.y - panningFrom.y;
        offset.x += dx;
        offset.y += dy;
        panningFrom = mousePosition;
    }
    renderGrid();
}

function drawOrErase(value: boolean, mousePosition: { x: number, y: number }): void {
    const cellSize = parseInt(cellSizeInput.value);
    const [worldX, worldY] = getWorldPosition(mousePosition, cellSize);
    world.setCell(worldX, worldY, value);
    if (world.changesMade) {
        savedWorld = world;
        startStopButton.disabled = false;
        nextButton.disabled = false;
        resetButton.disabled = true;
        clearButton.disabled = false;
    }
}

function handleWheel(event: WheelEvent): void {
    const cellSize = parseInt(cellSizeInput.value);
    event.preventDefault();
    console.log(event.deltaY);
    if (event.deltaY < 0) {
        cellSizeInput.value = Math.min(maxCellSize, cellSize + 1).toString();
    } else {
        cellSizeInput.value = Math.max(minCellSize, cellSize - 1).toString();
    }
    onCellSizeInput(true);
}

function preventContextMenuInDrawEraseMode(event: MouseEvent): void {
    if (getTool() === "draw-erase-tool") {
        event.preventDefault();
    }
}

function onCellSizeInput(render: boolean): void {
    cellSizeValue.textContent = cellSizeInput.value;
    if (render) {
        renderGrid();
    }
}

function onSpeedInput() {
    const speedInput = document.getElementById("speed-input") as HTMLInputElement;
    frameDelay = calculateDelay(parseInt(speedInput.value));
}

function startStopButtonClicked(): void {
    isRunning = !isRunning;
    if (isRunning)
        resetButton.disabled = false;
    const newText = isRunning ? "Stop" : "Start";
    startStopButton.textContent = newText;
    nextButton.disabled = isRunning;
}

function nextButtonClicked(): void {
    computeNextGenerationWorld();
    resetButton.disabled = false;
}

function resetButtonClicked(): void {
    if (world.changesMade || !savedWorld)
        return;
    world = savedWorld;
    renderGrid();
    startStopButton.disabled = false;
    nextButton.disabled = isRunning;
    clearButton.disabled = false;
    if (!isRunning) {
        resetButton.disabled = true;
    }
}

function clearButtonClicked(): void {
    world = new World();
    renderGrid();
    startStopButton.disabled = true;
    startStopButton.textContent = "Start";
    nextButton.disabled = true;
    resetButton.disabled = false;
    clearButton.disabled = true;
}

function activtateDeadChunkCleaning(): void {
    setInterval(() => {
        world.cleanUpDeadChunks();
    }, 30_000);
}

function gameLoop(): void {
    if (isRunning) {
        computeNextGenerationWorld();
    }
    setTimeout(() => {
        requestAnimationFrame(gameLoop);
    }, frameDelay);
}

function computeNextGenerationWorld(): void {
    world = world.computeNextGenerationWorld();
    if (world.isStable) {
        isRunning = false;
        startStopButton.disabled = true;
        startStopButton.textContent = "Start";
        nextButton.disabled = true;
    } else {
        renderGrid();
    }
}

function renderGrid(): void {
    const cellSize = parseInt(cellSizeInput.value);
    ctx.fillStyle = "#232323";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    [viewColumns, viewRows] = calculateGridSize(cellSize);
    viewWidth = viewColumns * (cellSize + 1) - 1;
    viewHeight = viewRows * (cellSize + 1) - 1;
    view.x = Math.floor((canvas.width - viewWidth) / 2);
    view.y = Math.floor((canvas.height - viewHeight) / 2);
    ctx.fillStyle = "white";
    ctx.fillRect(view.x, view.y, viewWidth, viewHeight);
    const scaledOffset = scaleOffset(cellSize);
    world.drawCells(cellSize, scaledOffset);
    ctx.strokeStyle = "#818181";
    ctx.lineWidth = 1;
    let lineX = scaledOffset.x % (cellSize + 1) + view.x - 1;
    if (lineX < view.x)
        lineX += cellSize + 1;
    while (lineX < viewWidth + view.x - 1) {
        drawLine(lineX, view.y, lineX, view.y + viewHeight - 1);
        lineX += cellSize + 1;
    }
    let lineY = scaledOffset.y % (cellSize + 1) + view.y - 1;
    if (lineY < view.y)
        lineY += cellSize + 1;
    while (lineY < viewHeight + view.y - 1) {
        drawLine(view.x, lineY, view.x + viewWidth - 1, lineY);
        lineY += cellSize + 1;
    }
}

function drawCell(x: number, y: number, cellSize: number, scaledOffset: { x: number, y: number }) {
    let cellX = x * (cellSize + 1) + view.x + scaledOffset.x;
    let cellY = y * (cellSize + 1) + view.y + scaledOffset.y;
    let cellWidth = cellSize;
    let cellHeight = cellSize;
    if (cellX < view.x) {
        cellWidth += cellX - view.x;
        cellX = view.x;
    }
    if (cellX + cellWidth > view.x + viewWidth) {
        cellWidth = (view.x + viewWidth) - cellX;
    }
    if (cellY < view.y) {
        cellHeight += cellY - view.y;
        cellY = view.y;
    }
    if (cellY + cellHeight > view.y + viewHeight) {
        cellHeight = (view.y + viewHeight) - cellY;
    }
    ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
}

function snapToGrid() {
    const cellSize = parseInt(cellSizeInput.value);
    snap.x = offset.x % (cellSize + 1);
    snap.y = offset.y % (cellSize + 1);
}

function getWorldPosition(mousePosition: { x: number, y: number }, cellSize: number): [number, number] {
    const scaledOffset = scaleOffset(cellSize);
    const worldX = center.x - Math.floor(viewColumns / 2) + Math.floor((mousePosition.x - scaledOffset.x) / (cellSize + 1));
    const worldY = center.y - Math.floor(viewRows / 2) + Math.floor((mousePosition.y - scaledOffset.y) / (cellSize + 1));
    return [worldX, worldY];
}

function calculateGridSize(cellSize: number): [number, number] {
    const columns = Math.floor((canvas.width - 2 * gridMargin) / (cellSize + 1));
    const rows = Math.floor((canvas.height - 2 * gridMargin) / (cellSize + 1));
    return [columns, rows];
}

function drawLine(x1: number, y1: number, x2: number, y2: number): void {
    ctx.beginPath();
    ctx.moveTo(x1 + 0.5, y1 + 0.5);
    ctx.lineTo(x2 + 0.5, y2 + 0.5);
    ctx.stroke();
}

function getMousePosition(event: MouseEvent): { x: number, y: number } {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - view.x;
    const mouseY = event.clientY - rect.top - view.y;
    return { x: mouseX, y: mouseY };
}

function getTool(): string {
    return (document.getElementById("tool-selector") as HTMLSelectElement).value;
}

function scaleOffset(cellSize: number): { x: number, y: number } {
    const scaleFactor = (cellSize + 1) / (panningAtCellSize + 1);
    const x = Math.floor((offset.x - snap.x) * scaleFactor);
    const y = Math.floor((offset.y - snap.y) * scaleFactor);
    return { x: x, y: y };
}

function calculateDelay(speedSliderValue: number): number {
    const h = 100;
    const k = 5;
    const l = 1000;
    const a = (l - k) / Math.pow(-h, 2);
    const y = a * Math.pow(speedSliderValue - h, 2) + k;
    return y;
}

function drawGlider() {
    const center = Math.floor(chunkSize / 2)
    world.setCell(center, center - 1, true);
    world.setCell(center + 1, center, true);
    world.setCell(center - 1, center + 1, true);
    world.setCell(center, center + 1, true);
    world.setCell(center + 1, center + 1, true);
}

const chunkSize = 100;
const center = { x: Math.floor(chunkSize / 2), y: Math.floor(chunkSize / 2) };
const gridMargin = 10;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const startStopButton = document.getElementById("start-stop-button") as HTMLButtonElement;
const nextButton = document.getElementById("next-button") as HTMLButtonElement;
const resetButton = document.getElementById("reset-button") as HTMLButtonElement;
const clearButton = document.getElementById("clear-button") as HTMLButtonElement;
const cellSizeInput = document.getElementById("cell-size-input") as HTMLInputElement;
const cellSizeValue = document.getElementById("cell-size-value") as HTMLSpanElement;
const minCellSize = parseInt(cellSizeInput.min);
const maxCellSize = parseInt(cellSizeInput.max);

const ctx = canvas.getContext("2d")!;
let isRunning = false;
let world = new World();
let savedWorld: World = world;
let frameDelay = 0;
let view = { x: 0, y: 0 };
let viewWidth = 0;
let viewHeight = 0;
let viewColumns = 0;
let viewRows = 0;
let isPanning = false;
let panningFrom = { x: 0, y: 0 };
let offset = { x: 0, y: 0 };
let panningAtCellSize = 1;
let snap = { x: 0, y: 0 };

addEventListener("resize", handleResize);
addEventListener("keydown", handleKeydown);
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseleave", handleMouseLeave);
canvas.addEventListener("wheel", handleWheel);
canvas.addEventListener("contextmenu", preventContextMenuInDrawEraseMode);

drawGlider();
onCellSizeInput(false);
onSpeedInput();
handleResize();
activtateDeadChunkCleaning();
gameLoop();