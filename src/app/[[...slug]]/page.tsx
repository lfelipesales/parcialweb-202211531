"use client";

import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import ActorsList from "../components/ActorsList";
import CreateMovie from "../components/CreateMovie";

type Actor = {
  id: string;
  name: string;
  photo: string;
  nationality: string;
  birthDate: string;
  biography: string;
};

function Home() {
  return (
    <main>
      <h1>Arte7</h1>
      <p>Bienvenido a la plataforma.</p>
    </main>
  );
}

function CreateActor({
  onCreate,
}: {
  onCreate: (actor: Actor) => void;
}) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [biography, setBiography] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newActor: Actor = {
      id: crypto.randomUUID(),
      name,
      photo,
      nationality,
      birthDate,
      biography,
    };

    onCreate(newActor);
    navigate("/actors");
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Crear Actor</h1>

        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Photo</label>
          <input
            type="text"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Nacionalidad</label>
          <input
            type="text"
            value={nationality}
            onChange={(event) => setNationality(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Biografía</label>
          <textarea
            value={biography}
            onChange={(event) => setBiography(event.target.value)}
            required
          />
        </div>

        <button type="submit">Crear actor</button>
      </form>
    </main>
  );
}

function EditActor({
  actors,
  onEdit,
}: {
  actors: Actor[];
  onEdit: (actor: Actor) => void;
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const actor = actors.find((item) => item.id === id);

  const [name, setName] = useState(actor?.name || "");
  const [photo, setPhoto] = useState(actor?.photo || "");
  const [nationality, setNationality] = useState(actor?.nationality || "");
  const [birthDate, setBirthDate] = useState(actor?.birthDate || "");
  const [biography, setBiography] = useState(actor?.biography || "");

  if (!actor) {
    return (
      <main>
        <h1>Actor no encontrado</h1>
        <Link to="/actors">Volver a actores</Link>
      </main>
    );
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedActor: Actor = {
      ...actor,
      name,
      photo,
      nationality,
      birthDate,
      biography,
    };

    onEdit(updatedActor);
    navigate("/actors");
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>Editar Actor</h1>

        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Photo</label>
          <input
            type="text"
            value={photo}
            onChange={(event) => setPhoto(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Nacionalidad</label>
          <input
            type="text"
            value={nationality}
            onChange={(event) => setNationality(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Fecha de nacimiento</label>
          <input
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Biografía</label>
          <textarea
            value={biography}
            onChange={(event) => setBiography(event.target.value)}
            required
          />
        </div>

        <button type="submit">Guardar cambios</button>
      </form>
    </main>
  );
}

export default function App() {
  const [isClient, setIsClient] = useState(false);
  const [actors, setActors] = useState<Actor[]>([]);

  useEffect(() => {
    setIsClient(true);

    fetch("http://localhost:3000/api/v1/actors")
      .then((response) => response.json())
      .then((data) => setActors(data))
      .catch((error) => console.error("Error loading actors:", error));
  }, []);

  if (!isClient) {
    return null;
  }

  const createActor = (actor: Actor) => {
    setActors((currentActors) => [...currentActors, actor]);
  };

  const editActor = (updatedActor: Actor) => {
    setActors((currentActors) =>
      currentActors.map((actor) =>
        actor.id === updatedActor.id ? updatedActor : actor
      )
    );
  };

  const deleteActor = (id: string) => {
    setActors((currentActors) =>
      currentActors.filter((actor) => actor.id !== id)
    );
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>{" "}
        <Link to="/actors">Actores</Link>{" "}
        <Link to="/crear">Crear actor</Link>{" "}
        <Link to="/movies">Películas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<CreateMovie />} />

        <Route
          path="/actors"
          element={
            <ActorsList
              actors={actors}
              onDelete={deleteActor}
            />
          }
        />

        <Route
          path="/crear"
          element={<CreateActor onCreate={createActor} />}
        />

        <Route
          path="/actors/:id/edit"
          element={
            <EditActor
              actors={actors}
              onEdit={editActor}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}