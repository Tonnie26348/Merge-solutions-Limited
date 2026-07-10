import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('BOLA/IDOR Security (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Admin A should not be able to access Apartment B (403)', async () => {
    // Admin A token, Apartment B ID
    return request(app.getHttpServer())
      .get('/apartments/APARTMENT_B_ID')
      .set('Authorization', 'Bearer <ADMIN_A_TOKEN>')
      .expect(403);
  });
});
