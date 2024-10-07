import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '../src/hooks/useLocalStorage';

describe('useLocalStorage', () => {
    const key = 'testKey';
    const initialValue = 'testValue';

    beforeEach(() => {
        window.localStorage.clear(); // Clear local storage before each test
    });

    it('should initialize with the initial value', () => {
        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        expect(result.current[0]).toBe(initialValue);
    });

    it('should retrieve value from localStorage', () => {
        window.localStorage.setItem(key, JSON.stringify('storedValue'));
        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        expect(result.current[0]).toBe('storedValue');
    });

    it('should update the value and localStorage', () => {
        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        
        act(() => {
            result.current[1]('newValue'); // Update value
        });

        expect(result.current[0]).toBe('newValue');
        expect(window.localStorage.getItem(key)).toBe(JSON.stringify('newValue'));
    });

    it('should accept a function as an argument to update the value', () => {
        const { result } = renderHook(() => useLocalStorage(key, initialValue));

        act(() => {
            result.current[1](prev => prev + ' updated'); // Update value using a function
        });

        expect(result.current[0]).toBe('testValue updated');
        expect(window.localStorage.getItem(key)).toBe(JSON.stringify('testValue updated'));
    });

    it('should handle JSON parse error gracefully', () => {
        window.localStorage.setItem(key, 'invalidJSON'); // Set invalid JSON
        const { result } = renderHook(() => useLocalStorage(key, initialValue));
        expect(result.current[0]).toBe(initialValue); // Should fall back to initial value
    });
});
