
const levels = [
    {
        level: 1,
        start: { x: 1, y: 1 },
        apple: { x: 4, y: 4 },
        portal: { x: 6, y: 6 },
        obstacles: [
            { x: 3, y: 2 },
            { x: 4, y: 2 },
            { x: 2, y: 4 },
            { x: 4, y: 5 }
        ]
    },
    {
        level: 2,
        start: { x: 1, y: 1 },
        apple: { x: 5, y: 2 },
        portal: { x: 6, y: 6 },
        obstacles: [
            { x: 3, y: 1 },
            { x: 3, y: 2 },
            { x: 3, y: 3 },
            { x: 5, y: 4 },
            { x: 5, y: 5 },
            { x: 2, y: 5 }
        ]
    }
];

export default levels;
