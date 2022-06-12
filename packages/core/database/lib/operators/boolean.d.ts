import { Op } from 'sequelize';
declare const _default: {
    $isFalsy(): {
        [Op.or]: {
            [Op.is]: any;
            [Op.eq]: boolean;
        };
    };
    $isTruly(): {
        [Op.eq]: boolean;
    };
};
export default _default;
