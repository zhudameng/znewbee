import React from 'react';
import type { UploadProps } from './type';
declare type Composed = React.FC<UploadProps> & {
    Upload?: React.FC<UploadProps>;
    Attachment?: React.FC<UploadProps>;
};
export declare const ReadPretty: Composed;
export {};
