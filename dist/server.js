"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server.ts
var import_express = __toESM(require("express"));
var import_body_parser = __toESM(require("body-parser"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var serverPORT = process.env.PORT ? process.env.PORT : "3030";
var app = (0, import_express.default)();
app.use(import_body_parser.default.json());
app.get("/data", (req, res) => {
  const { data } = req.body;
  let writeStream = import_fs.default.createWriteStream(import_path.default.join(__dirname, "..", "tmp", "data.csv"));
  data.forEach((obj, index) => __async(exports, null, function* () {
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
    yield writeStream.write(newLine.join(",") + "\n", () => {
    });
  }));
  writeStream.end();
  res.download(import_path.default.join(__dirname, "..", "tmp", "data.csv"));
});
app.listen(serverPORT, () => {
  console.log(`Servidor rodando na porta ${serverPORT}`);
});
