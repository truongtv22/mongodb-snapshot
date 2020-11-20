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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDuplexConnector = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var tar = __importStar(require("tar-stream"));
var zlib = __importStar(require("zlib"));
var Validatable_1 = require("../Validatable");
var FileSystemDuplexConnector = /** @class */ (function (_super) {
    __extends(FileSystemDuplexConnector, _super);
    function FileSystemDuplexConnector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileSystemDuplexConnector.prototype.write = function (datas, metadatas) {
        var _this = this;
        return rxjs_1.defer(function () {
            var pack = tar.pack({
                highWaterMark: _this.astarget.bulk_write_size,
            });
            var output_file = _this.createWriteStream();
            var gzip = zlib.createGzip(_this.astarget.gzip);
            // pack streams
            var metadata$ = rxjs_1.concat.apply(void 0, metadatas.map(function (metadata) { return packMetadata$(pack, metadata); })).pipe(operators_1.toArray(), operators_1.map(function () { return 0; }));
            var content$ = rxjs_1.concat.apply(void 0, datas.map(function (_a) {
                var _b = _a.metadata, name = _b.name, size = _b.size, collectionData$ = _a.data$;
                return packCollectionData$(pack, { name: name, size: size }, collectionData$);
            }));
            // executing the stream
            var file_close_promise = rxjs_1.fromEvent(pack.pipe(gzip).pipe(output_file), 'close').pipe(operators_1.take(1)).toPromise();
            var finalizing$ = rxjs_1.defer(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    pack.finalize();
                    return [2 /*return*/];
                });
            }); });
            var closing$ = rxjs_1.defer(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, file_close_promise];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            var ending$ = rxjs_1.concat(finalizing$, closing$).pipe(operators_1.toArray(), operators_1.map(function () { return 0; }));
            var packing$ = rxjs_1.concat(metadata$, content$).pipe(operators_1.catchError(function (err) {
                return rxjs_1.concat(ending$, rxjs_1.throwError(err));
            }));
            return rxjs_1.concat(packing$, ending$);
        });
    };
    FileSystemDuplexConnector.prototype.data$ = function (collection_name) {
        var _this = this;
        return new rxjs_1.Observable(function (observer) {
            var extract = tar.extract({
                highWaterMark: _this.assource.bulk_read_size
            });
            var file_input_stream = _this.createReadStream();
            var unzip = zlib.createGunzip(_this.assource.gzip);
            extract.on('entry', function (_a, source_stream, next) {
                var size = _a.size, name = _a.name;
                if (!name.endsWith('.bson')) {
                    // skipping
                    source_stream.resume();
                    return next();
                }
                var collection_name_in_tar = name.replace('.bson', '');
                if (collection_name !== collection_name_in_tar) {
                    // skipping
                    source_stream.resume();
                    return next();
                }
                source_stream.on('data', function (chunk) { return observer.next(chunk); });
                source_stream.on('error', function (error) { return observer.error(error); });
                source_stream.on('end', function () { return next(); });
                source_stream.resume();
            });
            extract.on('finish', function () {
                observer.complete();
            });
            // execute the stream
            file_input_stream.pipe(unzip).pipe(extract);
        });
    };
    FileSystemDuplexConnector.prototype.transferable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new rxjs_1.Observable(function (observer) {
                        var extract = tar.extract({
                            highWaterMark: _this.assource.bulk_read_size
                        });
                        var file_input_stream = _this.createReadStream();
                        var unzip = zlib.createGunzip(_this.assource.gzip);
                        extract.on('entry', function (_a, source_stream, next) {
                            var size = _a.size, name = _a.name;
                            if (!name.endsWith('.metadata.json')) {
                                if (name.endsWith('.bson')) {
                                    var collection_name_1 = name.replace('.bson', '');
                                    observer.next({
                                        name: collection_name_1,
                                        size: size
                                    });
                                }
                                source_stream.resume();
                                return next();
                            }
                            var metadata_str = '';
                            var collection_name = name.replace('.metadata.json', '');
                            source_stream.on('data', function (chunk) {
                                metadata_str += chunk.toString();
                            });
                            source_stream.on('error', function (error) { return observer.error(error); });
                            source_stream.on('end', function () {
                                var _a = JSON.parse(metadata_str).indexes, indexes = _a === void 0 ? [] : _a;
                                observer.next({
                                    name: collection_name,
                                    indexes: indexes
                                });
                                next();
                            });
                        });
                        extract.on('finish', function () {
                            observer.complete();
                        });
                        // execute the stream
                        file_input_stream.pipe(unzip).pipe(extract);
                    }).pipe(operators_1.groupBy(function (_a) {
                        var name = _a.name;
                        return name;
                    }, function (partial_metadatas) { return partial_metadatas; }, undefined, function () { return new rxjs_1.ReplaySubject(); }), operators_1.concatMap(function (metadataGroup$) {
                        return metadataGroup$.pipe(operators_1.toArray(), operators_1.map(function (partial_metadatas) {
                            return partial_metadatas.reduce(function (acc_metadata, partial_metadata) {
                                return (__assign(__assign({}, acc_metadata), partial_metadata));
                            }, { name: metadataGroup$.key, size: 0, indexes: [] });
                        }));
                    })).pipe(operators_1.toArray()).toPromise()];
            });
        });
    };
    ;
    return FileSystemDuplexConnector;
}(Validatable_1.Validatable));
exports.FileSystemDuplexConnector = FileSystemDuplexConnector;
function packMetadata$(pack, metadata) {
    return new rxjs_1.Observable(function (observer) {
        var content = JSON.stringify({
            options: {},
            indexes: metadata.indexes,
            uuid: "",
        });
        pack.entry({ name: metadata.name + ".metadata.json" }, content, function (error) {
            if (error) {
                observer.error(error);
            }
            else {
                observer.next(metadata);
                observer.complete();
            }
        });
    });
}
function packCollectionData$(pack, metadata, data$) {
    var _this = this;
    return new rxjs_1.Observable(function (observer) {
        var entry = pack.entry({ name: metadata.name + ".bson", size: metadata.size }, function (error) {
            if (error) {
                observer.error(error);
            }
            else {
                observer.complete();
            }
        });
        var subscription = data$.pipe(operators_1.concatMap(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            entry.write(data, function (error) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve(data.length);
                                }
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); })).subscribe(observer.next.bind(observer), function (error) {
            entry.end();
        }, function () {
            entry.end();
        });
        return function () {
            subscription.unsubscribe();
        };
    });
}
//# sourceMappingURL=FileSystemDuplexConnector.js.map