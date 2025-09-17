const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/User');

jest.setTimeout(60000); // 60 secondes

    
let mongoServer;

beforeAll(async () => {
  // Créer une DB Mongo en mémoire
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});

afterEach(async () => {
  // Nettoyer toutes les collections après chaque test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Auth Endpoints', () => {
    
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'testuser@example.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('testuser@example.com');
  });

  it('should login an existing user', async () => {
    // Créer l'utilisateur via l'API register
    await request(app)
        .post('/api/auth/register')
        .send({ email: 'testuser@example.com', password: '123456' });

    // Puis tester le login
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: '123456' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('testuser@example.com');
  });
});
