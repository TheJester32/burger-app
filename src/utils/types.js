import PropTypes from 'prop-types';

const ingredientType = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
    })).isRequired,
};

export { ingredientType };