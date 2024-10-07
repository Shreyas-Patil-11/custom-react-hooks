import { renderHook } from '@testing-library/react-hooks';
import useDataFetch from '../src/hooks/useDataFetch';

describe('useDataFetch', () => {
    const mockData = { name: 'John Doe' };
    const mockUrl = 'https://api.example.com/user';

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('should return data and set loading to false after a successful fetch', async () => {
        // Mock the global fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );

        const { result, waitForNextUpdate } = renderHook(() => useDataFetch(mockUrl));

        // Initial loading state
        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();

        // Wait for the next update
        await waitForNextUpdate();

        // Check the updated state
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it('should handle errors and set loading to false', async () => {
        // Mock the global fetch function to simulate an error
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        const { result, waitForNextUpdate } = renderHook(() => useDataFetch(mockUrl));

        // Initial loading state
        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();

        // Wait for the next update
        await waitForNextUpdate();

        // Check the updated state
        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeInstanceOf(Error);
        expect(result.current.error).toHaveProperty('message', 'Network response not ok');
    });

    afterEach(() => {
        // Cleanup the mocked fetch function
        jest.restoreAllMocks();
    });
});
