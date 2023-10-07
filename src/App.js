import { Provider } from "react-redux";
import { Store } from "./Task_component/Redux/Store";
import { Home } from "./Task_component/Home";
import { Router } from "./Task_component/Router/Router";

function App() {
  return (
    <div className="App">
       <Provider store={Store}>
          <Router/>
       </Provider>
    </div>
  );
}

export default App;
