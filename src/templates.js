const presetDefaults = {
    title: null,
    link: null,
    imageSrc: null,
    imageName: null,
};

export const menuPresetTemplate = {
    title: '',
    titleError: false,
    links: [
        {
            text: '',
            textError: false,
            href: '',
            hrefError: false,
        },
    ],
};

export const presetTemplates = [
    [
        {
            ...presetDefaults,
            column: 1,
            row: 1,
        },
        {
            ...presetDefaults,
            column: 2,
            row: 1,
        },
        {
            ...presetDefaults,
            column: 3,
            row: 1,
        },
        {
            ...presetDefaults,
            column: 4,
            row: 1,
        },
    ],
    [
        {
            ...presetDefaults,
            column: [1, 2],
            row: 1,
        },
        {
            ...presetDefaults,
            column: 3,
            row: 1,
        },
        {
            ...presetDefaults,
            column: 4,
            row: 1,
        },
    ],
    [
        {
            ...presetDefaults,
            column: 1,
            row: 1,
        },
        {
            ...presetDefaults,
            column: [2, 3],
            row: 1,
        },
        {
            ...presetDefaults,
            column: 4,
            row: 1,
        },
    ],
    [
        {
            ...presetDefaults,
            column: 1,
            row: 1,
        },
        {
            ...presetDefaults,
            column: 2,
            row: 1,
        },
        {
            ...presetDefaults,
            column: [3, 4],
            row: 1,
        },
    ],
    [
        {
            ...presetDefaults,
            column: [1, 2],
            row: 1,
        },
        {
            ...presetDefaults,
            column: [3, 4],
            row: 1,
        },
    ],
    [
        {
            ...presetDefaults,
            column: [1, 2, 3, 4],
            row: 1,
        },
    ],
];
