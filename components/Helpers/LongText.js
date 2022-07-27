import React, { useState } from 'react';

/**
 * returns jsx that hides the long names of stores in card.js
 *
 * @param  {string} content - store name
 * @param  {int} limit how many characters to show
 * @returns {JSX} store name
 */
export const LongText = ({ content, limit }) => {
  const [showAll, setShowAll] = useState(false);

  const showLess = () => setShowAll(false);

  if (content.length <= limit) {
    // there is nothing more to show
    return <div>{content}</div>;
  }
  if (showAll) {
    // We show the extended text and a link to reduce it
    return (
      <div>
        {content}
        <button onClick={showLess}>Read less</button>
      </div>
    );
  }
  // In the final case, we show a text with ellipsis and a `Read more` button
  const toShow = content.substring(0, limit) + '...';

  return <div>{toShow}</div>;
};
