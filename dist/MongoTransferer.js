"use strict";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoTransferer = void 0;
var lodash_1 = require("lodash");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var rxjs_for_await_1 = require("rxjs-for-await");
/**
 * Transfers a snapshot of a database and stream it׳s content.
 * During the process the module emit events regarding the transfer process that you can subscribe to.
 */
var MongoTransferer = /** @class */ (function () {
    function MongoTransferer(_a) {
        var source = _a.source, _b = _a.targets, targets = _b === void 0 ? [] : _b;
        this.source = source;
        this.targets = __spreadArrays(targets);
    }
    MongoTransferer.prototype[Symbol.asyncIterator] = function () {
        return this.iterator();
    };
    /**
     * Allows an easier iteration across the transferer events.
     * Lazingly start the transfer operation.
     * As long as there was no execution of "for await ..." expression the transfer process wont start.
     *
     * @example
     * ```js
     * const source = new LocalFileSystemDuplexConnector(...);
     * const target = new MongoDBDuplexConnector(...);
     *
     * const transferer = new MongoTransferer({ source, targets: [target] });
     *
     * for await (const progress of transferer.iterator()) {
     *    console.log(progress);
     * }
     * ```
     */
    MongoTransferer.prototype.iterator = function () {
        return rxjs_for_await_1.eachValueFrom(this.transfer$());
    };
    /**
     * Returns a promise that allows you to await until the transfer operation is done.
     * The promise might be rejected if there was a critical error.
     * If the promise was fullfilled it will provide a summary details of the transfer operation.
     */
    MongoTransferer.prototype.promise = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transfer$().toPromise()];
            });
        });
    };
    /**
     * Returns a stream transferer progression events to listen to during the transfer process.
     */
    MongoTransferer.prototype.transfer$ = function () {
        var _this = this;
        return rxjs_1.defer(function () { return __awaiter(_this, void 0, void 0, function () {
            var connectors, metadatas, datas, writes;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectors = __spreadArrays([this.source], this.targets);
                        if (this.targets.length === 0) {
                            return [2 /*return*/, rxjs_1.of({
                                    total: 0,
                                    write: 0
                                })];
                        }
                        // validate and connect to all connectors
                        return [4 /*yield*/, Promise.all(connectors.map(function (connector) { return connector.validate(); }))];
                    case 1:
                        // validate and connect to all connectors
                        _a.sent();
                        return [4 /*yield*/, Promise.all(connectors.map(function (connector) { return connector.connect(); }))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.source.transferable()];
                    case 3:
                        metadatas = (_a.sent())
                            .map(function (metadata) { return (__assign(__assign({}, metadata), { indexes: (metadata.indexes || []).map(function (index) { return lodash_1.omit(index, ['ns']); }) })); });
                        datas = metadatas
                            .filter(function (metadata) {
                            return (_this.source.assource.collections &&
                                _this.source.assource.collections.includes(metadata.name)) || (!_this.source.assource.collections);
                        })
                            .map(function (metadata) { return ({
                            data$: _this.source.data$(metadata.name),
                            metadata: metadata
                        }); });
                        // cleanup all the targets before creating and writing data into them
                        return [4 /*yield*/, Promise.all(this.targets.filter(function (target) { return target.astarget.remove_on_startup; }).map(function (target) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, target.exists()];
                                        case 1:
                                            if (!_a.sent()) return [3 /*break*/, 3];
                                            return [4 /*yield*/, target.remove()];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 4:
                        // cleanup all the targets before creating and writing data into them
                        _a.sent();
                        writes = this.targets.map(function (target) {
                            var target_collections = datas.filter(function (_a) {
                                var name = _a.metadata.name;
                                return (target.astarget.collections &&
                                    target.astarget.collections.includes(name)) || (!target.astarget.collections);
                            });
                            var target_metadatas = metadatas.filter(function (_a) {
                                var name = _a.name;
                                return (target.astarget.metadatas &&
                                    target.astarget.metadatas.includes(name)) || (!target.astarget.metadatas);
                            });
                            return {
                                size: target_collections.reduce(function (total, _a) {
                                    var size = _a.metadata.size;
                                    return total + size;
                                }, 0),
                                write$: target.write(target_collections, target_metadatas).pipe(operators_1.catchError(function (error) {
                                    return rxjs_1.defer(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _a, _b, _c, _d, _e, _f, _g;
                                        return __generator(this, function (_h) {
                                            switch (_h.label) {
                                                case 0:
                                                    _b = (_a = console).error;
                                                    _c = "could not write collection data into: ";
                                                    return [4 /*yield*/, target.fullname()];
                                                case 1:
                                                    _b.apply(_a, [_c + (_h.sent()) + " due to error:"]);
                                                    console.error(error);
                                                    _d = target.astarget.remove_on_failure;
                                                    if (!_d) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, target.exists()];
                                                case 2:
                                                    _d = (_h.sent());
                                                    _h.label = 3;
                                                case 3:
                                                    if (!_d) return [3 /*break*/, 6];
                                                    _f = (_e = console).warn;
                                                    _g = "removing: \"";
                                                    return [4 /*yield*/, target.fullname()];
                                                case 4:
                                                    _f.apply(_e, [_g + (_h.sent()) + "\" because an error was thrown during the transfer"]);
                                                    return [4 /*yield*/, target.remove()];
                                                case 5:
                                                    _h.sent();
                                                    _h.label = 6;
                                                case 6: return [2 /*return*/];
                                            }
                                        });
                                    }); }).pipe(operators_1.switchMapTo(rxjs_1.EMPTY));
                                }), operators_1.finalize(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, target.close()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))
                            };
                        });
                        return [2 /*return*/, rxjs_1.merge.apply(void 0, writes.map(function (write) { return write.write$; })).pipe(operators_1.filter(function (write_size) { return write_size > 0; }), operators_1.scan(function (acc, write_size) { return (__assign(__assign({}, acc), { write: acc.write + write_size })); }, {
                                total: writes.reduce(function (total, _a) {
                                    var size = _a.size;
                                    return total + size;
                                }, 0),
                                write: 0,
                            }))];
                }
            });
        }); }).pipe(operators_1.mergeAll(), operators_1.finalize(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.source.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
    };
    return MongoTransferer;
}());
exports.MongoTransferer = MongoTransferer;
//# sourceMappingURL=MongoTransferer.js.map