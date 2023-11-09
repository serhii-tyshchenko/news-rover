import { expect, describe, it } from 'vitest';

import { getClassName } from './get-class-name';

describe('getClassName', () => {
  it('should return an empty string when no arguments are passed', () => {
    expect(getClassName()).toEqual('');
  });

  it('should return a single class name when a single string argument is passed', () => {
    expect(getClassName('my-class')).toEqual('my-class');
  });

  it('should return multiple class names when multiple string arguments are passed', () => {
    expect(getClassName('my-class', 'my-other-class')).toEqual(
      'my-class my-other-class'
    );
  });

  it('should ignore falsy arguments', () => {
    expect(
      getClassName('my-class', null, undefined, '', 'my-other-class')
    ).toEqual('my-class my-other-class');
  });

  it('should map object arguments to class names based on their keys', () => {
    expect(getClassName({ 'my-class': true, 'my-other-class': false })).toEqual(
      'my-class'
    );
  });

  it('should map object arguments to class names based on their truthiness', () => {
    expect(getClassName({ 'my-class': true, 'my-other-class': 1 })).toEqual(
      'my-class my-other-class'
    );
  });

  it('should support a mix of string and object arguments', () => {
    expect(getClassName('my-class', { 'my-other-class': true })).toEqual(
      'my-class my-other-class'
    );
  });
  it('should map array arguments to class names based on their truthiness', () => {
    expect(getClassName(['my-class', 'my-other-class'])).toEqual(
      'my-class my-other-class'
    );
  });
});
