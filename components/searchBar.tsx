import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const styles = {
  container: "relative",
  search: "border border-solid border-[#666] rounded-lg px-2 py-1 w-[300px]",
  results:
    "list-none overflow-hidden mx-[9px] p-0 absolute top-full left-0 right-0",
  result: "",
};

export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query: string) =>
    `https://api.github.com/search/repositories?q=${encodeURIComponent(
      query
    )}&sort=stars&order=desc`;

  useEffect(() => {
    const interval = setInterval(() => {
      if (query.length) {
        if (lastQuery !== query) {
          setLastQuery(`${query}`);
          console.log("[Debug] sending repository search query.");
          fetch(searchEndpoint(query))
            .then((res) => res.json())
            .then((res) => {
              if (res.message) {
                console.log(res.message);
              }

              setResults(res.items);
            });
        }
      } else {
        setResults([]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [query, lastQuery]);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <div className={styles.container} ref={searchRef}>
      <input
        className={styles.search}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
        onFocus={onFocus}
        placeholder="Search posts"
        type="text"
        value={query}
      />
      {active && results && results.length > 0 && (
        <ul className={styles.results}>
          {results
            .filter(({ full_name }: any) => full_name.includes(query))
            .map(({ id, full_name }) => (
              <li
                className="bg-[#0070f3] text-[#eee] mt-[9px] ml-0 mr-0 p-[18px]"
                key={id}
              >
                <Link href="/repos/[...id]" as={`/repos/${full_name}`}>
                  <a className="text-white">{full_name}</a>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
