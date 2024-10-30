import { Header } from "./components/Header.jsx";
import { Quiz } from "./components/Quiz.jsx";
import { Footer } from "./components/Footer.jsx";

function App() {
  return (
    <>
      <div className="flex-grow p-8">
        <Header></Header>
        <Quiz></Quiz>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
