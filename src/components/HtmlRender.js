'use client';

import parse from 'html-react-parser';

// Only import DOMPurify in the browser
const HtmlRender = ({ data }) => {
  let safeHTML = data;

  if (typeof window !== 'undefined') {
    // Import DOMPurify dynamically in client
    const DOMPurify = require('dompurify')(window);
    safeHTML = DOMPurify.sanitize(data);
  }

  return <div className="prose max-w-none mx-auto">{parse(safeHTML)}</div>;
};

export default HtmlRender;
