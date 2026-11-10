

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
        { x: 3, y: 3 }, { x: 4, y: 3 },
        { x: 6, y: 3 },
        { x: 3, y: 4 }, { x: 5, y: 4 },
        { x: 6, y: 4 },
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

    // Level 11
    [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 },
    { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 4 },
    { x: 1, y: 6 }, { x: 4, y: 6 }, { x: 6, y: 6 }],

    // Level 12
    [{ x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 },
    { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
    { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7 }],

    // Level 13
    [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
    { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 },
    { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 },
    { x: 5, y: 6 }, { x: 6, y: 6 }],

    // Level 14
    [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 3 },
    { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 5, y: 3 },
    { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 },
    { x: 6, y: 5 }, { x: 6, y: 6 }],

    // Level 15
    [{ x: 0, y: 3 }, { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 },
    { x: 6, y: 3 }, { x: 7, y: 3 },
    { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 },
    { x: 5, y: 5 }, { x: 6, y: 5 }],

    // Level 16
    [{ x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
    { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 },
    { x: 1, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 4 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }],

    // Level 17
    [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 },
    { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 },
    { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 },
    { x: 2, y: 7 }, { x: 4, y: 7 }],

    // Level 18
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
    { x: 5, y: 1 }, { x: 6, y: 1 },
    { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 },
    { x: 0, y: 5 }, { x: 1, y: 5 }, { x: 6, y: 5 }],

    // Level 19
    [{ x: 2, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 0 },
    { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 },
    { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }],

    // Level 20
    [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 },
    { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 },
    { x: 0, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 },
    { x: 4, y: 5 }, { x: 7, y: 5 }],

    // Level 21
    [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 3 },
    { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 },
    { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 },
    { x: 6, y: 6 }, { x: 7, y: 6 }],

    // Level 22
    [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
    { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 },
    { x: 0, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 }],

    // Level 23
    [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
    { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
    { x: 1, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 },
    { x: 3, y: 6 }],

    // Level 24
    [{ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 },
    { x: 1, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 7, y: 4 },
    { x: 2, y: 6 }, { x: 4, y: 6 }, { x: 6, y: 6 }],

    // Level 25
    [{ x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 },
    { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 },
    { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 4, y: 4 }, { x: 7, y: 4 },
    { x: 2, y: 6 }, { x: 5, y: 6 }],

    // Level 26
    [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
    { x: 1, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 },
    { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 7, y: 5 },
    { x: 3, y: 7 }],

    // Level 27
    [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
    { x: 6, y: 2 }, { x: 7, y: 2 },
    { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 },
    { x: 1, y: 6 }, { x: 4, y: 6 }],

    // Level 28
    [{ x: 2, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 0 },
    { x: 0, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 },
    { x: 1, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 7, y: 4 },
    { x: 2, y: 6 }, { x: 4, y: 6 }],

    // Level 29
    [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 },
    { x: 5, y: 2 }, { x: 6, y: 2 },
    { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }],

    // Level 30
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 },
    { x: 7, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 },
    { x: 0, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 }],

    // Level 31
    [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 },
    { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 },
    { x: 1, y: 4 }, { x: 3, y: 4 }, { x: 6, y: 4 },
    { x: 2, y: 6 }, { x: 4, y: 6 }, { x: 6, y: 6 }],

    // Level 32
    // Level 32
    [
        { x: 0, y: 2 }, { x: 2, y: 2 },
        { x: 4, y: 2 }, { x: 6, y: 2 },

        { x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 },
        { x: 0, y: 5 }, { x: 2, y: 5 },
        { x: 4, y: 5 }, { x: 6, y: 5 }
    ],

    // Level 33
    [{ x: 1, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 },
    { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 },
    { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }],

    // Level 34
    [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
    { x: 0, y: 3 }, { x: 2, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 },
    { x: 1, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 7, y: 5 }],

    // Level 35
    [{ x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
    { x: 0, y: 3 }, { x: 1, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
    { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 },
    { x: 6, y: 6 }],

    // Level 36
    [{ x: 1, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 },
    { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 },
    { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }],

    // Level 37
    [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
    { x: 6, y: 2 }, { x: 7, y: 2 },
    { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 },
    { x: 2, y: 6 }, { x: 5, y: 6 }],

    // Level 38
    [{ x: 2, y: 0 }, { x: 5, y: 0 },
    { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 }, { x: 7, y: 2 },
    { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }],

    // Level 39
    [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 },
    { x: 2, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 },
    { x: 1, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 5 }, { x: 7, y: 5 },
    { x: 2, y: 7 }, { x: 4, y: 7 }],

    // Level 40
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
    { x: 6, y: 1 }, { x: 7, y: 1 },
    { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
    { x: 0, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }],

    // Level 41
    [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 },
    { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 },
    { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }, { x: 7, y: 6 }],

    // Level 42
    [
        { x: 0, y: 2 }, { x: 2, y: 2 },
        { x: 4, y: 2 }, { x: 6, y: 2 },

        { x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 },
        { x: 0, y: 5 }, { x: 2, y: 5 },
        { x: 4, y: 5 }, { x: 6, y: 5 },
        { x: 3, y: 7 }
    ],

    // Level 43
    [{ x: 2, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 0 },
    { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 },
    { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }, { x: 7, y: 6 }],

    // Level 44
    [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
    { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 },
    { x: 0, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 },
    { x: 1, y: 7 }, { x: 5, y: 7 }],

    // Level 45
    [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
    { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 },
    { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 },
    { x: 1, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }],

    // Level 46
    [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 }, { x: 7, y: 2 },
    { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 },
    { x: 0, y: 6 }, { x: 2, y: 6 }, { x: 4, y: 6 }, { x: 6, y: 6 }],

    // Level 47
    [{ x: 2, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 },
    { x: 1, y: 2 }, { x: 3, y: 2 }, { x: 5, y: 2 }, { x: 7, y: 2 },
    { x: 0, y: 4 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 6, y: 4 },
    { x: 1, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }],

    // Level 48
    [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
    { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 }, { x: 7, y: 3 },
    { x: 0, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 },
    { x: 1, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }],

    // Level 49
    [{ x: 1, y: 0 }, { x: 3, y: 0 }, { x: 5, y: 0 },
    { x: 0, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 6, y: 2 },
    { x: 1, y: 4 }, { x: 3, y: 4 }, { x: 5, y: 4 }, { x: 7, y: 4 },
    { x: 0, y: 6 }, { x: 2, y: 6 }, { x: 4, y: 6 }, { x: 6, y: 6 }],

    // Level 50
    [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 },
    { x: 7, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 },
    { x: 0, y: 5 }, { x: 2, y: 5 }, { x: 4, y: 5 }, { x: 6, y: 5 },
    { x: 1, y: 7 }, { x: 3, y: 7 }, { x: 5, y: 7 }],

];
const portalPositions = [
    { x: 6, y: 6 },
    { x: 2, y: 6 },
    { x: 6, y: 1 },
    { x: 0, y: 7 },
    { x: 7, y: 0 },
    { x: 1, y: 6 },
    { x: 4, y: 2 },
    { x: 7, y: 7 },
    { x: 0, y: 4 },
    { x: 4, y: 7 },
];

