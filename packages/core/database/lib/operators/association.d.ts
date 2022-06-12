import { Op } from 'sequelize';
declare const _default: {
    $exists(value: any, ctx: any): {
        [Op.not]: any;
    };
    $notExists(value: any, ctx: any): {
        [Op.is]: any;
    };
};
export default _default;
