const express = require('express');
const supertest = require('supertest');

const router = require('../web/routing/calendar.router');

it("returns proper response on GET on /api/calendar", async () => {
    const app = express();
    router(app);

    const res = await supertest(app).get('/api/calendar').expect(200);

    expect(res.body).not.toBeNull;
});
