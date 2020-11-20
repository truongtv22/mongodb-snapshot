"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBDuplexConnector = void 0;
var mongodb_1 = require("mongodb");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var joi = __importStar(require("joi"));
var BSON = __importStar(require("bson"));
var Validatable_1 = require("./Validatable");
var lodash_1 = require("lodash");
var rxjs_for_await_1 = require("rxjs-for-await");
var utils_1 = require("../utils");
var BSON_DOC_HEADER_SIZE = 4;
var schema = joi.object({
    connection: joi.object({
        uri: joi.string().required(),
        dbname: joi.string().required(),
        connectTimeoutMS: joi.number().optional()
    }).required(),
    assource: joi.object({
        bulk_read_size: joi.number().optional(),
        collections: joi.array().items(joi.string()).optional()
    }).required(),
    astarget: joi.object({
        remove_on_failure: joi.boolean().optional(),
        remove_on_startup: joi.boolean().optional(),
        collections: joi.array().items(joi.string()).optional(),
        metadatas: joi.array().items(joi.string()).optional(),
        documents_bulk_write_count: joi.number().optional(),
        mode: joi.string().optional(),
        upsert_fields: joi.string().optional(),
    }).required(),
});
var MongoDBDuplexConnector = /** @class */ (function (_super) {
    __extends(MongoDBDuplexConnector, _super);
    function MongoDBDuplexConnector(_a) {
        var connection = _a.connection, _b = _a.assource, assource = _b === void 0 ? {} : _b, _c = _a.astarget, astarget = _c === void 0 ? {} : _c;
        var _this = _super.call(this) || this;
        _this.type = 'mongodb';
        _this.connection = connection;
        _this.assource = lodash_1.merge({ bulk_read_size: 50 * 1024 }, assource);
        _this.astarget = lodash_1.merge({ remove_on_failure: true, remove_on_startup: true, documents_bulk_write_count: 1000, mode: 'insert', upsert_fields: '_id' }, astarget);
        return _this;
    }
    // as source
    MongoDBDuplexConnector.prototype.data$ = function (collection_name) {
        var _this = this;
        return rxjs_1.defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var collection, data_cursor;
            return __generator(this, function (_a) {
                if (!this.db || !this.collections) {
                    return [2 /*return*/, rxjs_1.EMPTY];
                }
                // check if collection exist
                if (!this.collections.find(function (collection) { return collection.collectionName === collection_name; })) {
                    return [2 /*return*/, rxjs_1.EMPTY];
                }
                collection = this.db.collection(collection_name);
                data_cursor = collection.find({}, { timeout: false, batchSize: this.assource.bulk_read_size }).stream();
                return [2 /*return*/, cursorToObservalbe(data_cursor)];
            });
        }); }).pipe(operators_1.mergeAll());
    };
    MongoDBDuplexConnector.prototype.exists = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.db || !this.client) {
                    throw new Error("Need to connect to the data source before using this method.");
                }
                return [2 /*return*/, this.client.isConnected() && this.db.databaseName === this.connection.dbname];
            });
        });
    };
    MongoDBDuplexConnector.prototype.fullname = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "type: " + this.type + ", database: " + this.connection.dbname];
            });
        });
    };
    MongoDBDuplexConnector.prototype.options = function () {
        return lodash_1.pick(this, 'connection', 'assource', 'astarget');
    };
    MongoDBDuplexConnector.prototype.schema = function () {
        return schema;
    };
    // as target
    MongoDBDuplexConnector.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.db || !this.client) {
                            throw new Error("Need to connect to the data source before using this method.");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.dropDatabase()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDBDuplexConnector.prototype.writeCollectionMetadata = function (metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                if (!this.db || !((_a = this.client) === null || _a === void 0 ? void 0 : _a.isConnected())) {
                    throw new Error("Need to connect to the data source before using this method.");
                }
                // create indexes
                if (metadata.indexes.length > 0) {
                    return [2 /*return*/, this.db.collection(metadata.name).createIndexes(metadata.indexes)];
                }
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    MongoDBDuplexConnector.prototype.writeCollectionData = function (collection_name, data$) {
        var _this = this;
        var documents$ = utils_1.convertAsyncGeneratorToObservable(getDocumentsGenerator(data$));
        return documents$.pipe(operators_1.bufferCount(this.astarget.documents_bulk_write_count), operators_1.mergeMap(function (documents) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(documents.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.insertCollectionDocuments(collection_name, documents)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, documents.reduce(function (size, _a) {
                            var raw = _a.raw;
                            return size + raw.length;
                        }, 0)];
                }
            });
        }); }));
    };
    MongoDBDuplexConnector.prototype.insertCollectionDocuments = function (collection_name, documents) {
        return __awaiter(this, void 0, void 0, function () {
            function insert(documents) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, collection.bulkWrite(documents.map(function (_a) {
                                    var document = _a.obj;
                                    return (mode === 'upsert' && {
                                        replaceOne: {
                                            filter: { _id: document._id },
                                            replacement: document,
                                            upsert: true,
                                        },
                                    }) ||
                                        (mode === 'merge' && {
                                            updateOne: {
                                                filter: { _id: document._id },
                                                update: { $set: document },
                                                upsert: true,
                                            },
                                        }) ||
                                        (mode === 'delete' && {
                                            deleteOne: {
                                                filter: { _id: document._id },
                                            },
                                        }) || {
                                        insertOne: {
                                            document: document,
                                        },
                                    };
                                }, {
                                    ordered: false,
                                    bypassDocumentValidation: true,
                                }))];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                });
            }
            var mode, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.db) {
                            throw new Error("Need to connect to the data source before using this method.");
                        }
                        mode = this.astarget.mode;
                        collection = this.db.collection(collection_name);
                        return [4 /*yield*/, insert(documents)
                                .catch(function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                documents.forEach(function (_a) {
                                                    var document = _a.obj;
                                                    return filterInvalidKeys(document, function (key) { return key && key.includes('.'); });
                                                });
                                                return [4 /*yield*/, insert(documents)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoDBDuplexConnector.prototype.write = function (datas, metadatas) {
        var _this = this;
        return rxjs_1.defer(function () {
            var metadata$ = rxjs_1.merge.apply(void 0, metadatas.map(function (metadata) {
                return rxjs_1.from(_this.writeCollectionMetadata(metadata));
            })).pipe(operators_1.toArray(), operators_1.map(function () { return 0; }));
            var content$ = rxjs_1.merge.apply(void 0, datas.map(function (_a) {
                var metadata = _a.metadata, data$ = _a.data$;
                return _this.writeCollectionData(metadata.name, data$);
            }));
            return rxjs_1.concat(metadata$, content$);
        });
    };
    MongoDBDuplexConnector.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        client = new mongodb_1.MongoClient(this.connection.uri, {
                            connectTimeoutMS: this.connection.connectTimeoutMS || 5000,
                            raw: true,
                            keepAlive: true,
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                        });
                        _a = this;
                        return [4 /*yield*/, client.connect()];
                    case 1:
                        _a.client = _c.sent();
                        this.db = this.client.db(this.connection.dbname);
                        _b = this;
                        return [4 /*yield*/, this.db.collections()];
                    case 2:
                        _b.collections = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDBDuplexConnector.prototype.close = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = this.client) === null || _a === void 0 ? void 0 : _a.isConnected())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.close()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        this.client = undefined;
                        this.db = undefined;
                        this.collections = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDBDuplexConnector.prototype.transferable = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var all_collections;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = this.client) === null || _a === void 0 ? void 0 : _a.isConnected()) || !this.collections) {
                            throw new Error("MongoDB client is not connected");
                        }
                        all_collections = this.collections.filter(function (collection) { return !collection.collectionName.startsWith("system."); });
                        return [4 /*yield*/, Promise.all(all_collections.map(function (collection) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, stats, indexes, e_2;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 2, , 3]);
                                            return [4 /*yield*/, Promise.all([collection.stats(), collection.indexes()])];
                                        case 1:
                                            _a = _b.sent(), stats = _a[0], indexes = _a[1];
                                            return [2 /*return*/, {
                                                    name: collection.collectionName,
                                                    size: stats.size,
                                                    indexes: indexes,
                                                }];
                                        case 2:
                                            e_2 = _b.sent();
                                            console.warn("ignoring collection: \"" + collection.collectionName + "\", as we couldnt receive details due to an error: " + e_2.message);
                                            return [2 /*return*/, null];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1: return [2 /*return*/, (_b.sent()).filter(notEmpty)];
                }
            });
        });
    };
    return MongoDBDuplexConnector;
}(Validatable_1.Validatable));
exports.MongoDBDuplexConnector = MongoDBDuplexConnector;
function notEmpty(value) {
    return value !== null && value !== undefined;
}
function filterInvalidKeys(obj, filterKeyFn) {
    var invalid_keys = Object.keys(obj).filter(function (key) { return filterKeyFn(key); });
    for (var _i = 0, invalid_keys_1 = invalid_keys; _i < invalid_keys_1.length; _i++) {
        var invalid_key = invalid_keys_1[_i];
        delete obj[invalid_key];
    }
    for (var k in obj) {
        if (obj[k] && typeof obj[k] === 'object') {
            filterInvalidKeys(obj[k], filterKeyFn);
        }
    }
}
function getDocumentsGenerator(data$) {
    return __asyncGenerator(this, arguments, function getDocumentsGenerator_1() {
        var buffer, _a, _b, data, next_doclen, raw, obj, e_3_1;
        var e_3, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    buffer = Buffer.alloc(0);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 9, 10, 15]);
                    _a = __asyncValues(rxjs_for_await_1.eachValueFrom(data$));
                    _d.label = 2;
                case 2: return [4 /*yield*/, __await(_a.next())];
                case 3:
                    if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 8];
                    data = _b.value;
                    buffer = Buffer.concat([buffer, data]);
                    next_doclen = null;
                    if (buffer.length >= BSON_DOC_HEADER_SIZE) {
                        next_doclen = buffer.readInt32LE(0);
                    }
                    else {
                        next_doclen = null;
                    }
                    _d.label = 4;
                case 4:
                    if (!(next_doclen && buffer.length >= next_doclen)) return [3 /*break*/, 7];
                    raw = buffer.slice(0, next_doclen);
                    obj = BSON.deserialize(raw);
                    buffer = buffer.slice(next_doclen);
                    return [4 /*yield*/, __await({
                            raw: raw,
                            obj: obj
                        })];
                case 5: return [4 /*yield*/, _d.sent()];
                case 6:
                    _d.sent();
                    if (buffer.length >= BSON_DOC_HEADER_SIZE) {
                        next_doclen = buffer.readInt32LE(0);
                    }
                    else {
                        next_doclen = null;
                    }
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _d.trys.push([10, , 13, 14]);
                    if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, __await(_c.call(_a))];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
            }
        });
    });
}
function cursorToObservalbe(cursor) {
    return new rxjs_1.Observable(function (observer) {
        cursor.forEach(observer.next.bind(observer), function (err) {
            if (err) {
                observer.error(err);
            }
            else {
                observer.complete();
            }
        });
    });
}
//# sourceMappingURL=MongoDBDuplexConnector.js.map