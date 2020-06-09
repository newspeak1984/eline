const axios = require('axios');

jest.mock('axios');

describe("Login API", () => {
  it('Returns user id', async () => {
    axios.get.mockResolvedValue(
      process.env.testUserId
    );

    const credentials = {
        loginEmail: process.env.testEmail,
        loginPassword: process.env.testPassword,
    }
  
    const testStore = await axios.get('http:localhost:5000' + '/login/', credentials);
    expect(testStore).toEqual(process.env.testUser);
  });
});
