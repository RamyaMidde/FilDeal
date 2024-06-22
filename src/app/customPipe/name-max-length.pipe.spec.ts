import { NameMaxLengthPipe } from './name-max-length.pipe';

describe('NameMaxLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new NameMaxLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
