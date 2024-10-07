# hooks-library-react

## Package
```
npm i hooks-library-react
```
---

## useDataFetch
The useDataFetch hook allows you to fetch data from a given URL and manage the loading and error states effectively. It is ideal for simple data fetching in functional components.
Usage
```
const { data, loading, error } = useDataFetch('https://api.example.com/data');
```

- Parameters:
url (String): The URL to fetch data from.

-Returns:
data: The fetched data (initially null).
loading: A boolean indicating if the data is currently being loaded.
error: An error object if an error occurs during the fetching process.

---

## useDebounce
The useDebounce hook delays the update of a value until after a specified delay, which is useful for reducing the number of API calls or re-renders, especially when dealing with input fields or search bars.
Usage:
```
const debouncedValue = useDebounce(value, delay);
```

- Parameters:
value (Any): The value to debounce.
delay (Number): The delay in milliseconds before updating the debounced value.

- Returns:
debouncedValue: The debounced value, which only updates after the specified delay.

---

## useLocalStorage
The useLocalStorage hook allows you to manage and persist state in localStorage, which is useful for storing user preferences, session data, or other values that need to be persistent even after page refreshes.
Usage:
```
const [storedValue, setStoredValue] = useLocalStorage('key', 'initialValue');
```

- Parameters:
key (String): The key used to store the value in localStorage.
initialValue (Any): The initial value if nothing is stored in localStorage.

- Returns:
storedValue: The value retrieved from localStorage.
setStoredValue: A function to update and store a new value in localStorage.

---

## usePrevious
The usePrevious hook stores the previous value of a state or prop, which can be useful for tracking changes or making comparisons over time.
Usage:
```
const previousValue = usePrevious(value);
```
- Parameters:
  value (Any): The current value whose previous state needs to be tracked.

- Returns:
 previousValue: The value before the last update.
 value (Any): The current value whose previous state needs to be tracked.
