import React from 'react';

const Pagination = ({ className, currentPage, maxPage, pageHandler }) => {
    return (
        <div className={`${className} pagination`}>
            {
                currentPage !== 1 &&
                <span
                    className="pagination__first"
                    onClick={() => pageHandler(1)}
                >
                    Первая страница
                </span>
            }
            {
                currentPage > 1 &&
                <span
                    className="pagination__prev"
                    onClick={() => pageHandler(currentPage - 1)}
                >
                    Назад
                </span>
            }

            {
                currentPage < maxPage &&
                <span
                    className="pagination__next"
                    onClick={() => pageHandler(currentPage + 1)}
                >
                    Вперед
                </span>
            }
            {
                currentPage !== maxPage &&
                <span
                    className="pagination__first"
                    onClick={() => pageHandler(maxPage)}
                >
                    Последняя страница
                </span>
            }
        </div>
    );
};

export default Pagination;