// Main Imports
import { useState, useEffect, useRef } from "react";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useStopPropagation from "../../../../helpers/useStopPropagation";
// Styles
import styles from "./NavbarSearch.module.css";
// Icons
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// redux
import { useSelector } from "react-redux";
// Data
import selectOptions from "../../../../../data/selectOptios/selectOptios.json";
import selectOptionsAR from "../../../../../data/selectOptios/selectOptiosAR.json";
import { searchFuse } from "../../../../helpers/searchFuse";

const NavbarSearch = () => {
  const { lang } = useSelector((state) => state.shared);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [query, setQuery] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (typeof query === "string" || query instanceof String) {
      const timeOutId = setTimeout(() => {
        const results = searchFuse.search(query);

        const matchWithCategory =
          categoryOptions.length !== 0
            ? results.filter((el) =>
                el.item.category[0]
                  .trim()
                  .toLowerCase()
                  .includes(...categoryOptions.map((x) => x.value))
              )
            : results;
        setFilteredResults(matchWithCategory);
      }, 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [query, categoryOptions]);

  const wrapperRef = useRef(null);

  useStopPropagation(wrapperRef, () => {
    setShowSearchDropdown(false);
  });

  const searchChange = (e) => {
    setQuery(e.target.value);
    setShowSearchDropdown(true);
  };

  const onSubmit = () => {
    console.log("Search Submit");
  };

  const defaultValue =
    lang === "en"
      ? selectOptions.filter((el) => el.value === "all")
      : selectOptionsAR.filter((el) => el.value === "all");

  const customContentRenderer = ({ props, state }) =>
    state.values.length === 0 ? (
      <div className="w-100 mx-1 text-center">
        {lang === "en" ? "Select" : "اختار"}
      </div>
    ) : state.values.length === 1 ? (
      <div className="w-100 mx-1 text-center">{state.values[0].label}</div>
    ) : (
      <div className="w-100 mx-1 text-center">
        {state.values.length} {lang === "en" ? "Items" : "فئات"}
      </div>
    );

  return (
    <form
      className={styles.search}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className="input-group" ref={wrapperRef}>
        <Select
          options={lang === "en" ? selectOptions : selectOptionsAR}
          className="custom-select"
          separator
          multi
          direction={lang === "en" ? "ltr" : "rtl"}
          values={defaultValue}
          contentRenderer={customContentRenderer}
          onChange={(values) => setCategoryOptions(values)}
        />
        <input
          type="text"
          placeholder={
            lang === "en" ? "What are you looking for?" : "ما الذى تبحث عنه؟"
          }
          aria-label="What are you looking for?"
          aria-describedby="search"
          {...register("search")}
          onChange={searchChange}
        />
        {showSearchDropdown && filteredResults.length !== 0 && (
          <div className={`${styles["search-results"]}`}>
            <div className="row g-0">
              <div className="col-8">
                <ul>
                  {filteredResults?.map((result) => (
                    <li key={result.item.id}>
                      <Link href="/category">
                        <a>
                          {result.item.title} in{" "}
                          <span className="text-muted">
                            {result.item.category[0].title}
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-4">
                <ul>
                  <li>
                    <h2 className="h6 text-muted">Matching Brands</h2>
                  </li>
                  {filteredResults?.map((result) => (
                    <li key={result.item.id}>
                      <Link href="/category">
                        <a>{result.item.brand}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <span className={styles.icon} id="search">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    </form>
  );
};

export default NavbarSearch;
