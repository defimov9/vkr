import React, { useCallback, useEffect, useState } from "react";
import NoCards from "./NoCards";
import Card from "./Card";
import api from "../utils/api";
import { useLocation } from "react-router-dom";

const Gallery = ({
  onCardClick,
  onCardDelete,
  onCardLike,
  loggedIn,
  setCards,
  cards,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const findUserCards = location.pathname === "/profile/gallery" ? 1 : 0;

  const getCards = useCallback(async () => {
    api
      .getInitialCards(currentPage, findUserCards)
      .then(({ cards, totalPages }) => {
        setCards(cards);
        setTotalPages(totalPages);
      })
      .catch((err) => console.log(err));
  }, [currentPage, findUserCards, setCards]);

  useEffect(() => {
    if (loggedIn) {
      getCards();
    }
  }, [getCards, loggedIn]);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <section className="gallery">
      {cards.length ? (
        <>
          <ul className="gallery__list">
            {cards.slice(0, 9).map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
          </ul>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination__button"
            >
              {"<"}
            </button>

            <div className="pagination__numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={page === currentPage}
                    className="pagination__number"
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination__button"
            >
              {">"}
            </button>
          </div>
        </>
      ) : (
        <NoCards />
      )}
    </section>
  );
};

export default Gallery;
