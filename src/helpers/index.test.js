import { getLetterMatchCount } from './index';

describe('getLetterMatchCount', () => {

  const secretWord = 'party';

  test('returns correct count when there are no matching letters', () => {

    expect(getLetterMatchCount('eeeee', 'party')).toBe(0);

  })

  test('returns correct count when there are 3 matching letters', () => {

    expect(getLetterMatchCount('parzz', 'party')).toBe(3);

  })

  test('returns correct count when there are duplicate letters', () => {

    expect(getLetterMatchCount('parka', 'party')).toBe(3);

  })

})