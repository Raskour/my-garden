import React from 'react';

const Pagination = ({
  handleNext,
  handlePrev,
  handleButton,
  currentPage,
  numOfPages,
}) => {
  return (
    <div className="pagination">
      <button disabled={currentPage === 0} onClick={handlePrev}>
        Prev
      </button>
      <div className="pagination-num">
        {[...Array(numOfPages).keys()].map((num) => (
          <button
            style={{
              backgroundColor: currentPage === num ? 'green' : 'grey',
            }}
            onClick={() => handleButton(num)}
          >
            {num + 1}
          </button>
        ))}
      </div>
      <button disabled={currentPage === numOfPages - 1} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
