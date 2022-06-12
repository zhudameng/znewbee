import { Op } from 'sequelize';
declare const _default: {
    $match(value: any, ctx: any): import("sequelize/types/lib/utils").Literal | {
        [Op.contained]: any;
        [Op.contains]: any;
        [Op.eq]?: undefined;
    } | {
        [Op.eq]: import("sequelize/types/lib/utils").Literal;
        [Op.contained]?: undefined;
        [Op.contains]?: undefined;
    };
    $notMatch(value: any, ctx: any): import("sequelize/types/lib/utils").Literal | {
        [Op.ne]: import("sequelize/types/lib/utils").Literal;
    };
    $anyOf(value: any, ctx: any): import("sequelize/types/lib/utils").Literal;
    $noneOf(value: any, ctx: any): {
        [Op.or]: any[];
    };
    $arrayEmpty(value: any, ctx: any): {
        [Op.and]: import("sequelize/types/lib/utils").Literal[];
    };
    $arrayNotEmpty(value: any, ctx: any): {
        [Op.and]: import("sequelize/types/lib/utils").Literal[];
    };
};
export default _default;
