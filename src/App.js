import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import CartPage from "./component/CartPage/CartPage";
import { cartReducer } from "./redux/reducers/cartReducer";
import { productReducer } from "./redux/reducers/productReducer";
import UploadFiled from "./component/UploadFiled/UploadFiled";

// Redux setup
const rootReducer = combineReducers({
  cart: cartReducer,
  store: productReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// App component
function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <UploadFiled />
      </Provider>
    </StrictMode>
  );
}

export default App;
