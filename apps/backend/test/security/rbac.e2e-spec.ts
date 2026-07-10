import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('RBAC Security (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Resident should not be able to create an apartment (403)', async () => {
    // Assuming a resident token exists
    return request(app.getHttpServer())
      .post('/apartments')
      .set('Authorization', 'Bearer <RESIDENT_TOKEN>')
      .send({ name: 'Hacked Complex', address: '123 Fake St' })
      .expect(403);
  });
});
