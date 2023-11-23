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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const serverPORT = process.env.PORT ? process.env.PORT : '3030';
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/data', (req, res) => {
    const { data } = req.body;
    let writeStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, '..', 'tmp', 'data.csv'));
    data.forEach((obj, index) => __awaiter(void 0, void 0, void 0, function* () {
        let newLine = [];
        newLine.push(obj.id);
        newLine.push('"' + obj.attributes.fullName + '"');
        newLine.push('"' + obj.attributes.medicalRecordNumber + '"');
        newLine.push('"' + obj.attributes.age + '"');
        newLine.push('"' + obj.attributes.impressions + '"');
        newLine.push('"' + obj.attributes.exams + '"');
        newLine.push('"' + obj.attributes.watcher + '"');
        newLine.push('"' + obj.attributes.gender + '"');
        newLine.push('"' + obj.attributes.status + '"');
        newLine.push('"' + obj.attributes.medicalBed + '"');
        newLine.push('"' + obj.attributes.activeProblem + '"');
        newLine.push('"' + obj.attributes.ageUnit + '"');
        newLine.push('"' + obj.attributes.lastUpdater + '"');
        newLine.push('"' + obj.attributes.createdAt + '"');
        newLine.push('"' + obj.attributes.updatedAt + '"');
        newLine.push('"' + obj.attributes.dateOfAdmission + '"');
        yield writeStream.write(newLine.join(',') + '\n', () => {
            // a line was written to stream
        });
    }));
    writeStream.end();
    res.download(path_1.default.join(__dirname, '..', 'tmp', 'data.csv'));
    // res.send(data.data[0])
});
app.listen(serverPORT, () => {
    console.log(`Servidor rodando na porta ${serverPORT}`);
});
