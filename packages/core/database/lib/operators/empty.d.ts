import { Op } from 'sequelize';
declare const _default: {
    $empty(_: any, ctx: any): {
        [Op.and]: import("sequelize/types/lib/utils").Literal[];
    } | {
        [Op.or]: {
            [Op.is]: any;
            [Op.eq]: string;
        };
        [Op.is]?: undefined;
    } | {
        [Op.is]: any;
        [Op.or]?: undefined;
    };
    $notEmpty(_: any, ctx: any): {
        [Op.and]: import("sequelize/types/lib/utils").Literal[];
    } | {
        [Op.and]: {
            [Op.not]: any;
            [Op.ne]: string;
        };
        [Op.not]?: undefined;
    } | {
        [Op.not]: any;
        [Op.and]?: undefined;
    };
};
export default _default;
