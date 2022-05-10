// Main Imports
import Fuse from "fuse.js";
// Data
import products from "../../data/products.json";

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  useExtendedSearch: true,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  fieldNormWeight: 1,
  keys: ["title", "titleAR"],
};

const fuse = new Fuse(products, options);

export const searchFuse = {
  search: (keyword) => fuse.search(keyword),
};
