const app = require('../backend/server') 
const supertest = require('supertest')
const request = supertest(app)

afterAll(() => {app.close})

describe("Login API", () => {
    it("POST /login successful", async(done) => {
        const credentials = {
            loginEmail: process.env.testEmail,
            loginPassword: process.env.testPassword
        }
        const res = await request.post('/login/')
            .set("Content-Type", "application/json")
            .send(credentials)

        expect(res.status).toEqual(302);
        done();
    })

    it("POST /login unsuccessful incorrect login", async(done) => {
        const credentials = {
            loginEmail: "WRONG EMAIL",
            loginPassword: "WRONG PASSWORD"
        }
        const res = await request.post('/login/')
            .set("Content-Type", "application/json")
            .send(credentials)

        expect(res.status).toEqual(401);
        done();
    })
    
})