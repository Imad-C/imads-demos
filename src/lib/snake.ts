export type Direction = { x: 0; y: -1 } | { x: 0; y: 1 } | { x: -1; y: 0 } | { x: 1; y: 0 }; // up down left right

class Coordinate {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	equals(other: Coordinate): boolean {
		return this.x === other.x && this.y === other.y;
	}

	in(array: Coordinate[]): boolean {
		return array.some((coord) => this.equals(coord));
	}

	draw(context: CanvasRenderingContext2D, squareSize: number): void {
		const { x, y } = this.toCanvas(squareSize);
		context.beginPath();
		context.fillRect(x, y, squareSize, squareSize);
		context.strokeRect(x, y, squareSize, squareSize);
	}

	drawRounded(context: CanvasRenderingContext2D, squareSize: number): void {
		const { x, y } = this.toCanvas(squareSize);

		const shrunkSquareSize = squareSize * 0.96; // shrink factor
		const padding = (squareSize - shrunkSquareSize) / 2; // padding must go on either side, so divide by 2
		const xPadded = x + padding;
		const yPadded = y + padding;

		context.beginPath();
		context.roundRect(xPadded, yPadded, shrunkSquareSize, shrunkSquareSize, [4]);
		context.fill();

		return;
	}

	// WIP: Draw direction of Coord - requires a direction property
	// drawDirection(context: CanvasRenderingContext2D, squareSize: number): void {
	// 	if (!this.direction) {
	// 		throw new Error('Cannot draw Coordiante direction with no direction property.');
	// 	}

	// 	const { x, y } = this.toCanvas(squareSize);
	// 	const halfSquare = squareSize / 2;
	// 	const xMid = x + halfSquare;
	// 	const yMid = y + halfSquare;

	// 	// direction vector
	// 	const dx = this.direction.x;
	// 	const dy = this.direction.y;

	// 	const xEdge = xMid + dx * halfSquare * 0.9;
	// 	const yEdge = yMid + dy * halfSquare * 0.9;

	// 	context.beginPath();
	// 	context.moveTo(xMid, yMid);
	// 	context.lineTo(xEdge, yEdge);
	// 	context.stroke();
	// }

	private toCanvas(squareSize: number): { x: number; y: number } {
		return { x: this.x * squareSize, y: this.y * squareSize };
	}
}

export class Game {
	running: boolean = false;
	board: Board;
	snake: Snake;
	gameSpeed: number = 100; // Game updates 10 times every second
	runIntervalId: number = 0;
	food: Food | null = null;
	score: number = 0;

	constructor(canvas: HTMLCanvasElement, gridSquares: number, gameSpeedMultiplier: number = 1) {
		this.board = new Board(canvas, gridSquares);
		this.snake = new Snake(this.board);
		// devide here as a smaller `gameSpeed` means a smaller interval in `run()`
		this.gameSpeed /= gameSpeedMultiplier;

		this.draw();
	}

	onStop?: () => void;
	onScore?: (score: number) => void;

	checkFoodCollision() {
		if (this.food?.body.equals(this.snake.head)) {
			this.snake.addToHead(this.food.body);
			this.food = null;
			this.score++;
			this.onScore?.(this.score);
		}
	}

	reset(): void {
		clearInterval(this.runIntervalId);
		this.running = false;
		this.snake = new Snake(this.board);
		// Need onStop before onScore so onStop has access to final score before score is reset
		this.onStop?.();
		this.score = 0;
		this.onScore?.(this.score);
	}

	update(): void {
		this.snake.update();
		if (this.snake.alive === false) this.reset();
		if (!this.food) this.food = new Food(this);
		this.checkFoodCollision();
	}

	draw(): void {
		this.board.draw();
		this.snake.draw();
		this.food?.draw();
	}

	run(): void {
		this.running = true;
		this.runIntervalId = setInterval(() => {
			this.update();
			this.draw();
		}, this.gameSpeed);
	}
}

class Board {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	grid: Coordinate[] = [];
	gridSquares: number;
	squareSize: number;

