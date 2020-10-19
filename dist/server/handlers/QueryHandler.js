"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandler = void 0;
const FormHandler_1 = require("../../core/FormHandler");
const ArrayLoader_1 = require("../../core/loaders/ArrayLoader");
const KeyLoader_1 = require("../../core/loaders/KeyLoader");
const NumberLoader_1 = require("../../core/loaders/NumberLoader");
const ObjectLoader_1 = require("../../core/loaders/ObjectLoader");
const OptionalLoader_1 = require("../../core/loaders/OptionalLoader");
const RecordLoader_1 = require("../../core/loaders/RecordLoader");
const entries_1 = require("../../core/object/entries");
const mapObject_1 = require("../../core/object/mapObject");
const Result_1 = require("../../core/Result");
function QueryHandler({ entityType, aliasName, fields, }) {
    return FormHandler_1.FormHandler(ObjectLoader_1.ObjectLoader({
        skip: OptionalLoader_1.OptionalLoader(NumberLoader_1.NumberLoader({ min: 0 })),
        take: OptionalLoader_1.OptionalLoader(NumberLoader_1.NumberLoader({ min: 0 })),
        order: OptionalLoader_1.OptionalLoader(RecordLoader_1.RecordLoader(KeyLoader_1.KeyLoader(fields), KeyLoader_1.KeyLoader({ ASC: true, DESC: true }))),
        get: OptionalLoader_1.OptionalLoader(ArrayLoader_1.ArrayLoader(KeyLoader_1.KeyLoader(fields))),
    }), {
        onSubmit({ skip, take, order, get }) {
            return __awaiter(this, void 0, void 0, function* () {
                const qb = entityType
                    .createQueryBuilder(aliasName)
                    .take(take)
                    .skip(skip)
                    .select();
                if (!get) {
                    get = Object.keys(fields);
                }
                if (order)
                    for (let [key, type] of entries_1.entries(order)) {
                        qb.addOrderBy(getFieldAliasName(key), type);
                    }
                const fieldKeyToAliasName = {};
                for (const fieldKey of get) {
                    const field = fields[fieldKey];
                    const fieldAliasName = getFieldAliasName(fieldKey);
                    fieldKeyToAliasName[fieldKey] = fieldAliasName;
                    qb.addSelect(field.selection, fieldAliasName);
                }
                return Object.assign(Object.assign({}, Result_1.SUCCESS), { rows: yield qb.getRawMany().then((raw) => {
                        return raw.map((raw) => {
                            return mapObject_1.mapObject(fieldKeyToAliasName, (aliasName) => raw[aliasName]);
                        });
                    }) });
                function getFieldAliasName(fieldKey) {
                    return fieldKey + "Raw";
                }
            });
        },
    });
}
exports.QueryHandler = QueryHandler;
