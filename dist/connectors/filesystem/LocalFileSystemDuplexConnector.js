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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFileSystemDuplexConnector = void 0;
var fs_1 = require("fs");
var joi = __importStar(require("joi"));
var lodash_1 = require("lodash");
var util_1 = require("util");
var zlib = __importStar(require("zlib"));
var FileSystemDuplexConnector_1 = require("./FileSystemDuplexConnector");
var accessP = util_1.promisify(fs_1.access);
var unlinkP = util_1.promisify(fs_1.unlink);
var gzipSchema = joi.object({
    flush: joi.number().optional(),
    finishFlush: joi.number().optional(),
    chunkSize: joi.number().optional(),
    windowBits: joi.number().optional(),
    level: joi.number().optional(),
    memLevel: joi.number().optional(),
    strategy: joi.number().optional(),
}).required();
var schema = joi.object({
    connection: joi.object({
        path: joi.string().required()
    }).required(),
    assource: joi.object({
        bulk_read_size: joi.number().optional(),
        collections: joi.array().items(joi.string()).optional(),
        gzip: gzipSchema
    }).required(),
    astarget: joi.object({
        remove_on_failure: joi.boolean().optional(),
        remove_on_startup: joi.boolean().optional(),
        collections: joi.array().items(joi.string()).optional(),
        metadatas: joi.array().items(joi.string()).optional(),
        gzip: gzipSchema,
        bulk_write_size: joi.number().optional()
    }).required(),
});
var LocalFileSystemDuplexConnector = /** @class */ (function (_super) {
    __extends(LocalFileSystemDuplexConnector, _super);
    function LocalFileSystemDuplexConnector(_a) {
        var connection = _a.connection, _b = _a.assource, assource = _b === void 0 ? {} : _b, _c = _a.astarget, astarget = _c === void 0 ? {} : _c;
        var _this = _super.call(this) || this;
        _this.type = 'local';
        _this.connection = connection;
        _this.assource = lodash_1.merge({
            bulk_read_size: 10000,
            gzip: {
                chunkSize: 50 * 1024,
                level: zlib.constants.Z_BEST_SPEED,
            },
        }, assource);
        _this.astarget = lodash_1.merge({
            remove_on_failure: true,
            remove_on_startup: true,
            gzip: {
                chunkSize: 50 * 1024,
                level: zlib.constants.Z_BEST_SPEED,
            },
            bulk_write_size: 50 * 1024
        }, astarget);
        return _this;
    }
    LocalFileSystemDuplexConnector.prototype.createWriteStream = function () {
        return fs_1.createWriteStream(this.connection.path, {
            highWaterMark: this.astarget.bulk_write_size,
            autoClose: true,
            emitClose: true
        });
    };
    LocalFileSystemDuplexConnector.prototype.createReadStream = function () {
        return fs_1.createReadStream(this.connection.path, { highWaterMark: this.assource.bulk_read_size });
    };
    LocalFileSystemDuplexConnector.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, unlinkP(this.connection.path).then(function () { return true; }).catch(function () { return false; })];
            });
        });
    };
    LocalFileSystemDuplexConnector.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    LocalFileSystemDuplexConnector.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    LocalFileSystemDuplexConnector.prototype.options = function () {
        return lodash_1.pick(this, ['connection', 'assource', 'astarget']);
    };
    LocalFileSystemDuplexConnector.prototype.schema = function () {
        return schema;
    };
    LocalFileSystemDuplexConnector.prototype.exists = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, accessP(this.connection.path).then(function () { return true; }).catch(function () { return false; })];
            });
        });
    };
    LocalFileSystemDuplexConnector.prototype.fullname = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "type: " + this.type + ", path: " + this.connection.path];
            });
        });
    };
    return LocalFileSystemDuplexConnector;
}(FileSystemDuplexConnector_1.FileSystemDuplexConnector));
exports.LocalFileSystemDuplexConnector = LocalFileSystemDuplexConnector;
//# sourceMappingURL=LocalFileSystemDuplexConnector.js.map