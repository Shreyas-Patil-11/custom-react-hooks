// __tests__/usePrevious.test.js
import { renderHook } from '@testing-library/react-hooks';
import usePrevious from '../src/hooks/usePrevious';

test('should return the previous value correctly', () => {
  const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
    initialProps: { value: 'value1' }
  });

  // First render: previous value should be undefined
  expect(result.current).toBeUndefined();

  // Second render: previous value should be 'value1'
  rerender({ value: 'value2' });
  expect(result.current).toBe('value1');

  // Third render: previous value should be 'value2'
  rerender({ value: 'value3' });
  expect(result.current).toBe('value2');
});
