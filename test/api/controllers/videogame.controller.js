// videogame.controller.js

/* global describe, it, before, after */
/* eslint no-shadow: ['error', { 'allow': ['done'] }] */

const supertest = require('supertest');
const { expect } = require('chai');
const should = require('chai').should();
const sinon = require('sinon');
const app = require('../../../app');

const vgController = require('../../../api/controllers/videogame.controller');
const controllerHelper = require('../../../api/helpers/controller.helper');
const vgService = require('../../../api/services/videogame.service');
const messageHelper = require('../../../api/helpers/message.helper');
const expectations = require('../expectations/expectations');

describe('VideoGame Controller Tests', () => {
  let request = null;
  let server = null;

  before((done) => {
    server = app.listen(done);
    request = supertest.agent(server);
  });

  after((done) => {
    server.close(done);
  });

  // ////////////////////////////////////////////////////////////////////////////////
  // // getVideoGames
  // ////////////////////////////////////////////////////////////////////////////////

  describe('getVideoGames Tests', () => {
    describe('GET /videogames Successfully', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGames').returns(expectations.getVideoGamesExpectation.slice());
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /videogames Successfully', (done) => {
        request
          .get('/videogames')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectations.getVideoGamesExpectation);
              done();
            }
          });
      });
    });

    describe('GET /videogames Failed with Exception', () => {
      let myStub;

      const expErrMsg = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'getVideoGames');

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGames').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /videogames Failed with Exception', (done) => {
        request
          .get('/videogames')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expErrMsg);
              done();
            }
          });
      });
    });
  });

  //   ////////////////////////////////////////////////////////////////////////////////
  //   // getVideoGameById
  //   ////////////////////////////////////////////////////////////////////////////////

  describe('getVideoGameById Tests', () => {
    describe('GET /videogames/{id} Successfully', () => {
      let myStub;

      const videoGameExpectation = expectations.getVideoGamesExpectation[0];

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGameById').returns(videoGameExpectation);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /videogames/{id} Successfully', (done) => {
        request
          .get('/videogames/AAAA1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(videoGameExpectation);
              done();
            }
          });
      });
    });

    describe('GET /videogames/{id} Failed --> videogame not found', () => {
      let myStub;

      const expErrMsg = messageHelper.buildMessage(vgController.VG_CT_ERR_VIDEOGAME_NOT_FOUND);

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGameById').returns(undefined);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /videogames/{id} Failed --> videogame not found', (done) => {
        request
          .get('/videogames/AAAA1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expErrMsg);
              done();
            }
          });
      });
    });

    describe('GET /videogames/{id} Failed with Exception', () => {
      let myStub;

      const expErrMsg = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'getVideoGameById');

      before((done) => {
        myStub = sinon.stub(vgService, 'getVideoGameById').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('GET /videogames/{id} Failed with Exception', (done) => {
        request
          .get('/videogames/AAAA1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expErrMsg);
              done();
            }
          });
      });
    });
  });

  //   ////////////////////////////////////////////////////////////////////////////////
  //   // createVideoGame
  //   ////////////////////////////////////////////////////////////////////////////////

  describe('createVideoGame Tests', () => {
    describe('POST /videogames Successfully', () => {
      let myStub;

      const videogameToCreate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const videogameCreatedWithId = {
        id: 'EEEE1',
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      before((done) => {
        myStub = sinon.stub(vgService, 'createVideoGame').returns(videogameCreatedWithId);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('POST /videogames Successfully', (done) => {
        request
          .post('/videogames')
          .send(videogameToCreate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(videogameCreatedWithId);
              done();
            }
          });
      });
    });

    describe('POST /videogames Failed --> Exists a videogame with the same name', () => {
      let myStub;

      const videogameToCreate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const errMessage = vgService.VG_SVC_ERR_CREATE_VG_ALREADY_EXISTS_WITH_SAME_NAME;
      const resultServiceError = messageHelper.buildErrorMessage(errMessage);
      const expectedControllerErrorMessage = messageHelper.buildMessage(errMessage);

      before((done) => {
        myStub = sinon.stub(vgService, 'createVideoGame').returns(resultServiceError);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('POST /videogames Failed --> Exists a videogame with the same name', (done) => {
        request
          .post('/videogames')
          .send(videogameToCreate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedControllerErrorMessage);
              done();
            }
          });
      });
    });

    describe('POST /videogames Failed with Exception', () => {
      let myStub;

      const videogameToCreate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const expectedControllerErrorMessage = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'createVideoGame');

      before((done) => {
        myStub = sinon.stub(vgService, 'createVideoGame').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('POST /videogames Failed with Exception', (done) => {
        request
          .post('/videogames')
          .send(videogameToCreate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedControllerErrorMessage);
              done();
            }
          });
      });
    });
  });

  //   ////////////////////////////////////////////////////////////////////////////////
  //   // updateVideoGame
  //   ////////////////////////////////////////////////////////////////////////////////

  describe('updateVideoGame Tests', () => {
    describe('PUT /videogames/{id} Successfully', () => {
      let myStub;

      const idVideoGameToUpdate = 'EEEE1';

      const videogameToUpdate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const videogameToUpdateWithId = {
        id: 'EEEE1',
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      before((done) => {
        myStub = sinon.stub(vgService, 'updateVideoGame').returns(videogameToUpdateWithId);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('PUT /videogames/{id} Successfully', (done) => {
        request
          .put(`/videogames/${idVideoGameToUpdate}`)
          .send(videogameToUpdate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(videogameToUpdateWithId);
              done();
            }
          });
      });
    });

    describe('PUT /videogames/{id} Failed --> videogame not found', () => {
      let myStub;

      const idVideoGameToUpdate = 'EEEE1';

      const videogameToUpdate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const ErrSvcMessage = vgService.VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND;
      const expErrMsg = messageHelper.buildMessage(ErrSvcMessage);

      before((done) => {
        myStub = sinon.stub(vgService, 'updateVideoGame').returns(messageHelper.buildErrorMessage(vgService.VG_SVC_ERR_UPDATE_VG_VIDEOGAME_NOT_FOUND));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('PUT /videogames/{id} Failed --> videogame not found', (done) => {
        request
          .put(`/videogames/${idVideoGameToUpdate}`)
          .send(videogameToUpdate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expErrMsg);
              done();
            }
          });
      });
    });

    describe('PUT /videogames/{id} Failed with Exception', () => {
      let myStub;

      const idVideoGameToUpdate = 'EEEE1';

      const videogameToUpdate = {
        name: 'Chrono Trigger',
        developer: 'Square',
        gamesystem: 'Nintendo Super NES',
        genre: 'Rol',
        year: 1995,
        image: 'images.chronotriggerImage',
      };

      const expectedControllerErrorMessage = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'updateVideoGame');

      before((done) => {
        myStub = sinon.stub(vgService, 'updateVideoGame').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('PUT /videogames/{id} Failed with Exception', (done) => {
        request
          .put(`/videogames/${idVideoGameToUpdate}`)
          .send(videogameToUpdate)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedControllerErrorMessage);
              done();
            }
          });
      });
    });
  });

  //   ////////////////////////////////////////////////////////////////////////////////
  //   // deleteVideoGame
  //   ////////////////////////////////////////////////////////////////////////////////

  describe('deleteVideoGame Tests', () => {
    describe('DELETE /videogames/{id} Successfully', () => {
      let myStub;

      const idVideogameToDelete = 'EEEE1';

      const errMsg = messageHelper.buildMessage(vgController.VG_CT_VIDEOGAME_DELETED_SUCCESSFULLY);

      before((done) => {
        myStub = sinon.stub(vgService, 'deleteVideoGame').returns(true);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('DELETE /videogames/{id} Successfully', (done) => {
        request
          .delete(`/videogames/${idVideogameToDelete}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(errMsg);
              done();
            }
          });
      });
    });

    describe('DELETE /videogames/{id} Failed --> Videogame not found', () => {
      let myStub;

      const idVideogameToDelete = 'EEEE1';

      const errMessage = vgService.VG_SVC_ERR_DELETE_VG_VIDEOGAME_NOT_FOUND;
      const resultServiceError = messageHelper.buildErrorMessage(errMessage);
      const resultControllerMessage = messageHelper.buildMessage(errMessage);

      before((done) => {
        myStub = sinon.stub(vgService, 'deleteVideoGame').returns(resultServiceError);
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('DELETE /videogames/{id} Failed --> Videogame not found', (done) => {
        request
          .delete(`/videogames/${idVideogameToDelete}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(resultControllerMessage);
              done();
            }
          });
      });
    });

    describe('DELETE /videogames/{id} Failed with Exception', () => {
      let myStub;

      const idVideogameToDelete = 'EEEE1';

      const expectedErrorMessage = controllerHelper.buildErrorResponse(vgController.MODULE_NAME, 'deleteVideoGame');

      before((done) => {
        myStub = sinon.stub(vgService, 'deleteVideoGame').throws(new Error('error'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });

      it('DELETE /videogames/{id} Failed with Exception', (done) => {
        request
          .delete(`/videogames/${idVideogameToDelete}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              should.not.exist(err);
              expect(res.body).to.deep.equal(expectedErrorMessage);
              done();
            }
          });
      });
    });
  });
});
