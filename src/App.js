import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import GroupsPage from "./GroupsPage";

export default function App() {
  return (
    <div className="App container-lg">
      <Routes>
        <Route path="/">
          <Route index element={<SignInPage />} />
          <Route path="groups" element={<GroupsPage />} />
        </Route>
      </Routes>
    </div>
  );
}
