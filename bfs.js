function knights(start, target) {
    const moves = [
        [1, 2], [1, -2], [-1, 2], [-1, -2], [-2, 1], [-2, -1], [2, 1], [2, -1]
    ];

    const queue = new Queue();
    queue.enqueue(start);
    const visited = new Set([start.toString()]);
    const parentMap = {};

    while (queue.size) {
        const [x, y] = queue.dequeue();

        if (x === target[0] && y === target[1]) {
            return backtrackPath(start, target, parentMap);
        }

        for (const [dx, dy] of moves) {
            const nx = x + dx;
            const ny = y + dy;

            if (isValid(nx, ny) && !visited.has([nx, ny].toString())) {
                queue.enqueue([nx, ny]);
                visited.add([nx, ny].toString());
                parentMap[[nx, ny]] = [x, y];
            }
        }
    }

    return null;
}

function backtrackPath(start, target, parentMap) {
    const path = [target];
    let curr = parentMap[target];

    while (start.toString() !== curr.toString()) {
        path.unshift(curr);
        curr = parentMap[curr];
    }

    if (start.toString() !== target.toString()) {
        path.unshift(curr);
    }

    return path;
}

function isValid(x, y) {
    return x >= 0 && y >= 0 && x < 8 && y < 8;
}

class Queue {
    constructor () {
        this.items = {};
        this.front = 0;
        this.rear = 0;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    enqueue(item) {
        this.items[this.rear] = item;
        this.rear++;
        this.size++;
    }

    dequeue() {
        if (!this.isEmpty()) {
            const item = this.items[this.front];
            delete this.items[this.front];
            this.front++;
            this.size--;
            return item;
        }
    }
}

console.log(knights([0,0], [0,6]));
