import { Route, Routes } from "react-router-dom";
import GroupsPage from "../GroupsPage/GroupsPage";
import SignInPage from "../SignInPage/SignInPage";

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
