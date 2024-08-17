import { useState } from "react";
import { Questions } from "./Questions.jsx";
import "../App.css";

export const Quiz = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    document.getElementById("file-input").value = "";
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Por favor, selecciona un archivo PDF.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://back-end-node-psi.vercel.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error al procesar el archivo.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main__container">
      <section className="file__container">
        <input
          id="file-input"
          className="input__file"
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <label htmlFor="file-input" className="file-upload-label">
          <div className="upload-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-cloud-upload"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
              <path d="M9 15l3 -3l3 3" />
              <path d="M12 12l0 9" />
            </svg>
          </div>
          <span className="file__name">
            {file ? file.name : "Explorar archivos para cargar"}
          </span>
        </label>
        {file && (
          <button id="remove-file" onClick={handleRemoveFile}>
            Eliminar archivo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-square-rounded-x"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10l4 4m0 -4l-4 4" />
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
            </svg>
          </button>
        )}
        {file && (
          <button
            className="input__button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Generar Quiz"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-square-rounded-plus"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
              <path d="M15 12h-6" />
              <path d="M12 9v6" />
            </svg>
          </button>
        )}
        {error && <p className="input__error">{error}</p>}
      </section>
      {result && <Questions result={result} />}
    </main>
  );
};

export default Quiz;
