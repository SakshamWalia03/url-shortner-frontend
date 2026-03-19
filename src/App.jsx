import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import useAuthBootstrap from "./hooks/useAuthBootstrap";

// ── Bootstrap wrapper ─────────────────────────────────────────────────────────
// Runs a silent /refresh call on every page load. This re-hydrates the
// accessToken from the httpOnly cookie so a page refresh doesn't log the user out.
const AppWithBootstrap = () => {
  const { bootstrapping } = useAuthBootstrap();

  // Show a minimal loader while we check the session.
  // Prevents a flash of the login page before the silent refresh completes.
  if (bootstrapping) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020408",
        }}
      >
        <span
          className="spinner spinner--dark"
          style={{ width: 36, height: 36, borderWidth: 4 }}
        />
      </div>
    );
  }

  return <AppRouter />;
};

function App() {
  return (
    <Router>
      <AppWithBootstrap />
    </Router>
  );
}

export default App;
