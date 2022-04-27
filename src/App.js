import { Routes, Route, NavLink } from "react-router-dom";
import "./App.module.scss";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./hoc/containers/Quiz/Quiz";
import QuizList from "./hoc/containers/QuizList/QuizList";
import Auth from "./hoc/containers/Auth/Auth";
import QuizCreator from "./hoc/containers/QuizCreator/QuizCreator";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz-creator" element={<QuizCreator />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route index element={<QuizList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
