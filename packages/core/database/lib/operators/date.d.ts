import { Op } from 'sequelize';
declare const _default: {
    $dateOn(value: any): {
        [Op.and]: ({
            [Op.gte]: Date;
            [Op.lt]?: undefined;
        } | {
            [Op.lt]: Date;
            [Op.gte]?: undefined;
        })[];
    };
    $dateNotOn(value: any): {
        [Op.or]: ({
            [Op.lt]: Date;
            [Op.gte]?: undefined;
        } | {
            [Op.gte]: Date;
            [Op.lt]?: undefined;
        })[];
    };
    $dateBefore(value: any): {
        [Op.lt]: Date;
    };
    $dateNotBefore(value: any): {
        [Op.gte]: Date;
    };
    $dateAfter(value: any): {
        [Op.gte]: Date;
    };
    $dateNotAfter(value: any): {
        [Op.lt]: Date;
    };
};
export default _default;
