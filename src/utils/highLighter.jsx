import React from "react";

const highlighter = ({ searchVal = "", text = "" }) => {
  text = text.trim() ?? "";
  searchVal = searchVal.trim() ?? "";
  text = text.toString();
  if (text.trim() !== "" && searchVal.trim() !== "") {
    const escapedHighlight = searchVal.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === searchVal.toLowerCase() ? (
        <span className="bg-high-ligher" key={`${index}-searchkey`}>
          {part}
        </span>
      ) : (
        part
      )
    );
  } else {
    return text;
  }
};
export default highlighter;
