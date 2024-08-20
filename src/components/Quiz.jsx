import { useState } from "react";
import { Questions } from "./Questions.jsx";
import DeleteIcon from "../assets/delete.jsx";
import CreateQuizIcon from "../assets/create.jsx";
import UploadFileIcon from "../assets/upload.jsx";
import "../App.css";

export const Quiz = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
    document.getElementById("file__input").value = "";
  };

  const handleSubmit = async () => {
    if (!file) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al procesar el archivo.");
      }

      const data = await response.json();
      setResult(data);
    } catch {
      setLoading(false);
    }
  };

  return (
    <main className="main__container">
      <section className="file__container">
        <input
          id="file__input"
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
        <label htmlFor="file__input" className="file__input--upload">
          <div className="upload__icon">
            <UploadFileIcon />
          </div>
          <span className="file__name">
            {file ? file.name : "Explorar archivos para cargar"}
          </span>
        </label>
        {file && (
          <>
            <button id="remove__file" onClick={handleRemoveFile}>
              Eliminar archivo
              <DeleteIcon />
            </button>
            <button
              className="input__button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Generar Quiz"}
              <CreateQuizIcon />
            </button>
          </>
        )}
      </section>
      {result && <Questions result={result} />}
    </main>
  );
};

export default Quiz;
