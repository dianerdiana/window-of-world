import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Index from "./pages/Index";
import Home from "./pages/Home";
import DetailBook from "./pages/DetailBook";
import Subscribe from "./pages/Subscribe";
import Profile from "./pages/Profile";
import ListTransaction from "./pages/ListTransactions";
import AddBook from "./pages/AddBook";
import ReadBook from "./pages/ReadBook";

// Get API config & setAuthToken
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  // let { id } = useParams();
  // id = state.user.id

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  // Redirect Auth here ...
  useEffect(() => {
    // Redirect Auth
    if (state.isLogin == false) {
      navigate("/");
    } else if (state.user.role == "admin") {
      navigate("/list-transactions");
    } else if (state.user.role == "user") {
      navigate("/home");
    }
  }, [state]);

  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Index />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/detail-book/:id" element={<DetailBook />} />
      <Route exact path="/subscribe" element={<Subscribe />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/list-transactions" element={<ListTransaction />} />
      <Route exact path="/add-book" element={<AddBook />} />
      <Route exact path="/read-book/:id" element={<ReadBook />} />
    </Routes>
  );
}

export default App;
