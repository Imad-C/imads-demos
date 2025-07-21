export type Direction = { x: 0; y: -1 } | { x: 0; y: 1 } | { x: -1; y: 0 } | { x: 1; y: 0 }; // up down left right
type Coordinate = { x: number; y: number };

export class Game {
	board: Board;
	snake: Snake;

	constructor(canvas: HTMLCanvasElement, gridSquares: number) {
		this.board = new Board(canvas, gridSquares);
		this.snake = new Snake(this.board);

		this.draw();
	}

	update() {
		this.snake.update();
	}

	draw() {
		this.board.draw();
		this.snake.draw();
	}

	run() {
		setInterval(() => {
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
				const { x, y } = this.coordToCanvas({ x: col, y: row });
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
		{ x: 1, y: 5 },
		{ x: 1, y: 6 },
		{ x: 1, y: 7 },
		{ x: 1, y: 8 },
		{ x: 1, y: 9 }
	];
	head = this.body[0];

	constructor(board: Board) {
		this.board = board;
	}

	private move() {
		// remove tail and add to head - 'fake' movement by one square
		this.body.pop();
		this.head = { x: this.head.x + this.direction.x, y: this.head.y + this.direction.y };
		this.body.unshift(this.head);
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
