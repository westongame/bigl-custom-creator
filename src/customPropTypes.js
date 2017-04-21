import PropTypes from 'prop-types';

const presetItemShape = PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    imageSrc: PropTypes.string,
    imageName: PropTypes.string,
    column: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
    row: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
});

export default {
    preset: PropTypes.shape({
        children: PropTypes.arrayOf(presetItemShape),
    }),
    presetMarkupData: PropTypes.arrayOf(PropTypes.shape({
        column: PropTypes.arrayOf(PropTypes.number),
        rows: PropTypes.arrayOf(PropTypes.shape({
            content: PropTypes.arrayOf(presetItemShape),
            row: PropTypes.arrayOf(PropTypes.number),
        })),
        size: PropTypes.number,
    })),
    menuPreset: PropTypes.shape({
        title: PropTypes.string,
        titleError: PropTypes.bool,
        links: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            textError: PropTypes.bool,
            href: PropTypes.string,
            hrefError: PropTypes.bool,
        })).isRequired,
    }),
};
