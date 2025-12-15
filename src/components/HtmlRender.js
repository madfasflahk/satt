"use client";

import DOMPurify from "dompurify";

const HtmlRender = ({ data }) => {
  return (
    <div
      className="prose max-w-none mx-auto"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data),
      }}
    />
  );
};

export default HtmlRender;
