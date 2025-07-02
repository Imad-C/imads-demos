type Coordinate = { x: number; y: number };

export class Game {
	board: Board;
	snake: Snake;

	constructor(canvas: HTMLCanvasElement, gridSquares: number) {
		this.board = new Board(canvas, gridSquares);
		this.snake = new Snake(this.board);

		this.draw();
	}

	update() {}

	draw() {
		this.board.draw();
		this.snake.draw();
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
	body: Coordinate[] = [
		{ x: 1, y: 1 },
		{ x: 1, y: 2 }
	];

	constructor(board: Board) {
		this.board = board;
	}

	update() {}

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
