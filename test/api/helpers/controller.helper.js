// controller.helper.js

/* global describe, it */

const { expect } = require('chai');
const controllerHelper = require('../../../api/helpers/controller.helper');

describe('Controller Helper Tests', () => {
  it('buildError with stack Successfully', (done) => {
    const err = {
      stack: 'message stack',
    };

    const result = controllerHelper.buildErrorLog(err);
    const expectedResult = err.stack;

    expect(result).to.deep.equal(expectedResult);

    done();
  });

  it('buildError with message Successfully', (done) => {
    const err = {
      message: 'message',
    };

    const result = controllerHelper.buildErrorLog(err);
    const expectedResult = err.message;

    expect(result).to.equal(expectedResult);

    done();
  });

  it('buildError directly Successfully', (done) => {
    const err = {
      myerror: 'myerror',
    };

    const result = controllerHelper.buildErrorLog(err);
    const expectedResult = JSON.stringify(err);

    expect(result).to.equal(expectedResult);

    done();
  });

  it('buildError undefined Successfully', (done) => {
    const err = undefined;

    const result = controllerHelper.buildErrorLog(err);
    const expectedResult = 'Error not defined';

    expect(result).to.equal(expectedResult);

    done();
  });
});
