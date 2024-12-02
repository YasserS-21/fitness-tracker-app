const request = require('supertest');
const app = require('../app'); // Adjust the path to your Express app
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path to your User model

beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/user_auth_test');
});

afterAll(async () => {
    // Clean up and close the database connection
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('User Authentication', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                firstName: 'Test',
                lastName: 'User',
                age: 25,
                gender: 'male',
                height: 180,
                weight: 75,
                activityLevel: 'moderately active',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toBe("User registered successfully");
    });

    it('should log in the user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('userId');
    });

    it('should get user profile', async () => {
        // First, log in to get the token
        const loginRes = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        const token = loginRes.body.token;

        // Now, get the user profile
        const profileRes = await request(app)
            .get('/api/users/profile')
            .set('token', `${token}`); // Set the token in the Authorization header

        expect(profileRes.statusCode).toEqual(200);
        expect(profileRes.body).toHaveProperty('username', 'testuser');
    });
});
