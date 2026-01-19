import { RouterProvider } from "react-router";
import AppProvider from "./provider";
import router from "./router";
import { Toaster } from "sonner";

function App() {
  return (
    <AppProvider>
      <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
