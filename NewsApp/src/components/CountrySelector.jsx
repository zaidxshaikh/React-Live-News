import React, { useState } from "react";

const countries = [
  { code: "us", name: "United States", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
  { code: "in", name: "India", flag: "\uD83C\uDDEE\uD83C\uDDF3" },
  { code: "gb", name: "United Kingdom", flag: "\uD83C\uDDEC\uD83C\uDDE7" },
  { code: "ca", name: "Canada", flag: "\uD83C\uDDE8\uD83C\uDDE6" },
  { code: "au", name: "Australia", flag: "\uD83C\uDDE6\uD83C\uDDFA" },
  { code: "de", name: "Germany", flag: "\uD83C\uDDE9\uD83C\uDDEA" },
  { code: "fr", name: "France", flag: "\uD83C\uDDEB\uD83C\uDDF7" },
  { code: "jp", name: "Japan", flag: "\uD83C\uDDEF\uD83C\uDDF5" },
  { code: "ae", name: "UAE", flag: "\uD83C\uDDE6\uD83C\uDDEA" },
  { code: "sa", name: "Saudi Arabia", flag: "\uD83C\uDDF8\uD83C\uDDE6" },
  { code: "br", name: "Brazil", flag: "\uD83C\uDDE7\uD83C\uDDF7" },
  { code: "za", name: "South Africa", flag: "\uD83C\uDDFF\uD83C\uDDE6" },
];

const CountrySelector = ({ country, onCountryChange }) => {
  const [open, setOpen] = useState(false);
  const current = countries.find((c) => c.code === country) || countries[0];

  return (
    <div className="country-selector">
      <button
        className="country-selector__toggle"
        onClick={() => setOpen(!open)}
        title="Change country"
      >
        <span className="country-selector__flag">{current.flag}</span>
        <span className="country-selector__code">
          {current.code.toUpperCase()}
        </span>
      </button>
      {open && (
        <div className="country-selector__dropdown">
          <div className="country-selector__header">Select Region</div>
          {countries.map((c) => (
            <button
              key={c.code}
              className={`country-selector__item ${c.code === country ? "active" : ""}`}
              onClick={() => {
                onCountryChange(c.code);
                setOpen(false);
              }}
            >
              <span className="country-selector__item-flag">{c.flag}</span>
              <span className="country-selector__item-name">{c.name}</span>
              {c.code === country && (
                <span className="country-selector__check">{"\u2713"}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
