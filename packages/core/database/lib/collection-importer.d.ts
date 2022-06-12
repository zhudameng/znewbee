export declare type ImportFileExtension = 'js' | 'ts' | 'json';
export declare class ImporterReader {
    directory: string;
    extensions: Set<string>;
    constructor(directory: string, extensions?: ImportFileExtension[]);
    read(): Promise<any[]>;
}
