import Router from "./Router";
import "./App.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastProvider } from "context/ToastContext";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </Provider>
  );
};

export default App;
