import { AssociationScope, DataType, ForeignKeyOptions, HasManyOptions, HasManyOptions as SequelizeHasManyOptions } from 'sequelize';
import { MultipleRelationFieldOptions, RelationField } from './relation-field';
export interface HasManyFieldOptions extends HasManyOptions {
    /**
     * The name of the field to use as the key for the association in the source table. Defaults to the primary
     * key of the source table
     */
    sourceKey?: string;
    /**
     * A string or a data type to represent the identifier in the table
     */
    keyType?: DataType;
    scope?: AssociationScope;
    /**
     * The alias of this model, in singular form. See also the `name` option passed to `sequelize.define`. If
     * you create multiple associations between the same tables, you should provide an alias to be able to
     * distinguish between them. If you provide an alias when creating the assocition, you should provide the
     * same alias when eager loading and when getting associated models. Defaults to the singularized name of
     * target
     */
    as?: string | {
        singular: string;
        plural: string;
    };
    /**
     * The name of the foreign key in the target table or an object representing the type definition for the
     * foreign column (see `Sequelize.define` for syntax). When using an object, you can add a `name` property
     * to set the name of the column. Defaults to the name of source + primary key of source
     */
    foreignKey?: string | ForeignKeyOptions;
    /**
     * What happens when delete occurs.
     *
     * Cascade if this is a n:m, and set null if it is a 1:m
     *
     * @default 'SET NULL' or 'CASCADE'
     */
    onDelete?: string;
    /**
     * What happens when update occurs
     *
     * @default 'CASCADE'
     */
    onUpdate?: string;
    /**
     * Should on update and on delete constraints be enabled on the foreign key.
     */
    constraints?: boolean;
    foreignKeyConstraint?: boolean;
    /**
     * If `false` the applicable hooks will not be called.
     * The default value depends on the context.
     */
    hooks?: boolean;
}
export declare class HasManyField extends RelationField {
    get foreignKey(): any;
    bind(): boolean;
    unbind(): void;
}
export interface HasManyFieldOptions extends MultipleRelationFieldOptions, SequelizeHasManyOptions {
    type: 'hasMany';
    target?: string;
}
