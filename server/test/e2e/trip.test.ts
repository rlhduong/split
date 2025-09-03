import { request, clearTable } from './helper';
import { user1, user2, trips } from '../data';

let cookies1: any;
let cookies2: any;
beforeAll(async () => {
  await clearTable('User');
  const reg1 = await request({
    path: '/users/register',
    method: 'POST',
    body: {
      email: user1.email,
      password: user1.password,
    },
  });

  const reg2 = await request({
    path: '/users/register',
    method: 'POST',
    body: {
      email: user2.email,
      password: user2.password,
    },
  });
  cookies1 = reg1.setCookies;
  cookies2 = reg2.setCookies;
});

beforeEach(async () => {
  await clearTable('Trip');
});

describe('Trip Endpoints', () => {
  describe('POST /trips', () => {
    test('success - one trip', async () => {
      const res = await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[0].name,
          destination: trips[0].destination,
          startDate: trips[0].startDate,
          endDate: trips[0].endDate,
        },
        cookies: cookies1,
      });
      expect(res.status).toBe(200);
      expect(res.data.tripId).toStrictEqual(expect.any(String));
    });
    test('success - multiple trips', async () => {
      const res1 = await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[0].name,
          destination: trips[0].destination,
          startDate: trips[0].startDate,
          endDate: trips[0].endDate,
        },
        cookies: cookies1,
      });
      const res2 = await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[1].name,
          destination: trips[1].destination,
          startDate: trips[1].startDate,
          endDate: trips[1].endDate,
        },
        cookies: cookies1,
      });
      const res3 = await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[2].name,
          destination: trips[2].destination,
          startDate: trips[2].startDate,
          endDate: trips[2].endDate,
        },
        cookies: cookies2,
      });
      const res4 = await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[1].name,
          destination: trips[1].destination,
          startDate: trips[1].startDate,
          endDate: trips[1].endDate,
        },
        cookies: cookies2,
      });

      expect(res1.status).toStrictEqual(200);
      expect(res2.status).toStrictEqual(200);
      expect(res3.status).toStrictEqual(200);
      expect(res4.status).toStrictEqual(200);
    });
    test('fail - unauthenticated', async () => {
      const res = await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[0].name,
          destination: trips[0].destination,
          startDate: trips[0].startDate,
          endDate: trips[0].endDate,
        },
      });
      expect(res.status).toStrictEqual(401);
    });
  });
  describe('GET /trips', () => {
    test('success - empty', async () => {
      const res = await request({
        path: '/trips',
        method: 'GET',
        cookies: cookies1,
      });
      expect(res.status).toStrictEqual(200);
      expect(res.data.trips).toHaveLength(0);
    });
    test('success - non-empty', async () => {
      await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[0].name,
          destination: trips[0].destination,
          startDate: trips[0].startDate,
          endDate: trips[0].endDate,
        },
        cookies: cookies1,
      });
      const res1 = await request({
        path: '/trips',
        method: 'GET',
        cookies: cookies1,
      });
      expect(res1.status).toStrictEqual(200);
      expect(res1.data.trips).toHaveLength(1);
      expect(res1.data.trips[0].name).toStrictEqual(trips[0].name);
      expect(res1.data.trips[0].destination).toStrictEqual(
        trips[0].destination
      );
      expect(res1.data.trips[0].startDate).toStrictEqual(trips[0].startDate);
      expect(res1.data.trips[0].endDate).toStrictEqual(trips[0].endDate);

      await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[1].name,
          destination: trips[1].destination,
          startDate: trips[1].startDate,
          endDate: trips[1].endDate,
        },
        cookies: cookies1,
      });
      await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[2].name,
          destination: trips[2].destination,
          startDate: trips[2].startDate,
          endDate: trips[2].endDate,
        },
        cookies: cookies1,
      });
      const res2 = await request({
        path: '/trips',
        method: 'GET',
        cookies: cookies1,
      });
      expect(res2.data.trips).toHaveLength(3);
    });
    test('success - 2 users', async () => {
      await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[0].name,
          destination: trips[0].destination,
          startDate: trips[0].startDate,
          endDate: trips[0].endDate,
        },
        cookies: cookies1,
      });
      const res1 = await request({
        path: '/trips',
        method: 'GET',
        cookies: cookies1,
      });
      expect(res1.status).toStrictEqual(200);
      expect(res1.data.trips).toHaveLength(1);

      const res2 = await request({
        path: '/trips',
        method: 'GET',
        cookies: cookies2,
      });
      expect(res2.status).toStrictEqual(200);
      expect(res2.data.trips).toHaveLength(0);

      await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[1].name,
          destination: trips[1].destination,
          startDate: trips[1].startDate,
          endDate: trips[1].endDate,
        },
        cookies: cookies2,
      });
      const res3 = await request({
        path: '/trips',
        method: 'GET',
        cookies: cookies2,
      });
      expect(res3.status).toStrictEqual(200);
      expect(res3.data.trips).toHaveLength(1);
    });
    test('fail - unauthenticated', async () => {
      const res = await request({
        path: '/trips',
        method: 'GET',
      });
      expect(res.status).toStrictEqual(401);
    });
  });
  describe('GET /trips/:tripId', () => {
    test('success', async () => {
      const trip1 = await request({
        path: '/trips',
        method: 'POST',
        body: {
          name: trips[0].name,
          destination: trips[0].destination,
          startDate: trips[0].startDate,
          endDate: trips[0].endDate,
        },
        cookies: cookies1,
      });

      const tripId = trip1.data.tripId;
      const res = await request({
        path: `/trips/${tripId}`,
        method: 'GET',
        cookies: cookies1,
      });
      expect(res.status).toStrictEqual(200);
      expect(res.data.trip.name).toStrictEqual(trips[0].name);
      expect(res.data.trip.destination).toStrictEqual(trips[0].destination);
      expect(res.data.trip.startDate).toStrictEqual(trips[0].startDate);
      expect(res.data.trip.endDate).toStrictEqual(trips[0].endDate);
    });
    // test('fail - not found', async () => {
    //   const res = await request({
    //     path: '/trips/fail',
    //     method: 'GET',
    //     cookies: cookies1,
    //   });
    //   expect(res.status).toStrictEqual(404);
    // });
  });
});
