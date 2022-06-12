import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import type { IUploadProps, UploadProps } from './type';
export declare const isImage: (extName: string) => boolean;
export declare const toMap: (fileList: any) => any;
export declare const toImages: (fileList: any) => any;
export declare const toArr: (value: any) => any[];
export declare const testOpts: (ext: RegExp, options: {
    exclude?: string[];
    include?: string[];
}) => boolean;
export declare const getImageByUrl: (url: string, options: any) => string;
export declare const getURL: (target: any) => any;
export declare const getThumbURL: (target: any) => any;
export declare const getErrorMessage: (target: any) => any;
export declare const getState: (target: any) => any;
export declare const normalizeFileList: (fileList: UploadFile[]) => {
    uid: string;
    status: any;
    url: any;
    thumbUrl: string;
    size?: number;
    name: string;
    fileName?: string;
    lastModified?: number;
    lastModifiedDate?: Date;
    percent?: number;
    originFileObj?: import("antd/lib/upload").RcFile;
    response?: any;
    error?: any;
    linkProps?: any;
    type?: string;
    xhr?: any;
    preview?: string;
}[];
export declare const useValidator: (validator: (value: any) => string) => void;
export declare const useUploadValidator: (serviceErrorMessage?: string) => void;
export declare function useUploadProps<T extends IUploadProps = UploadProps>({ serviceErrorMessage, ...props }: T): Omit<T, "serviceErrorMessage"> & {
    customRequest({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials }: {
        action: any;
        data: any;
        file: any;
        filename: any;
        headers: any;
        onError: any;
        onProgress: any;
        onSuccess: any;
        withCredentials: any;
    }): {
        abort(): void;
    };
    onChange: (param: UploadChangeParam<UploadFile>) => void;
};
export declare const toItem: (file: any) => any;
export declare const toFileList: (fileList: any) => any[];
export declare const toValue: (fileList: any) => any[];
