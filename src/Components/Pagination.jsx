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
      <button disabled={currentPage === 1} onClick={handlePrev}>
        Prev
      </button>
      <div className="pagination-num">
        {[...Array(numOfPages).keys()].map((num) => (
          <button
            style={{
              backgroundColor: currentPage === num + 1 ? 'green' : 'grey',
            }}
            onClick={() => handleButton(num + 1)}
          >
            {num + 1}
          </button>
        ))}
      </div>
      <button disabled={currentPage === numOfPages} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
