"use client";

import { Link } from "react-router-dom";

type Actor = {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
};

type ActorsListProps = {
  actors: Actor[];
  onDelete: (id: string) => void;
};

export default function ActorsList({
  actors,
  onDelete,
}: ActorsListProps) {
  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "¿Está seguro de que desea eliminar este actor?"
    );

    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <main className="actors-page">
      <div className="actors-header">
        <div>
          <h1>Actores</h1>
          <p>Consulta y administra los actores de la plataforma.</p>
        </div>

        <Link to="/crear" className="create-button">
          + Crear Actor
        </Link>
      </div>

      <div className="actors-grid">
        {actors.map((actor) => (
          <div className="actor-card" key={actor.id}>
            <img
              src={actor.photo}
              alt={actor.name}
              className="actor-image"
            />

            <div className="actor-content">
              <h2>{actor.name}</h2>

              <div className="actor-info">
                <p>
                  <strong>Nacionalidad</strong>
                  <span>{actor.nationality}</span>
                </p>

                <p>
                  <strong>Fecha de nacimiento</strong>
                  <span>{actor.birthDate}</span>
                </p>
              </div>

              <p className="actor-biography">
                {actor.biography}
              </p>

              <div className="actor-actions">
                <Link
                  to={`/actors/${actor.id}/edit`}
                  className="edit-button"
                >
                  Editar Actor
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(actor.id)}
                  className="delete-button"
                >
                  Eliminar Actor
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
