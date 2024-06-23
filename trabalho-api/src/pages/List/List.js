import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import 'animate.css/animate.min.css';
import './List.css';
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../../components/Header";

const List = () => {
  const [search, setSearch] = useState("");
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const getCharacters = useCallback(async (page, searchTerm) => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character`, {
        params: {
          page,
          name: searchTerm || undefined
        }
      });
      setCharacters(response.data.results);
      setTotalPages(response.data.info.pages);
      console.log("Characters fetched: ", response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage') || 1;
    setCurrentPage(Number(savedPage));
    getCharacters(Number(savedPage), search);
  }, [search, getCharacters]);

  useEffect(() => {
    getCharacters(currentPage, search);
  }, [currentPage, search, getCharacters]);

  const handleViewDetails = (id) => {
    localStorage.setItem('currentPage', currentPage);
    navigate(`/cards/${id}`);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  }

  const backFirstPage = () => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }

  const toggleSearchVisibility = () => {
    setSearchVisible(!isSearchVisible);
  }

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Filtered characters: ", filteredCharacters);

  const override = {
    display: "flex",
    margin: "0 auto",
    borderColor: "blue",
  };

  if (loading) {
    return (
      <div className="loaderContainer">
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <>
      <ul>
        <Header title={"LIST OF CHARACTERS"} />
        <div className="searchContainer">
          <FaSearch onClick={toggleSearchVisibility} className="searchIcon" />
          {isSearchVisible && (
            <input
              className="searchInput animate__animated animate__fadeIn"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="search"
              placeholder="Search Character"
            />
          )}
        </div>
        {filteredCharacters.length === 0 ? (
          <div className="noResults">
            No characters found with the name "{search}".
          </div>
        ) : (
          filteredCharacters.map((character) => (
            <div className="divCards animate__animated animate__fadeInUp" key={character.id}>
              <img src={character.image} alt={character.name} className="imgList" />
              <div className="pList">
                {character.name}
              </div>
              <button onClick={() => handleViewDetails(character.id)}>
                See Details
              </button>
            </div>
          ))
        )}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Back
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={backFirstPage} disabled={currentPage < 3}>
          Back to First Page
        </button>
      </div>
    </>
  );
}

export default List;
