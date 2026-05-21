const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');
const { sequelize } = require('../models');

// Setup mock app for testing
const app = express();
app.use(express.json());
app.use('/api', authRoutes);

describe('Auth API Testing (CE-02 L65-72)', () => {
    // Before running tests, clear local DB or use a mock
    beforeAll(async () => {
        // Sync database if it requires it for real queries, 
        // Note: For unit testing, you usually mock the DB or use SQLite in-memory
        await sequelize.authenticate();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should validate missing fields on register', async () => {
        const res = await request(app).post('/api/register').send({});
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('errors');
    });

    it('should validate missing fields on login', async () => {
        const res = await request(app).post('/api/login').send({ email: 'invalid@email.com' });
        expect(res.statusCode).toEqual(400); // Because password is not provided
        expect(res.body).toHaveProperty('errors');
    });
});
