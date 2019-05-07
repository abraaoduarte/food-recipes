import jwt from 'jwt-simple';
import moment from 'moment';

const makeUserResponse = (user) => {
  const payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user,
  };

  return {
    token: jwt.encode(payload, process.env.JWT_SECRET),
    user: { ...user, password: undefined },
  };
};

export default makeUserResponse;
