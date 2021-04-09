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
exports.__esModule = true;
exports.BallChasingAPI = void 0;
var node_fetch_1 = require("node-fetch");
var fs = require("fs");
var FormData = require("form-data");
var BallChasingAPI = /** @class */ (function () {
    function BallChasingAPI(apiKey) {
        this._apiKey = apiKey;
        this._baseURL = new URL("https://ballchasing.com/api");
    }
    /**
     * Create the authorization headers needed to call the
     * ballchasing API.
     * @private
     */
    BallChasingAPI.prototype.authHeaders = function () {
        return { "Authorization": this._apiKey };
    };
    /**
     * Make a request to the ballchasing API. This method will
     * check the response for errors.
     * @param url
     * @param fetchArgs Any extra fetch args
     * @param headers Any extra headers
     * @private
     */
    BallChasingAPI.prototype.request = function (url, fetchArgs, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var args, res, json, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        args = __assign({ headers: __assign(__assign({}, this.authHeaders()), headers) }, fetchArgs);
                        return [4 /*yield*/, node_fetch_1["default"](url, args)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, { response: res, data: json }];
                    case 3:
                        e_1 = _a.sent();
                        throw new Error(e_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if
     * 1) Your API key is correct
     * 2) If ballchasing API is reachable
     */
    BallChasingAPI.prototype.ping = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request(this._baseURL)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Upload a replay
     *
     * @param filepath
     * @param groupId
     * @param visibility
     */
    BallChasingAPI.prototype.uploadReplay = function (filepath, groupId, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, stats, stream, formData, args, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/v2/upload", this._baseURL);
                        if (visibility) {
                            endpoint.searchParams.set("visibility", visibility);
                        }
                        if (groupId) {
                            endpoint.searchParams.set("group", groupId);
                        }
                        stats = fs.statSync(filepath);
                        stream = fs.createReadStream(filepath);
                        formData = new FormData();
                        formData.append("file", stream, { knownLength: stats.size });
                        args = { method: "POST", body: formData };
                        return [4 /*yield*/, this.request(endpoint, args)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.getMaps = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/maps", this._baseURL);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        throw e_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.listReplays = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/replays", this._baseURL);
                        if (args.title) {
                            endpoint.searchParams.set("title", args.title);
                        }
                        if (args.playerName) {
                            endpoint.searchParams.set("player-name", args.playerName);
                        }
                        if (args.playerId) {
                            endpoint.searchParams.set("player-id", args.playerId);
                        }
                        if (args.playlist) {
                            endpoint.searchParams.set("playlist", args.playlist);
                        }
                        if (args.season) {
                            endpoint.searchParams.set("season", args.season);
                        }
                        if (args.matchResult) {
                            endpoint.searchParams.set("match-result", args.matchResult);
                        }
                        if (args.minRank) {
                            endpoint.searchParams.set("min-rank", args.minRank);
                        }
                        if (args.maxRank) {
                            endpoint.searchParams.set("max-rank", args.maxRank);
                        }
                        if (args.pro) {
                            endpoint.searchParams.set("pro", "true");
                        }
                        if (args.uploader) {
                            endpoint.searchParams.set("uploader", args.uploader);
                        }
                        if (args.group) {
                            endpoint.searchParams.set("group", args.group);
                        }
                        if (args.map) {
                            endpoint.searchParams.set("map", args.map);
                        }
                        if (args.createdBefore) {
                            endpoint.searchParams.set("created-before", args.createdBefore);
                        }
                        if (args.createdAfter) {
                            endpoint.searchParams.set("created-after", args.createdAfter);
                        }
                        if (args.replayDateBefore) {
                            endpoint.searchParams.set("replay-date-before", args.replayDateBefore);
                        }
                        if (args.replayDateAfter) {
                            endpoint.searchParams.set("replay-date-after", args.replayDateAfter);
                        }
                        if (args.count) {
                            endpoint.searchParams.set("count", args.count.toString());
                        }
                        if (args.sortDir) {
                            endpoint.searchParams.set("sort-dir", args.sortDir);
                        }
                        if (args.sortBy) {
                            endpoint.searchParams.set("sort-by", args.sortBy);
                        }
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_5 = _a.sent();
                        throw e_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.getReplay = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/replays/" + args.id, this._baseURL);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_6 = _a.sent();
                        throw new Error(e_6);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.patchReplay = function (_a) {
        var id = _a.id, patch = _a.patch;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/replays/" + id, this._baseURL);
                        return [4 /*yield*/, this.request(endpoint, { method: "PATCH", body: JSON.stringify(__assign({}, patch)) }, { "Content-Type": "application/json" })];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        e_7 = _b.sent();
                        throw new Error(e_7);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.deleteReplay = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/replays/" + args.id, this._baseURL);
                        return [4 /*yield*/, this.request(endpoint, { method: "DELETE" })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_8 = _a.sent();
                        throw new Error(e_8);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.downloadReplay = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/replays/" + args.id + "/file", this._baseURL);
                        return [4 /*yield*/, node_fetch_1["default"](endpoint, {
                                headers: __assign({}, this.authHeaders())
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_9 = _a.sent();
                        throw new Error(e_9);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.createGroup = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/groups", this._baseURL);
                        return [4 /*yield*/, this.request(endpoint, { method: "POST", body: JSON.stringify(__assign({}, args)) }, { "Content-Type": "application/json" })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_10 = _a.sent();
                        throw new Error(e_10);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.listGroups = function (args) {
        if (args === void 0) { args = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/groups", this._baseURL);
                        if (args.name) {
                            endpoint.searchParams.set("name", args.name);
                        }
                        if (args.count) {
                            endpoint.searchParams.set("count", args.count.toString());
                        }
                        if (args.creator) {
                            endpoint.searchParams.set("creator", args.creator);
                        }
                        if (args.createdBefore) {
                            endpoint.searchParams.set("created-before", args.createdBefore);
                        }
                        if (args.createdAfter) {
                            endpoint.searchParams.set("created-after", args.createdAfter);
                        }
                        if (args.sortBy) {
                            endpoint.searchParams.set("sort-by", args.sortBy);
                        }
                        if (args.sortDir) {
                            endpoint.searchParams.set("sort-dir", args.sortDir);
                        }
                        if (args.group) {
                            endpoint.searchParams.set("group", args.group);
                        }
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_11 = _a.sent();
                        throw new Error(e_11);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.getGroup = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/groups/" + args.id, this._baseURL);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_12 = _a.sent();
                        throw new Error(e_12);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.deleteGroup = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/groups/" + args.id, this._baseURL);
                        return [4 /*yield*/, this.request(endpoint, { method: "DELETE" })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_13 = _a.sent();
                        throw new Error(e_13);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BallChasingAPI.prototype.patchGroup = function (_a) {
        var id = _a.id, patch = _a.patch;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, e_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        endpoint = new URL("/api/groups/" + id, this._baseURL);
                        return [4 /*yield*/, this.request(endpoint, {
                                method: "PATCH",
                                body: JSON.stringify(__assign({}, patch))
                            }, { "Content-Type": "application/json" })];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        e_14 = _b.sent();
                        throw new Error(e_14);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BallChasingAPI;
}());
exports.BallChasingAPI = BallChasingAPI;
