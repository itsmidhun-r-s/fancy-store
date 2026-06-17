import { useState } from "react";

export default function SearchBar({
  onSearch,
}) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  const styles = {
    searchBar: {
      display: "flex",
      gap: "10px",
      margin: "20px 0",
    },
    input: {
      flex: 1,
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <form
      style={styles.searchBar}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        style={styles.input}
      />

      <button
        type="submit"
        style={styles.button}
      >
        Search
      </button>
    </form>
  );
}