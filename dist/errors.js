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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorSchemaError = exports.MongoTransferError = void 0;
var verror_1 = require("verror");
var MongoTransferError = /** @class */ (function (_super) {
    __extends(MongoTransferError, _super);
    function MongoTransferError(cause, message) {
        return _super.call(this, message !== null && message !== void 0 ? message : "could not transfer mongo database properly", cause) || this;
    }
    return MongoTransferError;
}(verror_1.VError));
exports.MongoTransferError = MongoTransferError;
var ConnectorSchemaError = /** @class */ (function (_super) {
    __extends(ConnectorSchemaError, _super);
    function ConnectorSchemaError(cause) {
        return _super.call(this, cause) || this;
    }
    return ConnectorSchemaError;
}(MongoTransferError));
exports.ConnectorSchemaError = ConnectorSchemaError;
//# sourceMappingURL=errors.js.map