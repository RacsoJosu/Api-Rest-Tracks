const request = require("supertest");
const app = require("../app")
const { usersModel } = require("../models");
const { testAuthLogin, testAuthRegister } = require("./helper/helperData");



beforeAll(async () => {
    await usersModel.deleteMany({});
});

test("esto deberia de retornar 404", async () => {
    const response = await request(app)
    .post("/api/auth/login")
    .send(testAuthLogin);

    expect(response.statusCode).toEqual(404);
});