import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import sanitize from "sanitize-html";
import "./SanitizedContent.scss";

const config = {
  allowedTags: [
    "address",
    "article",
    "aside",
    "footer",
    "header",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hgroup",
    "main",
    "nav",
    "section",
    "blockquote",
    "dd",
    "div",
    "dl",
    "dt",
    "figcaption",
    "figure",
    "hr",
    "li",
    "main",
    "ol",
    "p",
    "pre",
    "ul",
    "a",
    "abbr",
    "b",
    "bdi",
    "bdo",
    "br",
    "cite",
    "code",
    "data",
    "dfn",
    "em",
    "i",
    "iframe",
    "img",
    "kbd",
    "mark",
    "q",
    "rb",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "s",
    "samp",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "time",
    "u",
    "var",
    "wbr",
    "caption",
    "col",
    "colgroup",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr",
  ],
  disallowedTagsMode: "discard",
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src", "alt"],
    figure: ["class"],
    div: ["data-oembed-url", "style"],
    iframe: ["src", "style", "allowFullScreen", "allow", "frameborder"],
  },
  selfClosing: [
    "br",
    "hr",
    "area",
    "base",
    "basefont",
    "input",
    "link",
    "meta",
  ],
  allowedSchemes: ["http", "https", "ftp", "mailto", "tel"],
  allowedSchemesByTag: {},
  allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
  allowProtocolRelative: true,
  enforceHtmlBoundary: false,
};

const SanitizedContent = ({ content }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`main-content ${theme}`}
      dangerouslySetInnerHTML={{
        __html: sanitize(content, config),
        // __html: content,
      }}
    ></div>
  );
};

export default SanitizedContent;
