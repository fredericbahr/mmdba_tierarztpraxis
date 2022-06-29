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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var fs_1 = require("fs");
var pdf_parse_1 = __importDefault(require("pdf-parse"));
var prisma = new client_1.PrismaClient();
var pdf = [];
var photos = [];
var videos = [];
function deleteAllEntries() {
    return __awaiter(this, void 0, void 0, function () {
        var deleteTreatment, deleteAnimal, deleteCustomer, deleteMedicine, deleteRace, deleteSpecies, deletePhoto, deleteVideo, deleteFinding, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, prisma.treatment.deleteMany({})];
                case 1:
                    deleteTreatment = _a.sent();
                    return [4 /*yield*/, prisma.animal.deleteMany({})];
                case 2:
                    deleteAnimal = _a.sent();
                    return [4 /*yield*/, prisma.customer.deleteMany({})];
                case 3:
                    deleteCustomer = _a.sent();
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
var readPDFs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var i, pdfData, pdfContent, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 3)) return [3 /*break*/, 4];
                pdfData = (0, fs_1.readFileSync)("".concat(__dirname, "/pdf/pdf").concat(i + 1, ".pdf"));
                return [4 /*yield*/, (0, pdf_parse_1["default"])(pdfData)];
            case 2:
                pdfContent = (_a.sent()).text;
                pdf.push({
                    content: pdfContent,
                    data: pdfData
                });
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 6];
            case 5:
                e_2 = _a.sent();
                console.log("Fehler beim Lesen der PDFs");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var readPhotos = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            photos.push((0, fs_1.readFileSync)("".concat(__dirname, "/photos/cat.jpg")));
            photos.push((0, fs_1.readFileSync)("".concat(__dirname, "/photos/dog.jpg")));
            photos.push((0, fs_1.readFileSync)("".concat(__dirname, "/photos/bird.jpg")));
        }
        catch (e) {
            console.log("Fehler beim lesen der Fotos");
        }
        return [2 /*return*/];
    });
}); };
var readVideos = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            videos.push((0, fs_1.readFileSync)("".concat(__dirname, "/videos/cat.mp4")));
            videos.push((0, fs_1.readFileSync)("".concat(__dirname, "/videos/dog.mp4")));
            videos.push((0, fs_1.readFileSync)("".concat(__dirname, "/videos/bird.mp4")));
        }
        catch (e) {
            console.log("Fehler beim lesen der Videos");
        }
        return [2 /*return*/];
    });
}); };
function readFiles() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readPDFs()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, readPhotos()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, readVideos()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function repopulate() {
    return __awaiter(this, void 0, void 0, function () {
        var newSpecies, speciesId, schaeferhund, ocicat, wellensittich, newCustomers, ownerId, raceId, coots, rex, max, animalId, laeuse, zahn, erkaeltung, treatmentId, medicineToTreatment_laeuse, medicineToTreatment_zahn, medicineToTreatment_erkalt, lauesePhoto, canisPhoto, erkaltPhoto, laueseVideo, canisVideo, erkaltVideo, ohrFinding, canisFinding, erkaltFinding, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 29, , 30]);
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
                    console.log("Passed species");
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
                    console.log("Passed races");
                    return [4 /*yield*/, prisma.customer.createMany({
                            data: [
                                {
                                    city: "Berlin",
                                    name: "Tom Schuster",
                                    phoneNumber: "+49 16031679",
                                    plz: 42307,
                                    street: "Nihil-Straße"
                                },
                                {
                                    city: "Köln",
                                    name: "Anna Brand",
                                    phoneNumber: "+45 1624579",
                                    plz: 22337,
                                    street: "Carian-Straße"
                                },
                                {
                                    city: "München",
                                    name: "Sophia Linger",
                                    phoneNumber: "+47 12278979",
                                    plz: 81237,
                                    street: "Haligbaum-Straße"
                                },
                            ]
                        })];
                case 6:
                    newCustomers = _a.sent();
                    console.log("Passed customer");
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
                                name: "coots",
                                birthdate: new Date(),
                                weight: 4,
                                owner: {
                                    connect: {
                                        id: ownerId[0].id
                                    }
                                },
                                race: {
                                    connect: {
                                        id: raceId[1].id
                                    }
                                }
                            }
                        })];
                case 9:
                    coots = _a.sent();
                    return [4 /*yield*/, prisma.animal.create({
                            data: {
                                name: "Rex",
                                birthdate: new Date(),
                                weight: 5,
                                owner: {
                                    connect: {
                                        id: ownerId[1].id
                                    }
                                },
                                race: {
                                    connect: {
                                        id: raceId[0].id
                                    }
                                }
                            }
                        })];
                case 10:
                    rex = _a.sent();
                    return [4 /*yield*/, prisma.animal.create({
                            data: {
                                name: "Max",
                                birthdate: new Date(),
                                weight: 1,
                                owner: {
                                    connect: {
                                        id: ownerId[2].id
                                    }
                                },
                                race: {
                                    connect: {
                                        id: raceId[2].id
                                    }
                                }
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
                    console.log("Passed animals");
                    return [4 /*yield*/, prisma.treatment.create({
                            data: {
                                diagnosis: "Läuse",
                                notes: "Kleiner unkritischer Befall",
                                costs: 25,
                                date: new Date(),
                                animal: {
                                    connect: {
                                        id: animalId[0].id
                                    }
                                },
                                customer: {
                                    connect: {
                                        id: ownerId[0].id
                                    }
                                }
                            }
                        })];
                case 13:
                    laeuse = _a.sent();
                    return [4 /*yield*/, prisma.treatment.create({
                            data: {
                                diagnosis: "Eiternder Zahn",
                                notes: "",
                                costs: 40,
                                date: new Date(),
                                animal: {
                                    connect: {
                                        id: animalId[1].id
                                    }
                                },
                                customer: {
                                    connect: {
                                        id: ownerId[1].id
                                    }
                                }
                            }
                        })];
                case 14:
                    zahn = _a.sent();
                    return [4 /*yield*/, prisma.treatment.create({
                            data: {
                                diagnosis: "Erkältung",
                                notes: "",
                                costs: 40,
                                date: new Date(),
                                animal: {
                                    connect: {
                                        id: animalId[2].id
                                    }
                                },
                                customer: {
                                    connect: {
                                        id: ownerId[2].id
                                    }
                                }
                            }
                        })];
                case 15:
                    erkaeltung = _a.sent();
                    console.log("Passed treatment");
                    return [4 /*yield*/, prisma.treatment.findMany({
                            select: {
                                id: true
                            }
                        })];
                case 16:
                    treatmentId = _a.sent();
                    return [4 /*yield*/, prisma.medicine.create({
                            data: {
                                description: "Läuse-Medizin", dosis: 12, name: "Permethrin",
                                treatments: {
                                    connect: {
                                        id: treatmentId[0].id
                                    }
                                }
                            }
                        })];
                case 17:
                    medicineToTreatment_laeuse = _a.sent();
                    return [4 /*yield*/, prisma.medicine.create({
                            data: {
                                description: "Anti-Infekt", dosis: 3, name: "Angocin",
                                treatments: {
                                    connect: {
                                        id: treatmentId[1].id
                                    }
                                }
                            }
                        })];
                case 18:
                    medicineToTreatment_zahn = _a.sent();
                    return [4 /*yield*/, prisma.medicine.create({
                            data: {
                                description: "Ambiotika", dosis: 7, name: "Roxithromycin",
                                treatments: {
                                    connect: {
                                        id: treatmentId[1].id
                                    }
                                }
                            }
                        })];
                case 19:
                    medicineToTreatment_erkalt = _a.sent();
                    console.log("Passed medicine");
                    return [4 /*yield*/, prisma.photo.create({
                            data: {
                                blob: photos[0],
                                description: "Läuse-Befall, linkes Ohr",
                                treatment: {
                                    connect: {
                                        id: laeuse.id
                                    }
                                }
                            }
                        })];
                case 20:
                    lauesePhoto = _a.sent();
                    return [4 /*yield*/, prisma.photo.create({
                            data: {
                                blob: photos[1],
                                description: "Canis maior, eiternd",
                                treatment: {
                                    connect: {
                                        id: zahn.id
                                    }
                                }
                            }
                        })];
                case 21:
                    canisPhoto = _a.sent();
                    return [4 /*yield*/, prisma.photo.create({
                            data: {
                                blob: photos[2],
                                description: "Erkältung",
                                treatment: {
                                    connect: {
                                        id: erkaeltung.id
                                    }
                                }
                            }
                        })];
                case 22:
                    erkaltPhoto = _a.sent();
                    console.log("Passed photos");
                    return [4 /*yield*/, prisma.video.create({
                            data: {
                                blob: videos[0],
                                description: "Läuse-Befall, linkes Ohr",
                                treatment: {
                                    connect: {
                                        id: laeuse.id
                                    }
                                }
                            }
                        })];
                case 23:
                    laueseVideo = _a.sent();
                    return [4 /*yield*/, prisma.video.create({
                            data: {
                                blob: videos[1],
                                description: "Canis maior, eiternd",
                                treatment: {
                                    connect: {
                                        id: zahn.id
                                    }
                                }
                            }
                        })];
                case 24:
                    canisVideo = _a.sent();
                    return [4 /*yield*/, prisma.video.create({
                            data: {
                                blob: videos[2],
                                description: "Erkältung",
                                treatment: {
                                    connect: {
                                        id: erkaeltung.id
                                    }
                                }
                            }
                        })];
                case 25:
                    erkaltVideo = _a.sent();
                    console.log("Passed videos");
                    return [4 /*yield*/, prisma.finding.create({
                            data: {
                                blob: pdf[0].data,
                                description: "Läuse-Befall, linkes Ohr",
                                content: pdf[0].content,
                                treatment: {
                                    connect: {
                                        id: laeuse.id
                                    }
                                }
                            }
                        })];
                case 26:
                    ohrFinding = _a.sent();
                    return [4 /*yield*/, prisma.finding.create({
                            data: {
                                blob: pdf[1].data,
                                description: "Canis maior, eiternd",
                                content: pdf[1].content,
                                treatment: {
                                    connect: {
                                        id: zahn.id
                                    }
                                }
                            }
                        })];
                case 27:
                    canisFinding = _a.sent();
                    return [4 /*yield*/, prisma.finding.create({
                            data: {
                                blob: pdf[2].data,
                                description: "Erkältung",
                                content: pdf[2].content,
                                treatment: {
                                    connect: {
                                        id: erkaeltung.id
                                    }
                                }
                            }
                        })];
                case 28:
                    erkaltFinding = _a.sent();
                    console.log("Passed findings");
                    return [3 /*break*/, 30];
                case 29:
                    e_3 = _a.sent();
                    console.log("Failure in repopulating entries");
                    console.log(e_3);
                    return [3 /*break*/, 30];
                case 30: return [2 /*return*/];
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
                    return [4 /*yield*/, readFiles()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, repopulate()];
                case 3:
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
