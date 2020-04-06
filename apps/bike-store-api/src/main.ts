/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { Bike } from '@multi-markets/bike-interfaces';

const app = express();

app.get('/api', (req, res) => {
  const mockBike: Bike = {
    brand: 'Trek',
    wheelSize: 26,
    price: 1200
  };
  res.send({ message: 'Welcome to bike-store-api!', bike: mockBike });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
