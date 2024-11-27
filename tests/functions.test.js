const assert = require('node:assert');
const { expect } = require('chai');
const { sum, getSurnameWithInitials } = require('../math');

describe('Testing math.sum', () => {
  it('return 4: number when 2:number + 2:number', () => {
    assert.strictEqual(sum(2, 2), 4);
  });

  it('return 4: number when 2:string + 2:string', () => {
    assert.strictEqual(sum('2', '2'), 4);
  });

  it('return NaN: number when 2:number + "a":string', () => {
    const result = sum(2, 'a');
    const expected = NaN;
    assert.strictEqual(result, expected);
  });

  it('return NaN:number when {}:object + 4:number', () => {
    const result = sum({}, 4);

    expect(result).to.be.NaN;
  });

  it('return Infinity: Number.MAX_VALUE:number + Number.MAX_VALUE:number', () => {
    const result = sum(Number.MAX_VALUE, Number.MAX_VALUE);
    expect(result).to.be.not.finite;
  });
});

describe('getSurnameWithInitials', () => {
  it('should return surname with initials for a full name', () => {
    const result1 = getSurnameWithInitials('Іваненко Петро Сергійович');
    const expected1 = 'Іваненко П.С.';
    expect(result1).to.equal(expected1);

    const result2 = getSurnameWithInitials('Шевченко Тарас Григорович');
    const expected2 = 'Шевченко Т.Г.';
    expect(result2).to.equal(expected2);
  });

  it('should return surname with initials for name without patronymic', () => {
    const result = getSurnameWithInitials('Коваленко Анна');
    const expected = 'Коваленко А.';
    expect(result).to.equal(expected);
  });

  it('should handle extra spaces correctly', () => {
    const result1 = getSurnameWithInitials(
      '    Іваненко     Петро     Сергійович     '
    );
    const expected1 = 'Іваненко П.С.';
    expect(result1).to.equal(expected1);

    const result2 = getSurnameWithInitials('    Шевченко       Тарас       ');
    const expected2 = 'Шевченко Т.';
    expect(result2).to.equal(expected2);
  });

  it('should throw an error if the input is not a string', () => {
    expect(() => getSurnameWithInitials(123)).to.throw(
      'Input must be a string'
    );
    expect(() => getSurnameWithInitials(null)).to.throw(
      'Input must be a string'
    );
    expect(() => getSurnameWithInitials({})).to.throw('Input must be a string');
  });

  it('should throw an error if only one word is provided', () => {
    expect(() => getSurnameWithInitials('Прізвище')).to.throw(
      'Full name must include at least a surname and a first name'
    );
  });

  it('should throw an error if more than 3 words are provided', () => {
    expect(() =>
      getSurnameWithInitials("Прізвище Ім'я Побатькові BlaBlaBla")
    ).to.throw('Full name must include a maximum of 3 words');
  });
});
