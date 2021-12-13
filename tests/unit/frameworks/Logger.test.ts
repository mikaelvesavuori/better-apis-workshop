import { Logger } from '../../../src/FakeUser/frameworks/Logger';

describe('Success cases', () => {
  const demoMessage = 'something';
  const logger = new Logger();

  beforeEach(() => {
    console.log = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
  });

  test('It should log an INFO message', () => {
    logger.log(demoMessage);

    expect(console.log).toHaveBeenCalled();
    // @ts-ignore
    const message = console.log.mock.calls[0][0].message;
    expect(message).toEqual(expect.stringContaining(demoMessage));
  });

  test('It should log a WARN message', () => {
    logger.warn(demoMessage);

    expect(console.warn).toHaveBeenCalled();
    // @ts-ignore
    const message = console.warn.mock.calls[0][0].message;
    expect(message).toEqual(expect.stringContaining(demoMessage));
  });

  test('It should log an ERROR message', () => {
    logger.error(demoMessage);

    expect(console.error).toHaveBeenCalled();
    // @ts-ignore
    const message = console.error.mock.calls[0][0].message;
    expect(message).toEqual(expect.stringContaining(demoMessage));
  });
});
