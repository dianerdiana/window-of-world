import { Route, Routes } from "react-router-dom"

import Index from "./pages/Index";
import Home from "./pages/Home";
import DetailBook from "./pages/DetailBook";
import Subscribe from "./pages/Subscribe";
import Profile from "./pages/Profile";
import ListTransaction from "./pages/ListTransactions";
import AddBook from "./pages/AddBook";

function App() {
  return (
    <Routes>
      <Route exact path="/" element= { <Index /> } />
      <Route exact path="/home" element= { <Home /> } />
      <Route exact path="/detail-book/:id" element= { <DetailBook /> } />
      <Route exact path="/subscribe" element= { <Subscribe /> } />
      <Route exact path="/profile" element= { <Profile /> } />
      <Route exact path="/list-transactions" element= { <ListTransaction /> } />
      <Route exact path="/add-book" element= { <AddBook /> } />
    </Routes>
  );
}

export default App;
