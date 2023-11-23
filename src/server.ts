import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import path from 'path'

const serverPORT = process.env.PORT ? process.env.PORT : '3030'

const app = express();
app.use(bodyParser.json());

interface Idata {
    id: number,
    attributes: {
        fullName: string,
        medicalRecordNumber: string,
        age: string,
        impressions: string,
        exams: string,
        watcher: boolean,
        gender: string,
        status: string,
        medicalBed: string,
        activeProblem: string,
        ageUnit: string,
        lastUpdater: string,
        createdAt: string,
        updatedAt: string,
        dateOfAdmission: string

    }
}

app.get('/data', (req, res) => {
    const { data } = req.body

    let writeStream = fs.createWriteStream(path.join(__dirname, '..', 'tmp', 'data.csv'))

    data.forEach(async (obj: Idata, index) => {
        let newLine: Array<Object> = []
        newLine.push(obj.id)
        newLine.push('"' + obj.attributes.fullName + '"')
        newLine.push('"' + obj.attributes.medicalRecordNumber + '"')
        newLine.push('"' + obj.attributes.age + '"')
        newLine.push('"' + obj.attributes.impressions + '"')
        newLine.push('"' + obj.attributes.exams + '"')
        newLine.push('"' + obj.attributes.watcher + '"')
        newLine.push('"' + obj.attributes.gender + '"')
        newLine.push('"' + obj.attributes.status + '"')
        newLine.push('"' + obj.attributes.medicalBed + '"')
        newLine.push('"' + obj.attributes.activeProblem + '"')
        newLine.push('"' + obj.attributes.ageUnit + '"')
        newLine.push('"' + obj.attributes.lastUpdater + '"')
        newLine.push('"' + obj.attributes.createdAt + '"')
        newLine.push('"' + obj.attributes.updatedAt + '"')
        newLine.push('"' + obj.attributes.dateOfAdmission + '"')

        await writeStream.write(newLine.join(',') + '\n', () => {
            // a line was written to stream
        })
    })

    writeStream.end()


    res.download(path.join(__dirname, '..', 'tmp', 'data.csv'))

    // res.send(data.data[0])
})

app.listen(serverPORT, () => {
    console.log(`Servidor rodando na porta ${serverPORT}`)
})