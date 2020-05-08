import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import './App.css';

const App: React.FC = () => {
  const [data, setData] = useState({});
  const [input, setInput] = useState('macjabeth');
  const [username] = useDebounce(input, 500);

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        response = await fetch(`https://api.github.com/users/${username}/followers`);
        const followers = await response.json();
        setData({ ...data, followers });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [username]);

  const handleChange = (e: any) => setInput(e.target.value);

  return (
    <div className="app">
      <header>
        <input type="text" value={input} onChange={handleChange} aria-label='Username' />
      </header>
      <main>
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </main>
    </div>
  );
};

export default App;
