import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from '../src/hooks/useDebounce';

describe('useDebounce', () => {
  it('should update the debounced value after the specified delay', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
      initialProps: { value: 'initial' },
    });

    // Check that the debounced value is still the initial value
    expect(result.current).toBe('initial');

    // Change the input value
    rerender({ value: 'new value' });

    // Wait for the specified delay
    await waitForNextUpdate();

    // Check that the debounced value is updated
    expect(result.current).toBe('new value');
  });

  it('should reset the debounced value when the value changes again before the delay', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
      initialProps: { value: 'initial' },
    });

    // Change the input value
    rerender({ value: 'new value' });

    // Wait for a short time before changing the value again
    await new Promise(resolve => setTimeout(resolve, 500));

    // Change the input value again
    rerender({ value: 'another value' });

    // Wait for the delay to pass
    await waitForNextUpdate();

    // Check that the debounced value is updated
    expect(result.current).toBe('another value');
  });
});
