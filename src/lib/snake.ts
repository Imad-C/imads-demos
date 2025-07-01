export type Direction = { x: -1 | 0 | 1; y: -1 | 0 | 1 };

class Segment {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw(board: HTMLElement, isHead = false) {
		const segmentElement = document.createElement('div');
		segmentElement.style.gridColumnStart = String(this.x);
		segmentElement.style.gridRowStart = String(this.y);
		segmentElement.classList.add('snake');
		if (isHead) segmentElement.classList.add('snake-head');
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
		// make the tail the head
		this.head = new Segment(this.head.x + this.direction.x, this.head.y + this.direction.y);
		this.body.unshift(this.head);
		this.body.pop();
	}

	update() {}

	draw(board: HTMLElement) {
		board.innerHTML = '';
		for (let i = 0; i < this.body.length; i++) {
			this.body[i].draw(board, i === 0);
		}
	}
}

// export class Game() {}
