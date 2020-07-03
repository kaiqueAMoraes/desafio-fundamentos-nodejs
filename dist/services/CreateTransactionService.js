"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateTransactionService = /** @class */ (function () {
    function CreateTransactionService(transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }
    CreateTransactionService.prototype.execute = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        if (type === 'outcome') {
            if (this.transactionsRepository.getBalance().total < value ||
                this.transactionsRepository.getBalance().total === 0) {
                throw Error('cant do this.');
            }
        }
        var transaction = this.transactionsRepository.create({
            title: title,
            value: value,
            type: type,
        });
        return transaction;
    };
    return CreateTransactionService;
}());
exports.default = CreateTransactionService;
