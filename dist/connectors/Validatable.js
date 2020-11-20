"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validatable = void 0;
var errors_1 = require("../errors");
var Validatable = /** @class */ (function () {
    function Validatable() {
    }
    Validatable.prototype.validate = function () {
        // validating the options
        var error = this.schema().validate(this.options(), { abortEarly: true }).error;
        if (error) {
            throw new errors_1.ConnectorSchemaError(error);
        }
    };
    return Validatable;
}());
exports.Validatable = Validatable;
//# sourceMappingURL=Validatable.js.map