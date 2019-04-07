const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');

const router = require('../web/routing/event.router');
const connect = require('../db');
const EventModel = require('../models/event-model');

const Ajv = require('ajv');
const ajv = new Ajv();

let app;
beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    router(app);
});

beforeAll(async () => {
    await connect();
});

it("POST /api/event should be consistent with event schema", async () => {
    const schema = require('../docs/schemas/event.scheme.json');
    const validate = ajv.compile(schema);

    const res = await supertest(app)
        .post('/api/event', {
            title: 'New Event Title',
            description: 'Event Description',
            time: '2018-02-12',
            notification: false
        })
        .expect(200);

    const valid = validate(res.body);
    expect(valid).toBeTruthy();
    expect(validate.errors).toBeNull;
});

fit("check if records are saved in the db", async () => {
    await supertest(app)
        .post('/api/event')
        .send({
            title: 'New Event Title',
            description: 'Event Description',
            time: '2018-02-12',
            notification: false
        })
        .set('Accept', 'application/json')
        .expect(200);

    const list = await EventModel.find({ title: 'New Event Title' });
    expect(list.length).toEqual(1);
});