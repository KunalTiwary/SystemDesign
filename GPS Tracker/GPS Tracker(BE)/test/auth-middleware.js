const expect = require('chai').expect;
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', function () {
  it('should throw an error if no authorization header is present', function () {
    const req = {
      get: function () {
        return null;
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated'
    );
  });

  it('should yield a userId after decoding the token', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';  // sending a dummy token for testing
      },
    };

    let ranjan = jwt.verify;
    jwt.verify = () => {
      return { userId: 1 };
    };

    //jwt.verify.returns({ userId: '1' });
    expect(req).to.not.have.property('userId');
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property('userId');
    jwt.verify = ranjan;
    //expect(jwt.verify.called).to.be.true;
    //jwt.verify.restore();
  });

  it('should throw an error if the token cannot be verified', function () {
    const req = {
      get: function (headerName) {
        return 'Bearer xyz';
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
