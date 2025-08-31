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
		context.fillRect(x, y, squareSize, squareSize);
		context.strokeRect(x, y, squareSize, squareSize);
	}

	private toCanvas(squareSize: number): { x: number; y: number } {
		return { x: this.x * squareSize, y: this.y * squareSize };
	}
}

export class Game {
	board: Board;
	snake: Snake;
	runIntervalId: number = 0;
	food: Food | null = null;

	constructor(canvas: HTMLCanvasElement, gridSquares: number) {
		this.board = new Board(canvas, gridSquares);
		this.snake = new Snake(this.board);

		this.draw();
	}

	checkFoodCollision() {
		if (this.food?.body.equals(this.snake.head)) {
			this.snake.addToHead(this.food.body);
			this.food = null;
		}
	}

	reset(): void {
		clearInterval(this.runIntervalId);
		this.snake = new Snake(this.board);
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
		this.runIntervalId = setInterval(() => {
			this.update();
			this.draw();
		}, 100);
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

	draw(): void {
		this.setStyle({ fillStyle: 'gray', strokeStyle: 'black', lineWidth: 1 });

		for (const square of this.grid) {
			square.draw(this.ctx, this.squareSize);
		}
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
			segment.draw(this.board.ctx, this.board.squareSize);
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
		this.body.draw(board.ctx, board.squareSize);
	}
}
