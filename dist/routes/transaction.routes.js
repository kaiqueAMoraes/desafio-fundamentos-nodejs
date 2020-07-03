"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TransactionsRepository_1 = __importDefault(require("../repositories/TransactionsRepository"));
var CreateTransactionService_1 = __importDefault(require("../services/CreateTransactionService"));
var transactionRouter = express_1.Router();
var transactionsRepository = new TransactionsRepository_1.default();
var createTransactionService = new CreateTransactionService_1.default(transactionsRepository);
transactionRouter.get('/', function (request, response) {
    try {
        var res = {
            transactions: transactionsRepository.all(),
            balance: transactionsRepository.getBalance(),
        };
        return response.status(200).json(res);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
transactionRouter.post('/', function (request, response) {
    var _a = request.body, title = _a.title, value = _a.value, type = _a.type;
    var res = {
        title: title,
        value: value,
        type: type,
    };
    try {
        var res2 = createTransactionService.execute(res);
        return response.status(200).json(res2);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});
exports.default = transactionRouter;
