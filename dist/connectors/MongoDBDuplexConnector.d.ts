/// <reference types="node" />
import { Observable } from "rxjs";
import * as joi from 'joi';
import { TargetConnector, SourceConnector, CollectionData } from "./Connector";
import { MongoDBConnection, CollectionMetadata as CollectionMetadata } from "../contracts";
import { Validatable } from "./Validatable";
export interface MongoDBConnectorOptions {
    connection: MongoDBConnection;
    /**
     * data related to this connector as a source
     */
    assource?: Partial<AsSourceOptions>;
    /**
     * data related to this connector as a target
     */
    astarget?: Partial<AsTargetOptions>;
}
export declare class MongoDBDuplexConnector extends Validatable implements SourceConnector, TargetConnector {
    type: string;
    connection: MongoDBConnection;
    assource: AsSourceOptions;
    astarget: AsTargetOptions;
    private client?;
    private db?;
    private collections?;
    constructor({ connection, assource, astarget }: MongoDBConnectorOptions);
    data$(collection_name: string): Observable<Buffer>;
    exists(): Promise<boolean>;
    fullname(): Promise<string>;
    options(): Pick<this, "connection" | "assource" | "astarget">;
    schema(): joi.ObjectSchema;
    remove(): Promise<boolean>;
    writeCollectionMetadata(metadata: CollectionMetadata): Promise<any>;
    writeCollectionData(collection_name: string, data$: Observable<Buffer>): Observable<number>;
    insertCollectionDocuments(collection_name: string, documents: [CollectionDocument]): Promise<import("mongodb").BulkWriteOpResultObject>;
    write(datas: CollectionData[], metadatas: CollectionMetadata[]): Observable<number>;
    connect(): Promise<void>;
    close(): Promise<void>;
    transferable(): Promise<{
        name: string;
        size: number;
        indexes: any;
    }[]>;
}
interface CollectionDocument {
    raw: Buffer;
    obj: {
        [key: string]: any;
    };
}
interface AsSourceOptions {
    /**
     * The amount of bytes to read (in bson format) from mongodb database each time.
     * The bigger the number is it will improve the performance as it will decrease the amount of reads from the database (less io consumption).
     */
    bulk_read_size: number;
    /**
    * collections to read from the mongodb database.
    * If its empty, the filter is skipped, reading all the collections from the database.
    */
    collections?: string[];
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
    * collections to write into the mongodb database.
    * If its empty, the filter is skipped, writing all the collections from the source.
    */
    collections?: string[];
    /**
    * metadata of collections to write into mongodb.
    * If its empty, the filter is skipped, writing metadata of all the collections.
    */
    metadatas?: string[];
    /**
    * The amount of documents to write in each operation.
    * The greater this number is the better performance it will provide as it will make less writes to the MongoDB server.
    */
    documents_bulk_write_count: number;
    /**
     * Specifies how the import process should handle existing documents in the database that match documents in the import file.
     */
    mode?: 'insert' | 'upsert' | 'merge' | 'delete';
    /**
     * Specifies a list of fields for the query portion of the import process, can be used with mod upsert, merge and delete.
     */
    upsert_fields?: string;
}
export {};
//# sourceMappingURL=MongoDBDuplexConnector.d.ts.map