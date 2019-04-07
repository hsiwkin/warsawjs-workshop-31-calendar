const express = require('express');
const supertest = require('supertest');

const router = require('../web/routing/day.router');

const Ajv = require('ajv');
const ajv = new Ajv();

let app;
beforeEach(() => {
    app = express();
    router(app);
});

it("should get data about day", async () => {
    const schema = require('../docs/schemas/day.scheme.json');
    const validate = ajv.compile(schema);

    const res = await supertest(app).get('/api/day?date=2018-12-02').expect(200);
    const valid = validate(res.body);
    expect(valid).toBeTruthy();
    expect(validate.errors).toBeNull;
});