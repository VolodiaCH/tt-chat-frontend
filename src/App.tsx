import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";

const App = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </SocketProvider>
  );
};

export default App;
