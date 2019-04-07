const express = require('express');
const supertest = require('supertest');
const bodyParser = require('body-parser');
const EventModel = require('../models/event-model');

const router = require('../web/routing/event.router');
const connect = require('../db');

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

afterEach(async () => {
    await EventModel.deleteMany({ title: 'test-event-title' });
    await EventModel.deleteMany({ title: 'New Event Title' });
    await EventModel.deleteMany({ title: 'Ala ma kota' });
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

it("check if records are saved in the db", async () => {
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

const fake = () => ({
    title: 'test-event-title',
    description: 'test-event-description',
    time: new Date().toISOString(),
    notification: false
});

it("should delete records from db", async () => {
    const model = new EventModel(fake());
    await model.save();
    
    const list = await EventModel.find({ title: 'test-event-title' });
    expect(list.length).toEqual(1);
    
    await supertest(app)
        .delete(`/api/event/${model._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');

    const list2 = await EventModel.find({ title: 'test-event-title' });
    expect(list2.length).toEqual(0);
});

it('should update data', async () => {
    const model = new EventModel(fake());
    await model.save();

    const newTitle = 'Ala ma kota';

    await supertest(app)
        .put(`/api/event/${model._id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ title: newTitle });
    
    const list = await EventModel.find({ title: newTitle });
    expect(list.length).toEqual(1);
});