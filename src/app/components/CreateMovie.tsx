"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api/v1";

export default function CreateMovie() {
  const navigate = useNavigate();

  // Película
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [duration, setDuration] = useState("");
  const [country, setCountry] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [popularity, setPopularity] = useState("");

  // Actor
  const [actorName, setActorName] = useState("");
  const [actorPhoto, setActorPhoto] = useState("");
  const [actorNationality, setActorNationality] = useState("");
  const [actorBirthDate, setActorBirthDate] = useState("");
  const [actorBiography, setActorBiography] = useState("");

  // Premio
  const [prizeName, setPrizeName] = useState("");
  const [prizeCategory, setPrizeCategory] = useState("");
  const [prizeYear, setPrizeYear] = useState("");
  const [prizeStatus, setPrizeStatus] = useState("won");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      // 1. Crear película
      const movieResponse = await fetch(`${API_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          poster,
          duration: Number(duration),
          country,
          releaseDate,
          popularity: Number(popularity),
        }),
      });

      if (!movieResponse.ok) {
        throw new Error("No se pudo crear la película");
      }

      const movie = await movieResponse.json();

      // 2. Crear actor
      const actorResponse = await fetch(`${API_URL}/actors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: actorName,
          photo: actorPhoto,
          nationality: actorNationality,
          birthDate: actorBirthDate,
          biography: actorBiography,
        }),
      });

      if (!actorResponse.ok) {
        throw new Error("No se pudo crear el actor");
      }

      const actor = await actorResponse.json();

      // 3. Asignar actor a película
      const actorMovieResponse = await fetch(
        `${API_URL}/movies/${movie.id}/actors/${actor.id}`,
        {
          method: "POST",
        }
      );

      if (!actorMovieResponse.ok) {
        throw new Error("No se pudo asignar el actor a la película");
      }

      // 4. Crear premio
      const prizeResponse = await fetch(`${API_URL}/prizes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: prizeName,
          category: prizeCategory,
          year: Number(prizeYear),
          status: prizeStatus,
        }),
      });

      if (!prizeResponse.ok) {
        throw new Error("No se pudo crear el premio");
      }

      const prize = await prizeResponse.json();

      // 5. Asignar premio a película
      const moviePrizeResponse = await fetch(
        `${API_URL}/movies/${movie.id}/prizes/${prize.id}`,
        {
          method: "POST",
        }
      );

      if (!moviePrizeResponse.ok) {
        throw new Error("No se pudo asignar el premio a la película");
      }

      alert("Película creada correctamente");

      navigate("/movies");
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al crear la película"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="movie-form-page">
      <div className="movie-form-header">
        <h1>Crear Película</h1>
        <p>
          Registra una película, su actor principal y un premio.
        </p>
      </div>

      <form className="movie-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>Información de la película</h2>

          <div className="form-grid">
            <div className="form-field">
              <label>Título</label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Poster</label>
              <input
                type="url"
                value={poster}
                onChange={(event) => setPoster(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Duración (minutos)</label>
              <input
                type="number"
                min="1"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>País</label>
              <input
                type="text"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Fecha de lanzamiento</label>
              <input
                type="date"
                value={releaseDate}
                onChange={(event) => setReleaseDate(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Popularidad</label>
              <input
                type="number"
                step="0.1"
                value={popularity}
                onChange={(event) => setPopularity(event.target.value)}
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Actor principal</h2>

          <div className="form-grid">
            <div className="form-field">
              <label>Nombre</label>
              <input
                type="text"
                value={actorName}
                onChange={(event) => setActorName(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Photo</label>
              <input
                type="url"
                value={actorPhoto}
                onChange={(event) => setActorPhoto(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Nacionalidad</label>
              <input
                type="text"
                value={actorNationality}
                onChange={(event) =>
                  setActorNationality(event.target.value)
                }
                required
              />
            </div>

            <div className="form-field">
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                value={actorBirthDate}
                onChange={(event) =>
                  setActorBirthDate(event.target.value)
                }
                required
              />
            </div>

            <div className="form-field full-width">
              <label>Biografía</label>
              <textarea
                value={actorBiography}
                onChange={(event) =>
                  setActorBiography(event.target.value)
                }
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>Premio</h2>

          <div className="form-grid">
            <div className="form-field">
              <label>Nombre</label>
              <input
                type="text"
                value={prizeName}
                onChange={(event) => setPrizeName(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Categoría</label>
              <input
                type="text"
                value={prizeCategory}
                onChange={(event) =>
                  setPrizeCategory(event.target.value)
                }
                required
              />
            </div>

            <div className="form-field">
              <label>Año</label>
              <input
                type="number"
                min="1900"
                max="2100"
                value={prizeYear}
                onChange={(event) => setPrizeYear(event.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Estado</label>
              <select
                value={prizeStatus}
                onChange={(event) => setPrizeStatus(event.target.value)}
                required
              >
                <option value="won">Ganado</option>
                <option value="nominated">Nominado</option>
              </select>
            </div>
          </div>
        </section>

        {error && <p className="form-error">{error}</p>}

        <button
          type="submit"
          className="submit-movie-button"
          disabled={loading}
        >
          {loading ? "Creando película..." : "Crear Película"}
        </button>
      </form>
    </main>
  );
}