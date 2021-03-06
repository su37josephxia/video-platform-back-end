import { app } from 'egg-mock/bootstrap';
import * as factories from './factories';

before(() => {
  factories.setup(app);
});

afterEach(async () => {
  // clear database after each test case
  await Promise.all([app.model.User.destroy({ truncate: true, force: true })]);
});

after(async () => {
  await factories.cleanup();
});