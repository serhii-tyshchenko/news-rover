import { renderHook, act } from '@testing-library/react';
import useToggle from './use-toggle';

describe('useToggle', () => {
  it('should return initial value and toggle function', () => {
    const { result } = renderHook(() => useToggle(true));
    const [value, toggleValue] = result.current;

    expect(value).toBe(true);
    expect(typeof toggleValue).toBe('function');
  });

  it('should toggle the value when toggle function is called', () => {
    const { result } = renderHook(() => useToggle(true));
    const [value, toggleValue] = result.current;

    expect(value).toBe(true);

    act(() => {
      toggleValue();
    });

    expect(result.current[0]).toBe(false);
  });
});
