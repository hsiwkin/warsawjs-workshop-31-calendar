const express = require('express');
const supertest = require('supertest');

const router = require('../web/routing/calendar.router');

const Ajv = require('ajv');
const ajv = new Ajv();

let app;
beforeEach(() => {
    app = express();
    router(app);
});

it("returns proper response on GET on /api/calendar", async () => {
    const res = await supertest(app).get('/api/calendar?month=2').expect(200);
    expect(res.body).not.toBeNull;
});

it("should be consistent with calendar schema", async () => {
    const schema = require('../docs/schemas/calendar.scheme.json');
    const validate = ajv.compile(schema);

    const res = await supertest(app).get('/api/calendar?month=3')
        .expect(200);

    const valid = validate(res.body);
    expect(valid).toBeTruthy();
    expect(validate.errors).toBeNull;
});