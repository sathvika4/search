/*import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};*/
export const SearchResult = ({ text }) => (
  <div className="search-result-card">
    <p>{text}</p>
  </div>
);


