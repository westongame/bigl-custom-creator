const defaults = {
    title: null,
    link: null,
    imageSrc: null,
    imageName: null,
};

export const presets = [
    [
        {
            ...defaults,
            column: 1,
            row: 1,
        },
        {
            ...defaults,
            column: 2,
            row: 1,
        },
        {
            ...defaults,
            column: 3,
            row: 1,
        },
        {
            ...defaults,
            column: 4,
            row: 1,
        },
    ],
    [
        {
            ...defaults,
            column: [1, 2],
            row: 1,
        },
        {
            ...defaults,
            column: 3,
            row: 1,
        },
        {
            ...defaults,
            column: 4,
            row: 1,
        },
    ],
    [
        {
            ...defaults,
            column: 1,
            row: 1,
        },
        {
            ...defaults,
            column: [2, 3],
            row: 1,
        },
        {
            ...defaults,
            column: 4,
            row: 1,
        },
    ],
    [
        {
            ...defaults,
            column: 1,
            row: 1,
        },
        {
            ...defaults,
            column: 2,
            row: 1,
        },
        {
            ...defaults,
            column: [3, 4],
            row: 1,
        },
    ],
    [
        {
            ...defaults,
            column: [1, 2],
            row: 1,
        },
        {
            ...defaults,
            column: [3, 4],
            row: 1,
        },
    ],
    [
        {
            ...defaults,
            column: [1, 2, 3, 4],
            row: 1,
        },
    ],
];