	constructor(canvas: HTMLCanvasElement, gridSquares: number) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d')!;
		this.gridSquares = gridSquares;
		this.squareSize = canvas.height / gridSquares;
		this.initGrid();
	}

	private initGrid(): void {
		for (let col = 0; col < this.gridSquares; col++) {
			for (let row = 0; row < this.gridSquares; row++) {
				this.grid.push(new Coordinate(col, row));
			}
		}
	}

	setStyle({
		fillStyle,
		strokeStyle,
		lineWidth
	}: { fillStyle?: string; strokeStyle?: string; lineWidth?: number } = {}): void {
		if (fillStyle) this.ctx.fillStyle = fillStyle;
		if (strokeStyle) this.ctx.strokeStyle = strokeStyle;
		if (lineWidth) this.ctx.lineWidth = lineWidth;
	}

	private drawBorder(): void {
		this.setStyle({ strokeStyle: 'black', lineWidth: 1 });
		const half = this.ctx.lineWidth / 2;
		this.ctx.beginPath();
		this.ctx.roundRect(
			half,
			half,
			this.canvas.width - this.ctx.lineWidth,
			this.canvas.height - this.ctx.lineWidth,
			[4]
		);
		this.ctx.stroke();
	}

	draw(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (const square of this.grid) {
			// choose color based on coordinate parity to alternate colours
			const isDark = (square.x + square.y) % 2 === 0;
			this.setStyle({ fillStyle: isDark ? 'rgb(240, 240, 240)' : 'rgb(225, 225, 225)' });
			square.drawRounded(this.ctx, this.squareSize);
		}
		this.drawBorder();

		return;
	}
}

class Snake {
	board: Board;
	direction: Direction = { x: 0, y: -1 };
	directionChanged: boolean = false; // needed to prevent two direction changes in single 'tick'
	body!: Coordinate[]; // assigned by initSnake in constructor
	head!: Coordinate; // assigned by initSnake in constructor
	alive: boolean = true;

	constructor(board: Board) {
		this.board = board;
		this.initSnake();
	}

	private initSnake(): void {
		const boardCenter = Math.floor(this.board.gridSquares / 2);
		this.body = [
			new Coordinate(boardCenter, boardCenter),
			new Coordinate(boardCenter, boardCenter + 1)
		];
		this.head = this.body[0];
	}

	private checkWallCollision(): void {
		if (
			this.head.x < 0 ||
			this.head.x >= this.board.gridSquares ||
			this.head.y < 0 ||
			this.head.y >= this.board.gridSquares
		) {
			this.alive = false;
		}
	}

	private checkBodyCollision(): void {
		if (this.head.in(this.body.slice(1))) {
			this.alive = false;
		}
	}

	private move(): void {
		// remove tail and add to head - 'fake' movement by one square
		this.body.pop();
		this.head = new Coordinate(this.head.x + this.direction.x, this.head.y + this.direction.y);
		this.body.unshift(this.head);

		this.checkWallCollision();
		this.checkBodyCollision();
	}

	addToHead(coord: Coordinate) {
		this.body.unshift(coord);
	}

	updateDirection(direction: Direction): void {
		if (this.directionChanged) return;

		// Don't allow direction to reverse
		if (this.direction.x !== 0 && direction.x !== 0) {
			return;
		} else if (this.direction.y !== 0 && direction.y !== 0) {
			return;
		}

		this.direction = direction;
		this.directionChanged = true;
	}

	update(): void {
		this.move();
		this.directionChanged = false;
	}

	draw(): void {
		this.board.setStyle({ fillStyle: 'green', strokeStyle: 'black', lineWidth: 1 });

		for (const segment of this.body) {
			segment.drawRounded(this.board.ctx, this.board.squareSize);
		}
	}
}

class Food {
	game: Game;
	body: Coordinate;

	constructor(game: Game) {
		this.game = game;
		this.body = this.spawn();
	}

	spawn() {
		const allowedCoords = [];
		for (const coord of this.game.board.grid) {
			if (coord.in(this.game.snake.body)) continue;
			allowedCoords.push(coord);
		}
		return allowedCoords[Math.floor(Math.random() * allowedCoords.length)];
	}

	draw() {
		const board = this.game.board;
		board.setStyle({ fillStyle: 'orange', strokeStyle: 'black', lineWidth: 1 });
		this.body.drawRounded(board.ctx, board.squareSize);
	}
}
