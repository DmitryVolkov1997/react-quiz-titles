import axios from "axios";

export default axios.create({
    baseURL: "https://react-quiz-8baed-default-rtdb.firebaseio.com/"
});