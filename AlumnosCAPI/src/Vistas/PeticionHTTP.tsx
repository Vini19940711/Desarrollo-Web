import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentSearchComponent = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);

  // Carga inicial de datos
  useEffect(() => {
    axios
      .get("/api/estudiantes")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  // Manejador de búsqueda
  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm
      .trim()
      .replace(/\s+/g, "")
      .toUpperCase();
    const found = data.find(
      (est) =>
        est.Carnet.replace(/\s+/g, "").toUpperCase() === trimmedSearchTerm
    );
    setSelectedEstudiante(found || null);
  };

  // Limpiar búsqueda y seleccionado
  const handleClear = () => {
    setSearchTerm("");
    setSelectedEstudiante(null);
  };

  return (
    <>
      {/* ////////////////// */}
      <div className="container">
        <form>
          <h1>
            <b>Consulta de Alumnos</b>
          </h1>
          <label>
            Carnet:
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Nombres:
            <input
              type="text"
              value={selectedEstudiante ? selectedEstudiante.Estudiante : ""}
              disabled
            />
          </label>
          <br />
          <br />
          <label>
            Correo:
            <input
              type="text"
              value={selectedEstudiante ? selectedEstudiante.Email : ""}
              disabled
            />
          </label>
          <br />
          <br />
          <label>
            Seccion:
            <input
              type="text"
              value={selectedEstudiante ? selectedEstudiante.Seccion : ""}
              disabled
            />
          </label>

          <div className="button-group">
            <button type="button" onClick={handleSearch}>
              Buscar
            </button>
            <button type="button" onClick={handleClear}>
              Limpiar
            </button>
            <button type="button" onClick={() => window.location.reload()}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentSearchComponent;
