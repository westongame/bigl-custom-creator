import PropTypes from 'prop-types';

export default {
    preset: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        link: PropTypes.string,
        imageSrc: PropTypes.string,
        imageName: PropTypes.string,
        column: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.array,
        ]).isRequired,
        row: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.array,
        ]).isRequired,
    })),
    menuPreset: PropTypes.shape({
        title: PropTypes.string,
        titleError: PropTypes.bool,
        links: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            textError: PropTypes.bool,
            href: PropTypes.string,
            hrefError: PropTypes.bool,
        })),
    }),
};
