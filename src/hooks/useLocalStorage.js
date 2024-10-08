import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }catch(err){
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
          const valueToStore = value instanceof Function ? value(storedValue) : value;
          setStoredValue(valueToStore); // Updating the state with new value
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
          console.log(err);
        }
      };
      

    return [storedValue, setValue];
};

export default useLocalStorage;