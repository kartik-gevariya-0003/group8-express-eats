import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import * as PropTypes from "prop-types";
import ManufacturingOrders from "./components/ManufacturingOrders";
import CreateManufacturingOrder from "./components/CreateManufacturingOrder";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import AddRawMaterialInventory from "./components/AddRawMaterialInventory";
import AddFoodItemInventory from "./components/AddFoodItemlInventory";

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
        <Redirect exact from="/" to="manufacturing-orders" />
        <Route
          exact
          path="/manufacturing-order/create"
          component={CreateManufacturingOrder}
        />
        <Route exact path="/inventory" component={Inventory} />
        <Route
          exact
          path="/inventory/add-raw-material-inventory"
          component={AddRawMaterialInventory}
        />
        <Route
          exact
          path="/inventory/add-food-item-inventory"
          component={AddFoodItemInventory}
        />
      </Switch>
    </div>
  );
}

export default App;
