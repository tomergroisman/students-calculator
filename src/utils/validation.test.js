import { gradesValidationRules } from './validation';

describe('Validation Tests', () => {

  it('should check invalid string - characters in string', () => {
    const testString = '10, 20, 30, r, 70'
    expect(gradesValidationRules.isAllNumbersOrCommas.validator(testString)).toBe(false);
    expect(gradesValidationRules.isNotEmpty.validator(testString)).toBe(true);
  }); 
  it('should check invalid string - only characters no commas', () => {
    const testString = 'a b c'
    expect(gradesValidationRules.isAllNumbersOrCommas.validator(testString)).toBe(false);
    expect(gradesValidationRules.isNotEmpty.validator(testString)).toBe(true);
  }); 
  it('should check invalid string - only characters with commas', () => {
    const testString = 'a, b, c'
    expect(gradesValidationRules.isAllNumbersOrCommas.validator(testString)).toBe(false);
    expect(gradesValidationRules.isNotEmpty.validator(testString)).toBe(true);
  }); 
  it('should check invalid string - single character', () => {
    const testString = 'a'
    expect(gradesValidationRules.isAllNumbersOrCommas.validator(testString)).toBe(false);
    expect(gradesValidationRules.isNotEmpty.validator(testString)).toBe(true);
  }); 
  it('should check invalid string - two commas in a row', () => {
    const testString = '100,,90'
    expect(gradesValidationRules.isAllNumbersOrCommas.validator(testString)).toBe(false);
    expect(gradesValidationRules.isNotEmpty.validator(testString)).toBe(true);
  }); 
  it('should check invalid string - empty string', () => {
    const testString = ''
    expect(gradesValidationRules.isAllNumbersOrCommas.validator(testString)).toBe(true);
    expect(gradesValidationRules.isNotEmpty.validator(testString)).toBe(false);
  }); 
  it('should check valid string - float number', () => {
    const testString = '90.5'
    expect(gradesValidationRules.isAllNumbersOrCommas.validator(testString)).toBe(true);
    expect(gradesValidationRules.isNotEmpty.validator(testString)).toBe(true);
  }); 
  it('should check valid string - single number', () => {
    const testString = '100'
    expect(gradesValidationRules.isAllNumbersOrCommas.validator(testString)).toBe(true);
    expect(gradesValidationRules.isNotEmpty.validator(testString)).toBe(true);
  }); 
  it('should check valid string - multiple numbers', () => {
    const testString = '100, 50, 30, 70, 95'
    expect(gradesValidationRules.isAllNumbersOrCommas.validator(testString)).toBe(true);
    expect(gradesValidationRules.isNotEmpty.validator(testString)).toBe(true);
  }); 

})
