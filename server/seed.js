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
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function deleteAllEntries() {
    return __awaiter(this, void 0, void 0, function () {
        var deleteAnimal, deleteCustomer, deleteTreatment, deleteMedicine, deleteRace, deleteSpecies, deletePhoto, deleteVideo, deleteFinding, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, prisma.animal.deleteMany({})];
                case 1:
                    deleteAnimal = _a.sent();
                    return [4 /*yield*/, prisma.customer.deleteMany({})];
                case 2:
                    deleteCustomer = _a.sent();
                    return [4 /*yield*/, prisma.treatment.deleteMany({})];
                case 3:
                    deleteTreatment = _a.sent();
                    return [4 /*yield*/, prisma.medicine.deleteMany({})];
                case 4:
                    deleteMedicine = _a.sent();
                    return [4 /*yield*/, prisma.race.deleteMany({})];
                case 5:
                    deleteRace = _a.sent();
                    return [4 /*yield*/, prisma.species.deleteMany({})];
                case 6:
                    deleteSpecies = _a.sent();
                    return [4 /*yield*/, prisma.photo.deleteMany({})];
                case 7:
                    deletePhoto = _a.sent();
                    return [4 /*yield*/, prisma.video.deleteMany({})];
                case 8:
                    deleteVideo = _a.sent();
                    return [4 /*yield*/, prisma.finding.deleteMany({})];
                case 9:
                    deleteFinding = _a.sent();
                    return [3 /*break*/, 11];
                case 10:
                    e_1 = _a.sent();
                    console.log("Failure in deleting entries");
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function repopulate() {
    return __awaiter(this, void 0, void 0, function () {
        var newSpecies, speciesId, schaeferhund, ocicat, wellensittich, newCustomers, ownerId, raceId, coots, rex, max, animalId, laeuse, zahn, erkaeltung, newMedicine, canis, ohr, erkalt, canisVideo, ohrVideo, erkaltVideo, canisFinding, ohrFinding, erkaltFinding, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 26, , 27]);
                    return [4 /*yield*/, prisma.species.createMany({
                            data: [{ name: "Hunde" }, { name: "Katze" }, { name: "Vogel" }]
                        })];
                case 1:
                    newSpecies = _a.sent();
                    return [4 /*yield*/, prisma.species.findMany({
                            select: {
                                id: true
                            }
                        })];
                case 2:
                    speciesId = _a.sent();
                    console.log(speciesId);
                    return [4 /*yield*/, prisma.race.create({
                            data: {
                                name: "Schäferhund",
                                species: {
                                    connect: {
                                        id: speciesId[0].id
                                    }
                                }
                            }
                        })];
                case 3:
                    schaeferhund = _a.sent();
                    return [4 /*yield*/, prisma.race.create({
                            data: {
                                name: "Ocicat",
                                species: {
                                    connect: {
                                        id: speciesId[1].id
                                    }
                                }
                            }
                        })];
                case 4:
                    ocicat = _a.sent();
                    return [4 /*yield*/, prisma.race.create({
                            data: {
                                name: "Wellensittich",
                                species: {
                                    connect: {
                                        id: speciesId[2].id
                                    }
                                }
                            }
                        })];
                case 5:
                    wellensittich = _a.sent();
                    return [4 /*yield*/, prisma.customer.createMany({
                            data: [{ city: "Berlin", createdAt: new Date(), name: "Tom Schuster", phoneNumber: "+49 16031679", plz: 42307, street: "Nihil-Straße" },
                                { city: "Köln", createdAt: new Date(), name: "Anna Brand", phoneNumber: "+45 1624579", plz: 22337, street: "Carian-Straße" },
                                { city: "München", createdAt: new Date(), name: "Sophia Linger", phoneNumber: "+47 12278979", plz: 81237, street: "Haligbaum-Straße" }
                            ]
                        })];
                case 6:
                    newCustomers = _a.sent();
                    return [4 /*yield*/, prisma.customer.findMany({
                            select: {
                                id: true
                            }
                        })];
                case 7:
                    ownerId = _a.sent();
                    return [4 /*yield*/, prisma.race.findMany({
                            select: {
                                id: true
                            }
                        })];
                case 8:
                    raceId = _a.sent();
                    return [4 /*yield*/, prisma.animal.create({
                            data: {
                                birthdate: new Date(),
                                owner: {
                                    connect: {
                                        id: ownerId[0].id
                                    }
                                },
                                name: "coots",
                                race: {
                                    connect: {
                                        id: raceId[1].id
                                    }
                                },
                                weight: 4
                            }
                        })];
                case 9:
                    coots = _a.sent();
                    return [4 /*yield*/, prisma.animal.create({
                            data: {
                                birthdate: new Date(),
                                owner: {
                                    connect: {
                                        id: ownerId[1].id
                                    }
                                },
                                name: "Rex",
                                race: {
                                    connect: {
                                        id: raceId[0].id
                                    }
                                },
                                weight: 5
                            }
                        })];
                case 10:
                    rex = _a.sent();
                    return [4 /*yield*/, prisma.animal.create({
                            data: {
                                birthdate: new Date(),
                                owner: {
                                    connect: {
                                        id: ownerId[2].id
                                    }
                                },
                                name: "Max",
                                race: {
                                    connect: {
                                        id: raceId[2].id
                                    }
                                },
                                weight: 1
                            }
                        })];
                case 11:
                    max = _a.sent();
                    return [4 /*yield*/, prisma.animal.findMany({
                            select: {
                                id: true
                            }
                        })];
                case 12:
                    animalId = _a.sent();
                    return [4 /*yield*/, prisma.treatment.create({
                            data: {
                                animal: {
                                    connect: {
                                        id: animalId[0].id
                                    }
                                },
                                costs: 25,
                                customer: {
                                    connect: {
                                        id: ownerId[0].id
                                    }
                                },
                                date: new Date(),
                                diagnosis: "Läuse",
                                notes: "Kleiner unkritischer Befall"
                            }
                        })];
                case 13:
                    laeuse = _a.sent();
                    return [4 /*yield*/, prisma.treatment.create({
                            data: {
                                animal: {
                                    connect: {
                                        id: animalId[1].id
                                    }
                                },
                                costs: 40,
                                customer: {
                                    connect: {
                                        id: ownerId[1].id
                                    }
                                },
                                date: new Date(),
                                diagnosis: "Eiternder Zahn",
                                notes: ""
                            }
                        })];
                case 14:
                    zahn = _a.sent();
                    return [4 /*yield*/, prisma.treatment.create({
                            data: {
                                animal: {
                                    connect: {
                                        id: animalId[2].id
                                    }
                                },
                                costs: 40,
                                customer: {
                                    connect: {
                                        id: ownerId[2].id
                                    }
                                },
                                date: new Date(),
                                diagnosis: "Erkältung",
                                notes: ""
                            }
                        })];
                case 15:
                    erkaeltung = _a.sent();
                    console.log("Passed treatment");
                    return [4 /*yield*/, prisma.medicine.createMany({
                            data: [{ description: "Läuse-Medizin", dosis: 12, name: "Permethrin" },
                                { description: "Ambiotika", dosis: 7, name: "Roxithromycin" },
                                { description: "Anti-Infekt", dosis: 3, name: "Angocin" }]
                        })];
                case 16:
                    newMedicine = _a.sent();
                    console.log("Passed medicine");
                    return [4 /*yield*/, prisma.photo.create({
                            data: {
                                blob: Buffer.from("", "binary"),
                                description: "Canis maior, eiternd",
                                treatment: {
                                    connect: {
                                        id: 2
                                    }
                                }
                            }
                        })];
                case 17:
                    canis = _a.sent();
                    return [4 /*yield*/, prisma.photo.create({
                            data: {
                                blob: Buffer.from("", "binary"),
                                description: "Läuse-Befall, linkes Ohr",
                                treatment: {
                                    connect: {
                                        id: 1
                                    }
                                }
                            }
                        })];
                case 18:
                    ohr = _a.sent();
                    return [4 /*yield*/, prisma.photo.create({
                            data: {
                                blob: Buffer.from("", "binary"),
                                description: "Erkältung",
                                treatment: {
                                    connect: {
                                        id: 3
                                    }
                                }
                            }
                        })];
                case 19:
                    erkalt = _a.sent();
                    console.log("Passed photos");
                    return [4 /*yield*/, prisma.video.create({
                            data: {
                                blob: Buffer.from("", "binary"),
                                description: "Canis maior, eiternd",
                                treatment: {
                                    connect: {
                                        id: 2
                                    }
                                }
                            }
                        })];
                case 20:
                    canisVideo = _a.sent();
                    return [4 /*yield*/, prisma.video.create({
                            data: {
                                blob: Buffer.from("", "binary"),
                                description: "Läuse-Befall, linkes Ohr",
                                treatment: {
                                    connect: {
                                        id: 1
                                    }
                                }
                            }
                        })];
                case 21:
                    ohrVideo = _a.sent();
                    return [4 /*yield*/, prisma.video.create({
                            data: {
                                blob: Buffer.from("", "binary"),
                                description: "Erkältung",
                                treatment: {
                                    connect: {
                                        id: 3
                                    }
                                }
                            }
                        })];
                case 22:
                    erkaltVideo = _a.sent();
                    console.log("Passed videos");
                    return [4 /*yield*/, prisma.finding.create({
                            data: {
                                blob: Buffer.from("", "binary"),
                                description: "Canis maior, eiternd",
                                treatment: {
                                    connect: {
                                        id: 2
                                    }
                                }
                            }
                        })];
                case 23:
                    canisFinding = _a.sent();
                    return [4 /*yield*/, prisma.finding.create({
                            data: {
                                blob: Buffer.from("", "binary"),
                                description: "Läuse-Befall, linkes Ohr",
                                treatment: {
                                    connect: {
                                        id: 1
                                    }
                                }
                            }
                        })];
                case 24:
                    ohrFinding = _a.sent();
                    return [4 /*yield*/, prisma.finding.create({
                            data: {
                                blob: Buffer.from("", "binary"),
                                description: "Erkältung",
                                treatment: {
                                    connect: {
                                        id: 3
                                    }
                                }
                            }
                        })];
                case 25:
                    erkaltFinding = _a.sent();
                    console.log("Passed findings");
                    return [3 /*break*/, 27];
                case 26:
                    e_2 = _a.sent();
                    console.log("Failure in repopulating entries");
                    console.log(e_2);
                    return [3 /*break*/, 27];
                case 27: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deleteAllEntries()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, repopulate()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (e) {
    throw e;
})["finally"](function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
