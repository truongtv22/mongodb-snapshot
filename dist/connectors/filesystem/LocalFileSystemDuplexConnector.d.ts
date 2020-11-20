/// <reference types="node" />
import * as joi from "joi";
import { FileSystemDuplexConnector } from "./FileSystemDuplexConnector";
import { GzipOpts } from "../../contracts";
export interface LocalFileSystemOptions {
    connection: LocalFileSystemConnection;
    /**
     * data related to this connector as a source
     */
    assource?: Partial<AsSourceOptions>;
    /**
     * data related to this connector as a target
     */
    astarget?: Partial<AsTargetOptions>;
}
export declare class LocalFileSystemDuplexConnector extends FileSystemDuplexConnector {
    type: string;
    connection: LocalFileSystemConnection;
    assource: AsSourceOptions;
    astarget: AsTargetOptions;
    constructor({ connection, assource, astarget }: LocalFileSystemOptions);
    createWriteStream(): import("fs").WriteStream;
    createReadStream(): import("fs").ReadStream;
    remove(): Promise<boolean>;
    connect(): Promise<void>;
    close(): Promise<void>;
    options(): Pick<this, "connection" | "assource" | "astarget">;
    schema(): joi.ObjectSchema;
    exists(): Promise<boolean>;
    fullname(): Promise<string>;
}
export interface LocalFileSystemConnectorOptions {
    connection: LocalFileSystemConnection;
}
export interface LocalFileSystemConnection {
    /**
     * The path to the archive file to create (relative to current working directory).
     */
    path: string;
}
interface AsSourceOptions {
    /**
     * The amount of bytes to read (in bson format) from the file each time.
     * The bigger the number is it will improve the performance as it will decrease the amount of reads from the disk (less io consumption).
     */
    bulk_read_size: number;
    /**
    * collections to read from the file.
    * If its empty, the filter is skipped, reading all the collections from the file.
    */
    collections?: string[];
    /**
     * options to use when extracting data from the source file
     */
    gzip: GzipOpts;
}
interface AsTargetOptions {
    /**
    * Whether or not to remove the target object in case of an error.
    */
    remove_on_failure: boolean;
    /**
     * Whether or not to remove the target object if its exist before transfering content to it.
     * It can help avoiding conflicts when trying to write data that already exist on the target connector.
     */
    remove_on_startup: boolean;
    /**
    * collections to write into the file.
    * If its empty, the filter is skipped, writing all the collections from the source.
    */
    collections?: string[];
    /**
    * metadata of collections to write into the file.
    * If its empty, the filter is skipped, writing all the metadatas from the source.
    */
    metadatas?: string[];
    /**
     * options to use when compressing data into the target file
     */
    gzip: GzipOpts;
    /**
     * The amount of bytes to write into the file each time.
     * The bigger the number is it will improve the performance as it will decrease the amount of writes to the disk.
     */
    bulk_write_size: number;
}
export {};
//# sourceMappingURL=LocalFileSystemDuplexConnector.d.ts.map