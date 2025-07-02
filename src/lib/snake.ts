export type Direction = { x: -1 | 0 | 1; y: -1 | 0 | 1 };

class Segment {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw(board: HTMLElement, classNames: string[] = ['snake']) {
		const segmentElement = document.createElement('div');
		segmentElement.style.gridColumnStart = String(this.x);
		segmentElement.style.gridRowStart = String(this.y);
		for (const className of classNames) segmentElement.classList.add(className);
		board.appendChild(segmentElement);
	}
}

export class Snake {
	direction: Direction = { x: 0, y: -1 };
	body: Segment[] = [new Segment(11, 10), new Segment(11, 11)];
	head: Segment = this.body[0];

	changeDirection(direction: Direction) {
		if (direction.x && direction.y) return;
		else if (direction.x && this.direction.x) return;
		else if (direction.y && this.direction.y) return;
		else this.direction = direction;
	}

	move() {
		// move the tail to the head to 'fake' snake moving by one square
		this.head = new Segment(this.head.x + this.direction.x, this.head.y + this.direction.y);
		this.body.unshift(this.head);
		this.body.pop();
	}

	update() {}

	draw(board: HTMLElement) {
		board.innerHTML = '';
		for (let i = 0; i < this.body.length; i++) {
			this.body[i].draw(board, ['snake', i === 0 ? 'snake-head' : '']);
		}
	}
}

export class Game {
	board: HTMLElement;
	snake: Snake;
	food: Segment | null = null;

	constructor(board: HTMLElement, snake: Snake) {
		this.board = board;
		this.snake = snake;
	}

	makeFood() {
		const x = Math.floor(Math.random() * 21);
		const y = Math.floor(Math.random() * 21);
		this.food = new Segment(x, y);
	}

	// update() {
	// 	if (!this.food)
	// }

	draw() {}
}
