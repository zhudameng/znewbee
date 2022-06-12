import { Op } from 'sequelize';
declare const _default: {
    $ne(val: any, ctx: any): {
        [Op.or]: {
            [Op.ne]: any;
            [Op.is]: any;
        };
    };
};
export default _default;
