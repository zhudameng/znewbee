import { Op } from 'sequelize';
declare const _default: {
    $notIn(val: any, ctx: any): {
        [Op.or]: {
            [Op.notIn]: any;
            [Op.is]: any;
        };
    };
};
export default _default;
