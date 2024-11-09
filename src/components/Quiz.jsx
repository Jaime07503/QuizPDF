import { useState } from "react";
import { Questions } from "./Questions.jsx";
import { Difficult } from "./Difficult.jsx";
import DeleteFileIcon from "../assets/DeleteFileIcon.jsx";
import CreateQuizIcon from "../assets/CreateQuizIcon.jsx";
import UploadFileIcon from "../assets/UploadFileIcon.jsx";

export const Quiz = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

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
    setError(null); // Reiniciar el error al enviar un nuevo archivo

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        // "https://quiz-pdf-back-end.vercel.app/upload",
        "http://localhost:5000/upload",
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
      setError(err.message); // Guardar el mensaje de error
    } finally {
      setLoading(false); // Asegurarse de que el loading se detenga
    }
  };

  const [value, setValue] = useState(null);
  const items = [
    { value: "facil", label: "Fácil" },
    { value: "intermedio", label: "Intermedio" },
    { value: "dificil", label: "Difícil" },
  ];

  return (
    <main className="max-w-7xl mx-auto">
      <section className="flex flex-col gap-6 items-center w-full">
        <input
          id="file__input"
          className="hidden"
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
        />
        <label
          htmlFor="file__input"
          className="flex flex-col justify-center items-center w-full h-60 border-[2px] border-dashed border-[#d75a5aaa] rounded-lg cursor-pointer shadow-lg hover:bg-[#d75a5a55] hover:border-[#e3b4b455] transition-colors duration-500"
        >
          <UploadFileIcon />
          <span className="text-lg font-bold text-[#D75A5A]">
            {file ? file.name : "Explorar archivos para cargar"}
          </span>
        </label>
        {file && (
          <div className="w-full flex gap-6">
            <button
              className="w-full text-lg text-[#D75A5A] font-bold shadow-lg p-2 flex items-center justify-center border-2 border-[#d75a5aaa] gap-2 hover:bg-[#d75a5a55] transition-colors duration-500 rounded-lg"
              onClick={handleRemoveFile}
            >
              Eliminar Archivo
              <DeleteFileIcon />
            </button>
            {/* <Difficult
              name="dificultad"
              items={items}
              value={value}
              onChange={setValue}
            /> */}
            <button
              className="w-full text-lg text-[#615858] font-bold shadow-lg p-2 flex items-center justify-center border-2 border-[#615858] gap-2 hover:bg-[#1A1A1A33] transition-colors duration-500 rounded-lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Generar Quiz"}
              <CreateQuizIcon />
            </button>
          </div>
        )}
      </section>
      {error && <p className="mt-6 text-red-500 font-semibold text-xl">{error}</p>}{" "}
      {/* Mensaje de error */}
      {result && <Questions result={result} />}
    </main>
  );
};

export default Quiz;
