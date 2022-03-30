import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import CommonProvider from "./contexts/common";
import ProductsProvider from "./contexts/products";
import CartProvider from "./contexts/cart";
import RouteWrapper from "./layouts/RouteWrapper";
import CommonLayout from "./layouts/CommonLayout";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import "./assets/scss/styles.scss";
import CheckoutProvider from "./contexts/checkout";

function App() {
  return (
    <div className="App">
      <CommonProvider>
        <ProductsProvider>
          <CartProvider>
            <CheckoutProvider>
              <Router>
                <Switch>
                  <RouteWrapper path="/" exact component={Home} layout={CommonLayout} />
                  <RouteWrapper path="/checkout" component={Checkout} layout={CommonLayout} />
                </Switch>
              </Router>
            </CheckoutProvider>
          </CartProvider>
        </ProductsProvider>
      </CommonProvider>
    </div>
  );
}

export default App;
