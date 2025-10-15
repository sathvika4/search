/*import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};*/

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!input) {
      setResults([]);
      return;
    }

    const fetchGPT = async () => {
      try {
        const response = await fetch("http://localhost:5050/api/gpt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: input }),
        });
        const data = await response.json();
        setResults([{ text: data.text }]);
      } catch (err) {
        console.error(err);
        setResults([{ text: "Error fetching GPT response." }]);
      }
    };

    const timeout = setTimeout(fetchGPT, 500); // debounce
    return () => clearTimeout(timeout);
  }, [input, setResults]);

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Ask GPT-4 anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
