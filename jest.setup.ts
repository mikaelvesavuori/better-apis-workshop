import { mockServer } from './tests/mocks';

// Allow mocking to be enabled / disabled
if (process.env.IS_MOCK_ENABLED === 'true') {
  beforeAll(() => mockServer.listen());
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());
}
