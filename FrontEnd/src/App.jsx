import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
//import { listScores } from "../api/scoreService";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
