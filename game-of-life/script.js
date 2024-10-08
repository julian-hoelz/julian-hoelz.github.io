var Chunk = /** @class */ (function () {
    function Chunk(x, y) {
        this.x = x;
        this.y = y;
        this.cells = Array.from({ length: chunkSize }, function () { return Array(chunkSize).fill(false); });
    }
    Chunk.prototype.getCell = function (x, y) {
        return this.cells[y][x];
    };
    Chunk.prototype.setCell = function (x, y, value) {
        this.cells[y][x] = value;
    };
    Chunk.prototype.isDead = function () {
        return this.cells.every(function (row) { return row.every(function (cell) { return !cell; }); });
    };
    Chunk.prototype.isRowDead = function (n) {
        return this.cells[n].every(function (cell) { return !cell; });
    };
    Chunk.prototype.isColumnDead = function (n) {
        return this.cells.every(function (row) { return !row[n]; });
    };
    return Chunk;
}());
var World = /** @class */ (function () {
    function World() {
        this.isStable = false;
        this.changesMade = false;
        this.chunks = new Map();
    }
    World.prototype.getChunk = function (x, y) {
        return this.chunks.get(World.getChunkKey(x, y));
    };
    World.prototype.getOrCreateChunk = function (x, y) {
        var chunk = this.getChunk(x, y);
        if (chunk)
            return chunk;
        var key = World.getChunkKey(x, y);
        var newChunk = new Chunk(x, y);
        this.chunks.set(key, newChunk);
        return newChunk;
    };
    World.prototype.getCell = function (x, y) {
        var chunkX = Math.floor(x / chunkSize);
        var chunkY = Math.floor(y / chunkSize);
        var chunk = this.getChunk(chunkX, chunkY);
        if (!chunk)
            return false;
        var cellX = (x % chunkSize + chunkSize) % chunkSize;
        var cellY = (y % chunkSize + chunkSize) % chunkSize;
        return chunk.getCell(cellX, cellY);
    };
    World.prototype.setCell = function (x, y, value) {
        var chunkX = Math.floor(x / chunkSize);
        var chunkY = Math.floor(y / chunkSize);
        var chunk = this.getOrCreateChunk(chunkX, chunkY);
        var cellX = ((x % chunkSize) + chunkSize) % chunkSize;
        var cellY = ((y % chunkSize) + chunkSize) % chunkSize;
        var valueBefore = chunk.getCell(cellX, cellY);
        if (valueBefore === value)
            return;
        chunk.setCell(cellX, cellY, value);
        if (value)
            this.addNeighboringChunksIfNeeded(cellX, cellY, chunk);
        this.changesMade = true;
    };
    World.prototype.cleanUpDeadChunks = function () {
        var _this = this;
        this.chunks.forEach(function (chunk, key) {
            if (chunk.isDead() && _this.isIsolated(chunk)) {
                _this.chunks.delete(key);
            }
        });
    };
    World.prototype.isIsolated = function (chunk) {
        var leftNeighboringChunk = this.getChunk(chunk.x - 1, chunk.y);
        if (leftNeighboringChunk && !leftNeighboringChunk.isRowDead(chunkSize - 1))
            return false;
        var rightNeighboringChunk = this.getChunk(chunk.x + 1, chunk.y);
        if (rightNeighboringChunk && !rightNeighboringChunk.isRowDead(0))
            return false;
        var topNeighboringChunk = this.getChunk(chunk.x, chunk.y - 1);
        if (topNeighboringChunk && !topNeighboringChunk.isColumnDead(chunkSize - 1))
            return false;
        var bottomNeighboringChunk = this.getChunk(chunk.x, chunk.y + 1);
        if (bottomNeighboringChunk && !bottomNeighboringChunk.isColumnDead(0))
            return false;
        return true;
    };
    World.prototype.drawCells = function (cellSize, scaledOffset) {
        var startX = Math.floor(-scaledOffset.x / (cellSize + 1));
        var startY = Math.floor(-scaledOffset.y / (cellSize + 1));
        var endX = startX + viewColumns;
        var endY = startY + viewRows;
        ctx.fillStyle = "black";
        for (var y = startY; y <= endY; y++) {
            for (var x = startX; x <= endX; x++) {
                var worldX = center.x - Math.floor(viewColumns / 2) + x;
                var worldY = center.y - Math.floor(viewRows / 2) + y;
                if (this.getCell(worldX, worldY)) {
                    drawCell(x, y, cellSize, scaledOffset);
                }
            }
        }
    };
    World.prototype.computeNextGenerationWorld = function () {
        var _this = this;
        var nextGenerationWorld = this.copyWithDeadChunks();
        var change = false;
        this.chunks.forEach(function (chunk, _) {
            var currentNextGenerationWorldChunk = nextGenerationWorld.getChunk(chunk.x, chunk.y);
            for (var y = 0; y < chunkSize; y++) {
                for (var x = 0; x < chunkSize; x++) {
                    var alive = chunk.getCell(x, y);
                    var aliveNeighbors = _this.countAliveNeighbors(chunk.x * chunkSize + x, chunk.y * chunkSize + y);
                    if (alive) {
                        if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                            currentNextGenerationWorldChunk.setCell(x, y, true);
                        }
                        else {
                            change = true;
                        }
                    }
                    else if (aliveNeighbors === 3) {
                        currentNextGenerationWorldChunk.setCell(x, y, true);
                        nextGenerationWorld.addNeighboringChunksIfNeeded(x, y, chunk);
                        change = true;
                    }
                }
            }
        });
        nextGenerationWorld.isStable = !change;
        return nextGenerationWorld;
    };
    World.prototype.copyWithDeadChunks = function () {
        var newWorld = new World();
        this.chunks.forEach(function (chunk, key) {
            var newChunk = new Chunk(chunk.x, chunk.y);
            newWorld.chunks.set(key, newChunk);
        });
        return newWorld;
    };
    World.prototype.addNeighboringChunksIfNeeded = function (x, y, chunk) {
        if (x === 0) {
            this.getOrCreateChunk(chunk.x - 1, chunk.y);
        }
        else if (x === chunkSize - 1) {
            this.getOrCreateChunk(chunk.x + 1, chunk.y);
        }
        if (y === 0) {
            this.getOrCreateChunk(chunk.x, chunk.y - 1);
        }
        else if (y === chunkSize - 1) {
            this.getOrCreateChunk(chunk.x, chunk.y + 1);
        }
    };
    World.prototype.countAliveNeighbors = function (cellX, cellY) {
        var count = 0;
        var neighbors = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        for (var _i = 0, neighbors_1 = neighbors; _i < neighbors_1.length; _i++) {
            var _a = neighbors_1[_i], dy = _a[0], dx = _a[1];
            var neighborX = cellX + dx;
            var neighborY = cellY + dy;
            if (this.getCell(neighborX, neighborY)) {
                count++;
            }
        }
        return count;
    };
    World.getChunkKey = function (x, y) {
        return "".concat(x, ",").concat(y);
    };
    return World;
}());
function handleResize() {
    var computedStyle = getComputedStyle(canvas);
    var cssWidth = parseInt(computedStyle.width);
    var cssHeight = parseInt(computedStyle.height);
    canvas.width = cssWidth;
    canvas.height = cssHeight;
    renderGrid();
}
function handleKeydown(event) {
    if (event.repeat)
        return;
    if (event.key !== " ")
        return;
    event.preventDefault();
    startStopButtonClicked();
}
function handleMouseDown(event) {
    if (!(event.button === 0 || event.button === 2))
        return;
    var cellSize = parseInt(cellSizeInput.value);
    var mousePosition = getMousePosition(event);
    if (getTool() === "draw-erase-tool") {
        drawOrErase(event.button === 0, mousePosition);
    }
    else if (event.button === 0) {
        isPanning = true;
        panningFrom = mousePosition;
        panningAtCellSize = cellSize;
        canvas.style.cursor = "grabbing";
    }
    renderGrid();
}
function handleMouseUp(event) {
    if (event.button !== 0)
        return;
    stopPanning();
}
function handleMouseLeave(_) {
    stopPanning();
}
function stopPanning() {
    if (getTool() !== "pan-tool")
        return;
    if (!isPanning)
        return;
    snapToGrid();
    renderGrid();
    isPanning = false;
    canvas.style.cursor = "default";
}
function handleMouseMove(event) {
    if (!(event.buttons & 1 || event.buttons & 2))
        return;
    var mousePosition = getMousePosition(event);
    if (getTool() === "draw-erase-tool") {
        drawOrErase(!!(event.buttons & 1), mousePosition);
    }
    else if (isPanning && event.buttons & 1) {
        var dx = mousePosition.x - panningFrom.x;
        var dy = mousePosition.y - panningFrom.y;
        offset.x += dx;
        offset.y += dy;
        panningFrom = mousePosition;
    }
    renderGrid();
}
function drawOrErase(value, mousePosition) {
    var cellSize = parseInt(cellSizeInput.value);
    var _a = getWorldPosition(mousePosition, cellSize), worldX = _a[0], worldY = _a[1];
    world.setCell(worldX, worldY, value);
    if (world.changesMade) {
        savedWorld = world;
        startStopButton.disabled = false;
        nextButton.disabled = false;
        resetButton.disabled = true;
        clearButton.disabled = false;
    }
}
function handleWheel(event) {
    var cellSize = parseInt(cellSizeInput.value);
    event.preventDefault();
    console.log(event.deltaY);
    if (event.deltaY < 0) {
        cellSizeInput.value = Math.min(maxCellSize, cellSize + 1).toString();
    }
    else {
        cellSizeInput.value = Math.max(minCellSize, cellSize - 1).toString();
    }
    onCellSizeInput(true);
}
function preventContextMenuInDrawEraseMode(event) {
    if (getTool() === "draw-erase-tool") {
        event.preventDefault();
    }
}
function onCellSizeInput(render) {
    cellSizeValue.textContent = cellSizeInput.value;
    if (render) {
        renderGrid();
    }
}
function onSpeedInput() {
    var speedInput = document.getElementById("speed-input");
    frameDelay = calculateDelay(parseInt(speedInput.value));
}
function startStopButtonClicked() {
    isRunning = !isRunning;
    if (isRunning)
        resetButton.disabled = false;
    var newText = isRunning ? "Stop" : "Start";
    startStopButton.textContent = newText;
    nextButton.disabled = isRunning;
}
function nextButtonClicked() {
    computeNextGenerationWorld();
    resetButton.disabled = false;
}
function resetButtonClicked() {
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
function clearButtonClicked() {
    world = new World();
    renderGrid();
    startStopButton.disabled = true;
    startStopButton.textContent = "Start";
    nextButton.disabled = true;
    resetButton.disabled = false;
    clearButton.disabled = true;
}
function activtateDeadChunkCleaning() {
    setInterval(function () {
        world.cleanUpDeadChunks();
    }, 30000);
}
function gameLoop() {
    if (isRunning) {
        computeNextGenerationWorld();
    }
    setTimeout(function () {
        requestAnimationFrame(gameLoop);
    }, frameDelay);
}
function computeNextGenerationWorld() {
    world = world.computeNextGenerationWorld();
    if (world.isStable) {
        isRunning = false;
        startStopButton.disabled = true;
        startStopButton.textContent = "Start";
        nextButton.disabled = true;
    }
    else {
        renderGrid();
    }
}
function renderGrid() {
    var _a;
    var cellSize = parseInt(cellSizeInput.value);
    ctx.fillStyle = "#232323";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    _a = calculateGridSize(cellSize), viewColumns = _a[0], viewRows = _a[1];
    viewWidth = viewColumns * (cellSize + 1) - 1;
    viewHeight = viewRows * (cellSize + 1) - 1;
    view.x = Math.floor((canvas.width - viewWidth) / 2);
    view.y = Math.floor((canvas.height - viewHeight) / 2);
    ctx.fillStyle = "white";
    ctx.fillRect(view.x, view.y, viewWidth, viewHeight);
    var scaledOffset = scaleOffset(cellSize);
    world.drawCells(cellSize, scaledOffset);
    ctx.strokeStyle = "#818181";
    ctx.lineWidth = 1;
    var lineX = scaledOffset.x % (cellSize + 1) + view.x - 1;
    if (lineX < view.x)
        lineX += cellSize + 1;
    while (lineX < viewWidth + view.x - 1) {
        drawLine(lineX, view.y, lineX, view.y + viewHeight - 1);
        lineX += cellSize + 1;
    }
    var lineY = scaledOffset.y % (cellSize + 1) + view.y - 1;
    if (lineY < view.y)
        lineY += cellSize + 1;
    while (lineY < viewHeight + view.y - 1) {
        drawLine(view.x, lineY, view.x + viewWidth - 1, lineY);
        lineY += cellSize + 1;
    }
}
function drawCell(x, y, cellSize, scaledOffset) {
    var cellX = x * (cellSize + 1) + view.x + scaledOffset.x;
    var cellY = y * (cellSize + 1) + view.y + scaledOffset.y;
    var cellWidth = cellSize;
    var cellHeight = cellSize;
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
    var cellSize = parseInt(cellSizeInput.value);
    snap.x = offset.x % (cellSize + 1);
    snap.y = offset.y % (cellSize + 1);
}
function getWorldPosition(mousePosition, cellSize) {
    var scaledOffset = scaleOffset(cellSize);
    var worldX = center.x - Math.floor(viewColumns / 2) + Math.floor((mousePosition.x - scaledOffset.x) / (cellSize + 1));
    var worldY = center.y - Math.floor(viewRows / 2) + Math.floor((mousePosition.y - scaledOffset.y) / (cellSize + 1));
    return [worldX, worldY];
}
function calculateGridSize(cellSize) {
    var columns = Math.floor((canvas.width - 2 * gridMargin) / (cellSize + 1));
    var rows = Math.floor((canvas.height - 2 * gridMargin) / (cellSize + 1));
    return [columns, rows];
}
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1 + 0.5, y1 + 0.5);
    ctx.lineTo(x2 + 0.5, y2 + 0.5);
    ctx.stroke();
}
function getMousePosition(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left - view.x;
    var mouseY = event.clientY - rect.top - view.y;
    return { x: mouseX, y: mouseY };
}
function getTool() {
    return document.getElementById("tool-selector").value;
}
function scaleOffset(cellSize) {
    var scaleFactor = (cellSize + 1) / (panningAtCellSize + 1);
    var x = Math.floor((offset.x - snap.x) * scaleFactor);
    var y = Math.floor((offset.y - snap.y) * scaleFactor);
    return { x: x, y: y };
}
function calculateDelay(speedSliderValue) {
    var h = 100;
    var k = 5;
    var l = 1000;
    var a = (l - k) / Math.pow(-h, 2);
    var y = a * Math.pow(speedSliderValue - h, 2) + k;
    return y;
}
function drawGlider() {
    var center = Math.floor(chunkSize / 2);
    world.setCell(center, center - 1, true);
    world.setCell(center + 1, center, true);
    world.setCell(center - 1, center + 1, true);
    world.setCell(center, center + 1, true);
    world.setCell(center + 1, center + 1, true);
}
var chunkSize = 100;
var center = { x: Math.floor(chunkSize / 2), y: Math.floor(chunkSize / 2) };
var gridMargin = 10;
var canvas = document.getElementById("canvas");
var startStopButton = document.getElementById("start-stop-button");
var nextButton = document.getElementById("next-button");
var resetButton = document.getElementById("reset-button");
var clearButton = document.getElementById("clear-button");
var cellSizeInput = document.getElementById("cell-size-input");
var cellSizeValue = document.getElementById("cell-size-value");
var minCellSize = parseInt(cellSizeInput.min);
var maxCellSize = parseInt(cellSizeInput.max);
var ctx = canvas.getContext("2d");
var isRunning = false;
var world = new World();
var savedWorld = world;
var frameDelay = 0;
var view = { x: 0, y: 0 };
var viewWidth = 0;
var viewHeight = 0;
var viewColumns = 0;
var viewRows = 0;
var isPanning = false;
var panningFrom = { x: 0, y: 0 };
var offset = { x: 0, y: 0 };
var panningAtCellSize = 1;
var snap = { x: 0, y: 0 };
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
