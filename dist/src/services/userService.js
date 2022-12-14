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
import { userRepository } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import tokenRepository from "../repositories/tokenRepository.js";
import dotenv from "dotenv";
dotenv.config();
export function signUp(user) {
    return __awaiter(this, void 0, void 0, function () {
        var userAlreadyExists, usernameExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findByEmail(user.email)];
                case 1:
                    userAlreadyExists = _a.sent();
                    if (userAlreadyExists)
                        throw { type: 'CONFLICT', message: 'Email j?? est?? sendo utilizado.' };
                    return [4 /*yield*/, userRepository.findByUsername(user.username)];
                case 2:
                    usernameExist = _a.sent();
                    if (usernameExist)
                        throw { type: 'CONFLICT', message: 'Username j?? est?? sendo utilizado.' };
                    user.password = bcrypt.hashSync(user.password, 10);
                    return [4 /*yield*/, userRepository.create(user)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function signIn(user) {
    return __awaiter(this, void 0, void 0, function () {
        var userInfo, image, username, correctPassword, token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findByEmail(user.email)];
                case 1:
                    userInfo = _a.sent();
                    if (!userInfo)
                        throw { type: 'NOT_FOUND', message: 'Usu??rio n??o encontrado.' };
                    image = userInfo.image, username = userInfo.username;
                    correctPassword = bcrypt.compareSync(user.password, userInfo.password);
                    if (!userInfo || !correctPassword)
                        throw { type: 'UNAUTHORIZED', message: 'Senha inv??lida para este usu??rio.' };
                    token = jwt.sign({ userId: userInfo.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });
                    return [4 /*yield*/, tokenRepository.create({ token: token, userId: userInfo.id })];
                case 2:
                    _a.sent();
                    response = {
                        image: image,
                        username: username,
                        token: token
                    };
                    return [2 /*return*/, response];
            }
        });
    });
}
export var userService = {
    signIn: signIn,
    signUp: signUp
};
