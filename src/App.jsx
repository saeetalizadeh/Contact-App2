import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";
import PageNotFound from "./pages/404";
import ContactsContext from "./context/ContactsContext";
function App() {
  return (
    <ContactsContext>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </ContactsContext>
  );
}

export default App;
