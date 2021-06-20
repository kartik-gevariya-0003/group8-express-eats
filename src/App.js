import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import * as PropTypes from "prop-types";
import Header from "./components/Header";
import ManufacturingOrders from "./components/ManufacturingOrders";
import CreateManufacturingOrder from "./components/CreateManufacturingOrder";
import PurchaseOrders from "./components/purchase-order/PurchaseOrders";
import CreatePurchaseOrder from "./components/purchase-order/CreatePurchaseOrder";
import Confirmation from "./components/Confirmation/Confirmation";
import Vendor from "./components/vendor/Vendor";
import CreateVendor from "./components/vendor/CreateVendor";

Route.propTypes = {
  component: PropTypes.any,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/vendors" component={Vendor} />
        <Route exact path="/vendors/create" component={CreateVendor} />
        <Route
          exact
          path="/manufacturing-orders"
          component={ManufacturingOrders}
        />
        <Route
          exact
          path="/manufacturing-order/create"
          component={CreateManufacturingOrder}
        />
        <Route exact path="/purchase-orders" component={PurchaseOrders} />
        <Route
          exact
          path="/purchase-order/create"
          component={CreatePurchaseOrder}
        />
        <Route
          exact
          path="/purchase-order/confirmation"
          component={Confirmation}
        />
        <Route exact path="/vendor/confirmation" component={Confirmation} />
        <Redirect exact from="/" to="manufacturing-orders" />
      </Switch>
    </div>
  );
}

export default App;
