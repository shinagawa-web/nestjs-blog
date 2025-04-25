import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { resetDatabase } from './utils/db';
import { Server } from 'http';

type PostResponse = {
  id: number;
  title: string;
  content: string;
};

describe('PostsController (e2e)', () => {
  let app: INestApplication;
  let httpServer: Server;
  let createdPostId: number;
  beforeAll(async () => {
    await resetDatabase();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    await app.close();
  });

  it('/posts (POST)', async () => {
    const response = await request(httpServer)
      .post('/posts')
      .send({ title: 'E2E Test Title', content: 'E2E Test Content' })
      .expect(201);

    const body = response.body as PostResponse;
    expect(body).toHaveProperty('id');
    expect(body.title).toBe('E2E Test Title');
    createdPostId = body.id;
  });

  it('/posts (GET)', async () => {
    const response = await request(httpServer).get('/posts').expect(200);
    const body = response.body as PostResponse[];
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it('GET /posts/:id', async () => {
    const response = await request(httpServer)
      .get(`/posts/${createdPostId}`)
      .expect(200);
    const body = response.body as PostResponse;

    expect(body.id).toBe(createdPostId);
    expect(body.title).toBe('E2E Test Title');
  });

  it('PATCH /posts/:id', async () => {
    const response = await request(httpServer)
      .patch(`/posts/${createdPostId}`)
      .send({ title: 'Updated Title', content: 'Updated Content' })
      .expect(200);
    const body = response.body as PostResponse;

    expect(body.title).toBe('Updated Title');
    expect(body.content).toBe('Updated Content');
  });

  it('DELETE /posts/:id', async () => {
    await request(httpServer).delete(`/posts/${createdPostId}`).expect(200);

    await request(httpServer).get(`/posts/${createdPostId}`).expect(404);
  });
});