const levels = Array.from({ length: 50 }, (_, index) => {
    const levelNumber = index + 1;
    const portal = portalPositions[
        index % portalPositions.length
    ];
    const obstacles = obstaclePatterns[
        index % obstaclePatterns.length
    ].filter(
        (obstacle) =>
            !(obstacle.x === 1 && obstacle.y === 1) &&
            !(obstacle.x === portal.x && obstacle.y === portal.y)
    );

    const availablePositions = [];

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const onObstacle = obstacles.some(
                (obstacle) => obstacle.x === x && obstacle.y === y
            );
            const hasPlatformBelow = obstacles.some(
                (obstacle) => obstacle.x === x && obstacle.y === y + 1
            );
            const onStart = x === 1 && y === 1;
            const onPortal = x === portal.x && y === portal.y;

            if (
                !onObstacle &&
                !onStart &&
                !onPortal &&
                hasPlatformBelow
            ) {
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
        portal: { ...portal },
        obstacles,
        starTarget: {
            threeStars: 12,
            twoStars: 18,
        },
    };
});

// Automatic testing for all levels

function canReach(from, to, obstacles) {
    const blocked = new Set(
        obstacles.map(({ x, y }) => `${x},${y}`)
    );

    const queue = [from];
    const visited = new Set([`${from.x},${from.y}`]);

    const directions = [
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 1, y: 0 }
    ];

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.x === to.x && current.y === to.y) {
            return true;
        }

        for (const direction of directions) {
            const next = {
                x: current.x + direction.x,
                y: current.y + direction.y
            };

            const key = `${next.x},${next.y}`;

            if (
                next.x >= 0 && next.x < 8 &&
                next.y >= 0 && next.y < 8 &&
                !blocked.has(key) &&
                !visited.has(key)
            ) {
                visited.add(key);
                queue.push(next);
            }
        }
    }

    return false;
}

const testResults = levels.map((level, index) => {
    const obstacles = level.obstacles || [];

    const start = level.start;
    const apple = level.apple;
    const portal = level.portal;

    const obstacleSet = new Set(
        obstacles.map(({ x, y }) => `${x},${y}`)
    );

    const isBlocked = (point) =>
        obstacleSet.has(`${point.x},${point.y}`);

    const startValid = start && !isBlocked(start);
    const appleValid = apple && !isBlocked(apple);
    const portalValid = portal && !isBlocked(portal);

    const appleReachable =
        startValid && appleValid &&
        canReach(start, apple, obstacles);

    const portalReachable =
        appleValid && portalValid &&
        canReach(apple, portal, obstacles);

    const passed =
        startValid &&
        appleValid &&
        portalValid &&
        appleReachable &&
        portalReachable;

    return {
        level: index + 1,
        result: passed ? "PASS" : "FAIL",
        startValid,
        appleValid,
        portalValid,
        appleReachable,
        portalReachable
    };
});

console.table(testResults);

console.log(
    "Passed:",
    testResults.filter(item => item.result === "PASS").length
);

console.log(
    "Failed:",
    testResults.filter(item => item.result === "FAIL").length
);
export default levels;
