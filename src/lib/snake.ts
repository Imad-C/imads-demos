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
}

export class Game {
	board: Board;
	snake: Snake;
	runIntervalId: number = 0;

	constructor(canvas: HTMLCanvasElement, gridSquares: number) {
		this.board = new Board(canvas, gridSquares);
		this.snake = new Snake(this.board);

		this.draw();
	}

	reset() {
		clearInterval(this.runIntervalId);
		this.snake = new Snake(this.board);
	}

	update() {
		this.snake.update();
		if (this.snake.alive === false) {
			this.reset();
		}
	}

	draw() {
		this.board.draw();
		this.snake.draw();
	}

	run() {
		this.runIntervalId = setInterval(() => {
			this.update();
			this.draw();
		}, 100);
	}
}

class Board {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	gridSquares: number;
	squareSize: number;

	constructor(canvas: HTMLCanvasElement, gridSquares: number) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d')!;
		this.gridSquares = gridSquares;
		this.squareSize = canvas.height / gridSquares;
	}

	coordToCanvas(coord: Coordinate) {
		return { x: coord.x * this.squareSize, y: coord.y * this.squareSize };
	}

	draw() {
		this.ctx.fillStyle = 'gray';
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = 1;

		for (let col = 0; col < this.gridSquares; col++) {
			for (let row = 0; row < this.gridSquares; row++) {
				const { x, y } = this.coordToCanvas(new Coordinate(col, row));
				this.ctx.fillRect(x, y, this.squareSize, this.squareSize);
				this.ctx.strokeRect(x, y, this.squareSize, this.squareSize);
			}
		}
	}
}

class Snake {
	board: Board;
	direction: Direction = { x: 0, y: -1 };
	body: Coordinate[] = [
		new Coordinate(5, 5),
		new Coordinate(5, 6),
		new Coordinate(5, 7),
		new Coordinate(5, 8),
		new Coordinate(5, 9)
	];
	head: Coordinate = this.body[0];
	alive: boolean = true;

	constructor(board: Board) {
		this.board = board;
	}

	private checkWallCollision() {
		if (
			this.head.x < 0 ||
			this.head.x >= this.board.gridSquares ||
			this.head.y < 0 ||
			this.head.y >= this.board.gridSquares
		) {
			this.alive = false;
		}
	}

	private checkBodyCollision() {
		if (this.head.in(this.body.slice(1))) {
			this.alive = false;
		}
	}

	private move() {
		// remove tail and add to head - 'fake' movement by one square
		this.body.pop();
		this.head = new Coordinate(this.head.x + this.direction.x, this.head.y + this.direction.y);
		this.body.unshift(this.head);

		this.checkWallCollision();
		this.checkBodyCollision();
	}

	updateDirection(direction: Direction) {
		// Don't allow direction to reverse
		if (this.direction.x !== 0 && direction.x !== 0) {
			return;
		} else if (this.direction.y !== 0 && direction.y !== 0) {
			return;
		}

		this.direction = direction;
	}

	update() {
		this.move();
	}

	draw() {
		const ctx = this.board.ctx;
		ctx.fillStyle = 'green';
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;

		for (const segment of this.body) {
			const { x, y } = this.board.coordToCanvas(segment);
			ctx.fillRect(x, y, this.board.squareSize, this.board.squareSize);
			ctx.strokeRect(x, y, this.board.squareSize, this.board.squareSize);
		}
	}
}
