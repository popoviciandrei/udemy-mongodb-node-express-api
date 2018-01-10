const Driver = require('../database/models/driver');

module.exports = {
   // GET /api
   greeting(req, res) {
      res.send({ hi: 'there' });
   },

   // POST /api/drivers
   create(req, res, next) {
      const driverProps = req.body;
      Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
   },

   // PUT /api/drivers/:id
   edit(req, res, next) {
      const driverId = req.params.id;
      const driverProps = req.body;

      Driver.findByIdAndUpdate(driverId, driverProps)
            .then(() => Driver.findById({ _id: driverId }))
            .then(driver => res.send(driver))
            .catch(next);
   },

   // DELETE /api/drivers/:id
   delete(req, res, next) {
      const driverId = req.params.id;

      Driver.findByIdAndRemove(driverId)
            .then((driver) => res.status(204).send(driver))
            .catch(next);
   }
};