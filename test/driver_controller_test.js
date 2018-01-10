const assert = require('assert');
const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {

   it('Post to /api/drivers creates a new driver', (done) => {
      Driver.count().then(count => {
         request(app)
            .post('/api/drivers')
            .send({ email: 'test@email.com' })
            .end(() => {

               Driver.count().then(newcount => {
                  assert(count + 1 === newcount);
                  done();
               });
            });
      });

   });

   it('PUT to /api/drivers/:id updates a driver', (done) => {
      const driver = new Driver({ email: 'joe@example.com', driving: false });
      driver.save().then(() => {
         request(app)
            .put(`/api/drivers/${driver._id}`)
            .send({ driving: true })
            .end(() => {
               Driver.findOne({ email: 'joe@example.com' })
                     .then(user => {
                        assert(user.driving === true);
                        done();
                     });
            });

      });
   });

   it('DELETE to /api/drivers/:id deletes a driver', (done) => {
      const driver = new Driver({ email: 'joe@exampletodelete.com' });
      driver.save().then(() => {
         request(app)
            .delete(`/api/drivers/${driver._id}`)
            .end((err, res) => {
               Driver.findOne({ email: 'joe@exampletodelete.com' })
                     .then(driver => {
                        assert(res.status === 204);
                        assert(driver === null);
                        done();
                     });
            });
      });

   });
});