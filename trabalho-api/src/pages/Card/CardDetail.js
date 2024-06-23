import axios from "axios";
import { useState, useEffect, CSSProperties } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ClipLoader from "react-spinners/ClipLoader";
import './CardDetail.css';

const CardDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#111");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
                setCharacter(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCharacter();
    }, [id]);

    const backList = () => {
        navigate('/list');
    }

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
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
        <div className="characterDetailPage">
            <Header title={character.name} />
            <div className="characterDetailContainer">
                <img src={character.image} alt={character.name} className="characterImage" />
                <div className="characterDetailInfo">
                    <p><strong>Name:</strong> {character.name}</p>
                    <p><strong>Status:</strong> {character.status}</p>
                    <p><strong>Species:</strong> {character.species}</p>
                    <p><strong>Gender:</strong> {character.gender}</p>
                    <p><strong>Origin:</strong> {character.origin.name}</p>
                </div>
                <button onClick={backList}>Return to List</button>
            </div>
        </div>
    );
};

export default CardDetail;
