
const platform = (y, startX, endX) =>
    Array.from(
        { length: endX - startX + 1 },
        (_, i) => ({ x: startX + i, y })
    );

const levels = [
    // LEVEL 1 - Beginner
    {
        level: 1,
        start: { x: 1, y: 1 },
        apple: { x: 3, y: 1 },
        portal: { x: 6, y: 3 },
        obstacles: [
            ...platform(2, 0, 5),
            ...platform(4, 6, 7),
        ],
        starTarget: { threeStars: 12, twoStars: 18 },
    },

    // LEVEL 2 - Small Gap
    {
        level: 2,
        start: { x: 1, y: 1 },
        apple: { x: 4, y: 3 },
        portal: { x: 6, y: 5 },
        obstacles: [
            ...platform(2, 0, 2),
            ...platform(4, 3, 5),
            ...platform(6, 6, 7),
        ],
        starTarget: { threeStars: 14, twoStars: 20 },
    },

    // LEVEL 3 - Long Platform
    {
        level: 3,
        start: { x: 1, y: 2 },
        apple: { x: 4, y: 4 },
        portal: { x: 6, y: 4 },
        obstacles: [
            ...platform(3, 0, 2),
            ...platform(5, 3, 7),
        ],
        starTarget: { threeStars: 15, twoStars: 22 },
    },

    // LEVEL 4 - Stepping Platforms
    {
        level: 4,
        start: { x: 0, y: 1 },
        apple: { x: 3, y: 2 },
        portal: { x: 6, y: 4 },
        obstacles: [
            ...platform(2, 0, 1),
            ...platform(3, 2, 4),
            ...platform(5, 5, 7),
        ],
        starTarget: { threeStars: 16, twoStars: 23 },
    },

    // LEVEL 5 - Long Route
    {
        level: 5,
        start: { x: 1, y: 3 },
        apple: { x: 4, y: 3 },
        portal: { x: 6, y: 5 },
        obstacles: [
            ...platform(4, 0, 5),
            ...platform(6, 6, 7),
        ],
        starTarget: { threeStars: 18, twoStars: 25 },
    },

    // LEVEL 6 - Wide Gap
    {
        level: 6,
        start: { x: 1, y: 1 },
        apple: { x: 5, y: 3 },
        portal: { x: 6, y: 3 },
        obstacles: [
            ...platform(2, 0, 3),
            ...platform(4, 4, 7),
        ],
        starTarget: { threeStars: 18, twoStars: 26 },
    },

    // LEVEL 7 - Different Heights
    {
        level: 7,
        start: { x: 1, y: 2 },
        apple: { x: 4, y: 4 },
        portal: { x: 6, y: 2 },
        obstacles: [
            ...platform(3, 0, 2),
            ...platform(3, 5, 7),
            ...platform(5, 3, 5),
        ],
        starTarget: { threeStars: 20, twoStars: 28 },
    },

    // LEVEL 8 - Multiple Platforms
    {
        level: 8,
        start: { x: 0, y: 4 },
        apple: { x: 0, y: 3 },
        portal: { x: 6, y: 4 },
        obstacles: [
            ...platform(5, 0, 1),
            ...platform(3, 2, 4),
            ...platform(5, 5, 7),
        ],
        starTarget: { threeStars: 21, twoStars: 30 },
    },

    // LEVEL 9 - Advanced Gap
    {
        level: 9,
        start: { x: 1, y: 1 },
        apple: { x: 4, y: 5 },
        portal: { x: 6, y: 3 },
        obstacles: [
            ...platform(2, 0, 2),
            ...platform(6, 3, 5),
            ...platform(4, 6, 7),
        ],
        starTarget: { threeStars: 23, twoStars: 32 },
    },

    // LEVEL 10 - Final Challenge
    {
        level: 10,
        start: { x: 1, y: 3 },
        apple: { x: 0, y: 3 },
        portal: { x: 6, y: 5 },
        obstacles: [
            ...platform(4, 0, 2),
            ...platform(2, 3, 5),
            ...platform(6, 6, 7),
        ],
        starTarget: { threeStars: 25, twoStars: 35 },
    },

    // LEVEL 11 - Zigzag Platforms
    {
        level: 11,
        start: { x: 1, y: 1 },
        apple: { x: 0, y: 1 },
        portal: { x: 6, y: 5 },
        obstacles: [
            ...platform(2, 0, 3),
            ...platform(4, 4, 7),
            ...platform(6, 0, 2),
        ],
        starTarget: { threeStars: 27, twoStars: 38 },
    },

    // LEVEL 12 - Split Platforms
    {
        level: 12,
        start: { x: 1, y: 2 },
        apple: { x: 0, y: 2 },
        portal: { x: 6, y: 6 },
        obstacles: [
            ...platform(3, 0, 2),
            ...platform(5, 3, 5),
            ...platform(7, 6, 7),
            ...platform(6, 0, 1),
        ],
        starTarget: { threeStars: 29, twoStars: 40 },
    },

    // LEVEL 13 - Long Zigzag
    {
        level: 13,
        start: { x: 2, y: 1 },
        apple: { x: 1, y: 1 },
        portal: { x: 6, y: 3 },
        obstacles: [
            ...platform(2, 0, 4),
            ...platform(4, 3, 7),
            ...platform(6, 0, 2),
            ...platform(7, 5, 7),
        ],
        starTarget: { threeStars: 30, twoStars: 42 },
    },

    // LEVEL 14 - Narrow Path
    {
        level: 14,
        start: { x: 1, y: 3 },
        apple: { x: 0, y: 3 },
        portal: { x: 6, y: 6 },
        obstacles: [
            ...platform(4, 0, 1),
            ...platform(2, 2, 4),
            ...platform(5, 5, 7),
            ...platform(7, 0, 3),
        ],
        starTarget: { threeStars: 32, twoStars: 44 },
    },

    // LEVEL 15 - Double Gap
    {
        level: 15,
        start: { x: 1, y: 1 },
        apple: { x: 0, y: 1 },
        portal: { x: 6, y: 5 },
        obstacles: [
            ...platform(2, 0, 2),
            ...platform(4, 3, 5),
            ...platform(6, 6, 7),
            ...platform(5, 0, 1),
        ],
        starTarget: { threeStars: 34, twoStars: 46 },
    },

    // LEVEL 16 - Multi-Level Platforms
    {
        level: 16,
        start: { x: 2, y: 2 },
        apple: { x: 1, y: 2 },
        portal: { x: 6, y: 6 },
        obstacles: [
            ...platform(3, 0, 2),
            ...platform(5, 3, 5),
            ...platform(7, 6, 7),
            ...platform(4, 6, 7),
            ...platform(6, 0, 1),
        ],
        starTarget: { threeStars: 35, twoStars: 48 },
    },

    // LEVEL 17 - Tricky Route
    {
        level: 17,
        start: { x: 1, y: 3 },
        apple: { x: 0, y: 3 },
        portal: { x: 6, y: 3 },
        obstacles: [
            ...platform(4, 0, 1),
            ...platform(2, 2, 4),
            ...platform(5, 5, 7),
            ...platform(7, 2, 5),
            ...platform(6, 0, 1),
        ],
        starTarget: { threeStars: 37, twoStars: 50 },
    },

    // LEVEL 18 - Multiple Gaps
    {
        level: 18,
        start: { x: 2, y: 1 },
        apple: { x: 1, y: 1 },
        portal: { x: 6, y: 5 },
        obstacles: [
            ...platform(2, 0, 3),
            ...platform(4, 4, 7),
            ...platform(6, 1, 3),
            ...platform(6, 5, 7),
            ...platform(7, 0, 0),
        ],
        starTarget: { threeStars: 39, twoStars: 52 },
    },

    // LEVEL 19 - Expert Puzzle
    {
        level: 19,
        start: { x: 1, y: 2 },
        apple: { x: 0, y: 2 },
        portal: { x: 6, y: 4 },
        obstacles: [
            ...platform(3, 0, 2),
            ...platform(5, 3, 5),
            ...platform(3, 6, 7),
            ...platform(7, 0, 3),
            ...platform(6, 5, 7),
        ],
        starTarget: { threeStars: 41, twoStars: 55 },
    },

    // LEVEL 20 - Ultimate Challenge
    {
        level: 20,
        start: { x: 1, y: 3 },
        apple: { x: 0, y: 3 },
        portal: { x: 6, y: 3 },
        obstacles: [
            ...platform(4, 0, 2),
            ...platform(2, 3, 5),
            ...platform(5, 5, 7),
            ...platform(7, 0, 3),
            ...platform(6, 6, 7),
            ...platform(1, 4, 7),
        ],
        starTarget: { threeStars: 45, twoStars: 60 },
    },

    // LEVEL 21 - Floating Stone Bridge
    {
        level: 21,
        start: { x: 1, y: 1 },
        apple: { x: 0, y: 1 },
        portal: { x: 6, y: 6 },
        obstacles: [
            ...platform(2, 0, 2),
            ...platform(4, 3, 3),
            ...platform(3, 4, 5),
            ...platform(5, 6, 7),
            ...platform(7, 5, 7),
            ...platform(5, 1, 2),
        ],
        starTarget: { threeStars: 45, twoStars: 58 },
    },

    // LEVEL 22 - Broken Stone Path
    {
        level: 22,
        start: { x: 2, y: 1 },
        apple: { x: 1, y: 1 },
        portal: { x: 6, y: 6 },
        obstacles: [
            ...platform(2, 1, 3),
            ...platform(4, 4, 4),
            ...platform(3, 5, 6),
            ...platform(5, 1, 2),
            ...platform(6, 3, 4),
            ...platform(7, 6, 7),
        ],
        starTarget: { threeStars: 48, twoStars: 62 },
    },

    // LEVEL 23 - High and Low Stones
    {
        level: 23,
        start: { x: 1, y: 2 },
        apple: { x: 0, y: 2 },
        portal: { x: 7, y: 5 },
        obstacles: [
            ...platform(3, 0, 2),
            ...platform(5, 3, 3),
            ...platform(4, 4, 5),
            ...platform(2, 5, 6),
            ...platform(6, 6, 6),
            ...platform(7, 5, 7),
        ],
        starTarget: { threeStars: 50, twoStars: 65 },
    },

    // LEVEL 24 - Zigzag Stone Bridge
    {
        level: 24,
        start: { x: 2, y: 1 },
        apple: { x: 1, y: 1 },
        portal: { x: 6, y: 5 },
        obstacles: [
            ...platform(2, 1, 3),
            ...platform(4, 4, 5),
            ...platform(3, 6, 6),
            ...platform(5, 1, 2),
            ...platform(7, 0, 2),
            ...platform(6, 5, 7),
        ],
        starTarget: { threeStars: 52, twoStars: 68 },
    },

    // LEVEL 25 - Floating Island Challenge
    {
        level: 25,
        start: { x: 1, y: 3 },
        apple: { x: 0, y: 3 },
        portal: { x: 6, y: 1 },
        obstacles: [
            ...platform(4, 0, 2),
            ...platform(6, 3, 3),
            ...platform(5, 4, 5),
            ...platform(3, 6, 7),
            ...platform(2, 3, 4),
            ...platform(7, 5, 7),
        ],
        starTarget: { threeStars: 54, twoStars: 70 },
    },

    // LEVEL 26 - Narrow Stone Route
    {
        level: 26,
        start: { x: 2, y: 2 },
        apple: { x: 1, y: 2 },
        portal: { x: 7, y: 5 },
        obstacles: [
            ...platform(3, 1, 3),
            ...platform(5, 4, 4),
            ...platform(4, 5, 6),
            ...platform(6, 7, 7),
            ...platform(7, 4, 6),
            ...platform(1, 5, 6),
        ],
        starTarget: { threeStars: 56, twoStars: 73 },
    },

    // LEVEL 27 - Double Floating Bridge
    {
        level: 27,
        start: { x: 1, y: 1 },
        apple: { x: 0, y: 1 },
        portal: { x: 6, y: 6 },
        obstacles: [
            ...platform(2, 0, 2),
            ...platform(4, 3, 4),
            ...platform(3, 5, 5),
            ...platform(5, 6, 7),
            ...platform(7, 3, 5),
            ...platform(6, 0, 1),
        ],
        starTarget: { threeStars: 58, twoStars: 76 },
    },

    // LEVEL 28 - Stepping Stone Maze
    {
        level: 28,
        start: { x: 2, y: 1 },
        apple: { x: 1, y: 1 },
        portal: { x: 7, y: 4 },
        obstacles: [
            ...platform(2, 1, 3),
            ...platform(4, 4, 4),
            ...platform(3, 5, 6),
            ...platform(5, 7, 7),
            ...platform(6, 2, 3),
            ...platform(7, 5, 7),
            ...platform(5, 0, 1),
        ],
        starTarget: { threeStars: 60, twoStars: 78 },
    },

    // LEVEL 29 - Extreme Gap Challenge
    {
        level: 29,
        start: { x: 1, y: 2 },
        apple: { x: 0, y: 2 },
        portal: { x: 5, y: 5 },
        obstacles: [
            ...platform(3, 0, 2),
            ...platform(5, 3, 3),
            ...platform(4, 4, 5),
            ...platform(2, 5, 7),
            ...platform(6, 6, 7),
            ...platform(7, 3, 5),
            ...platform(5, 0, 1),
        ],
        starTarget: { threeStars: 62, twoStars: 82 },
    },

    // LEVEL 30 - Ultimate Stone Puzzle
    {
        level: 30,
        start: { x: 2, y: 1 },
        apple: { x: 1, y: 1 },
        portal: { x: 6, y: 6 },
        obstacles: [
            ...platform(2, 1, 3),
            ...platform(4, 4, 4),
            ...platform(3, 5, 6),
            ...platform(5, 7, 7),
            ...platform(6, 4, 5),
            ...platform(7, 1, 3),
            ...platform(5, 1, 2),
            ...platform(1, 5, 6),
        ],
        starTarget: { threeStars: 65, twoStars: 85 },
    },

];

export default levels;
