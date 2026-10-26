

const obstaclePatterns = [
    [
        ...Array.from({ length: 6 }, (_, i) => ({ x: i, y: 2 })),
        ...Array.from({ length: 5 }, (_, i) => ({ x: i + 3, y: 4 })),
        ...Array.from({ length: 3 }, (_, i) => ({ x: i, y: 6 })),
    ],

    [
        ...Array.from({ length: 5 }, (_, i) => ({ x: 2, y: i })),
        ...Array.from({ length: 5 }, (_, i) => ({ x: 5, y: i + 2 })),
        { x: 3, y: 5 },
        { x: 4, y: 5 },
    ],

    [
        ...Array.from({ length: 7 }, (_, i) => ({ x: i, y: 3 })),
        ...Array.from({ length: 6 }, (_, i) => ({ x: i + 1, y: 5 })),
        { x: 2, y: 1 },
        { x: 5, y: 1 },
    ],

    [
        { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
        { x: 1, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 },
        { x: 1, y: 3 }, { x: 6, y: 3 },
        { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 6, y: 4 },
        { x: 2, y: 5 }, { x: 5, y: 5 },
        { x: 1, y: 6 }, { x: 5, y: 6 },
    ],

    [
        ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: 3 })),
        ...Array.from({ length: 4 }, (_, i) => ({ x: 3, y: i })),
        { x: 0, y: 5 },
        { x: 1, y: 5 },
        { x: 5, y: 1 },
        { x: 6, y: 1 },
        { x: 5, y: 5 },
        { x: 5, y: 6 },
    ],

    [
        ...Array.from({ length: 5 }, (_, i) => ({ x: i + 2, y: 1 })),
        ...Array.from({ length: 5 }, (_, i) => ({ x: i, y: 3 })),
        ...Array.from({ length: 5 }, (_, i) => ({ x: i + 2, y: 5 })),
        { x: 1, y: 6 }, { x: 2, y: 6 },
    ],

    [
        { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 },
        { x: 2, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 },
        { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 6, y: 3 },
        { x: 1, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 },
        { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 },
    ],

    [
        ...Array.from({ length: 6 }, (_, i) => ({ x: i + 1, y: 2 })),
        ...Array.from({ length: 6 }, (_, i) => ({ x: i, y: 4 })),
        ...Array.from({ length: 5 }, (_, i) => ({ x: i + 2, y: 6 })),
        { x: 1, y: 5 }, { x: 6, y: 1 },
    ],

    [
        { x: 2, y: 1 }, { x: 3, y: 1 },
        { x: 5, y: 1 }, { x: 6, y: 1 },
        { x: 2, y: 2 }, { x: 5, y: 2 },
        { x: 1, y: 3 }, { x: 3, y: 3 },
        { x: 4, y: 3 }, { x: 6, y: 3 },
        { x: 1, y: 4 }, { x: 3, y: 4 },
        { x: 5, y: 4 }, { x: 6, y: 4 },
        { x: 2, y: 5 }, { x: 4, y: 5 },
        { x: 2, y: 6 }, { x: 3, y: 6 },
        { x: 5, y: 6 },
    ],

    [
        ...Array.from({ length: 5 }, (_, i) => ({ x: i + 2, y: 1 })),
        ...Array.from({ length: 4 }, (_, i) => ({ x: i, y: 2 })),
        ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: 4 })),
        ...Array.from({ length: 4 }, (_, i) => ({ x: i, y: 6 })),
        { x: 6, y: 3 }, { x: 6, y: 5 },
    ],
];

const applePositions = [
    { x: 4, y: 4 },
    { x: 5, y: 2 },
    { x: 2, y: 4 },
    { x: 6, y: 2 },
    { x: 4, y: 6 },
    { x: 1, y: 5 },
    { x: 5, y: 5 },
    { x: 2, y: 6 },
    { x: 6, y: 4 },
    { x: 3, y: 6 },
];

const levels = Array.from({ length: 50 }, (_, index) => {
    const levelNumber = index + 1;

    const obstacles = obstaclePatterns[
        index % obstaclePatterns.length
    ].filter(
        (obstacle) =>
            !(obstacle.x === 1 && obstacle.y === 1) &&
            !(obstacle.x === 6 && obstacle.y === 6)
    );

    const availablePositions = [];

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const onObstacle = obstacles.some(
                (obstacle) => obstacle.x === x && obstacle.y === y
            );

            const onStart = x === 1 && y === 1;
            const onPortal = x === 6 && y === 6;

            if (!onObstacle && !onStart && !onPortal) {
                availablePositions.push({ x, y });
            }
        }
    }

    const apple = availablePositions[
        (index * 7) % availablePositions.length
    ];


    return {
        level: levelNumber,
        start: { x: 1, y: 1 },
        apple: { ...apple },
        portal: { x: 6, y: 6 },
        obstacles,
    };
});

export default levels;
