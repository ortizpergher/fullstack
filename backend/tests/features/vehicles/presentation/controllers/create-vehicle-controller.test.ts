import request from 'supertest';
import { app } from '@main/config/app';

describe('Create vehicle controller tests', () => {
  it('Should create a vehicle successfully', async () => {
    const response = await request(app).post('/vehicles').send({
      licensePlate: 'IBC-9877',
      brand: 'Brand test',
      model: 'Model test',
      version: 'Version test',
      year: 2020,
      enable: true,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy;
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.licensePlate).toBe('IBC-9877');
    expect(response.body.data.brand).toBe('Brand test');
    expect(response.body.data.model).toBe('Model test');
    expect(response.body.data.version).toBe('Version test');
    expect(response.body.data.year).toBe(2020);
    expect(response.body.data.enable).toBeTruthy;
  });

  it('should not be able to create a new vehicle if license plate is empty', async () => {
    await request(app)
      .post('/vehicles')
      .send({
        licensePlate: '',
        brand: 'Brand test',
        model: 'Model test',
        version: 'Version test',
        year: 2020,
        enable: true,
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBeFalsy();
      });
  });

  it('should not be able to create a new vehicle if brand is empty', async () => {
    await request(app)
      .post('/vehicles')
      .send({
        licensePlate: 'III-1011',
        brand: '',
        model: 'Model test',
        version: 'Version test',
        year: 2020,
        enable: true,
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBeFalsy();
      });
  });

  it('should not be able to create a new vehicle model is empty', async () => {
    await request(app)
      .post('/vehicles')
      .send({
        licensePlate: 'III-1011',
        brand: 'Brand test',
        model: '',
        version: 'Version test',
        year: 2020,
        enable: true,
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBeFalsy();
      });
  });

  it('should not be able to create a new vehicle year is empty', async () => {
    await request(app)
      .post('/vehicles')
      .send({
        licensePlate: 'III-1011',
        brand: 'Brand test',
        model: 'Model test',
        version: 'Version test',
        enable: true,
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.success).toBeFalsy();
      });
  });
});
