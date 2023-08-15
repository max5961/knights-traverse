function knights (start, target, path = new Set(), memo = {shortest: Infinity, path: undefined}) {
    const [x, y] = start;

    if (x === target[0] && y === target[1]) {
        path.add(start.toString());
        return path;
    }

    if (!isValid(start, path, memo)) {
        return null;
    }

    const moves = [
        [1,2], [1,-2], [-1, 2], [-1,-2], [2, 1], [2, -1], [-2, 1], [-2, -1]
    ];

    for (const [dx, dy] of moves) {
        const newX = x + dx;
        const newY = y + dy;

        path.add(start.toString());

        const result = knights([newX, newY], target, new Set(path), memo);
        if (result) {
            if (result.size < memo.shortest) {
                memo.shortest = result.size;
                memo.path = result;
            }
        }
    }

    if (memo.path) {
        return memo.path;
    } else {
        return null;
    }
}

function isValid(start, path, memo) {
    const [x, y] = start;
    if (x < 0 || y < 0 || x > 7 || y > 7) {
        return false;
    }
    if (path.has(start.toString())) {
        return false;
    }
    if (path.size >= memo.shortest) {
        return false;
    }

    return true;
}

console.log(knights([0,0], [0,6]));

