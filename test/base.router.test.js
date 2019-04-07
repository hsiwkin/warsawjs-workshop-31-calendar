const express = require('express');
const supertest = require('supertest');

const router = require('../web/routing/base.router');

it ("tests if jasmine works", () => {
    expect(1).toBe(1);
});

it("returns proper response on GET on /", async () => {
    const app = express();
    router(app);

    const res = await supertest(app).get('/').expect(200);

    expect(res.body.status).toEqual('OK');
});
