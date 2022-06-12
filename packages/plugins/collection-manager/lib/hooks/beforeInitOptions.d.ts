import { Model } from 'sequelize';
export declare const beforeInitOptions: {
    belongsTo(model: Model, { database }: {
        database: any;
    }): void;
    belongsToMany(model: Model, { database }: {
        database: any;
    }): void;
    hasMany(model: Model, { database }: {
        database: any;
    }): void;
    hasOne(model: Model, { database }: {
        database: any;
    }): void;
};
