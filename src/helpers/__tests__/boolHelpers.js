import * as boolHelpers from '../boolHelpers';

describe("truthyOrLengthy", () =>{
  const { truthyOrLengthy } = boolHelpers;
  it('exists', () => {
    expect(truthyOrLengthy).toBeDefined();
  })
  it('returns false for all falsy values', () => {
    expect(truthyOrLengthy(false)).toBe(false)
    expect(truthyOrLengthy(0)).toBe(false)
    expect(truthyOrLengthy(-0)).toBe(false)
    expect(truthyOrLengthy(0n)).toBe(false)
    expect(truthyOrLengthy("")).toBe(false)
    expect(truthyOrLengthy(null)).toBe(false)
    expect(truthyOrLengthy(undefined)).toBe(false)
    expect(truthyOrLengthy(NaN)).toBe(false)
  })
  it('returns false for empty arrays and objects', () => {
    expect(truthyOrLengthy([])).toBe(false)
    expect(truthyOrLengthy({})).toBe(false)
  })
  it('returns true for all other truthy values', () => {
    expect(truthyOrLengthy(-1)).toBe(true)
    expect(truthyOrLengthy("0")).toBe(true)
    expect(truthyOrLengthy(true)).toBe(true)
    expect(truthyOrLengthy({ status: false })).toBe(true)
    expect(truthyOrLengthy([false])).toBe(true)
  })
})