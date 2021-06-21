import "./App.css";
import { Route, Switch } from "react-router-dom";
import * as PropTypes from "prop-types";
import ManufacturingOrders from "./components/manufacturing-order/ManufacturingOrders";
import CreateManufacturingOrder from "./components/manufacturing-order/CreateManufacturingOrder";
import PurchaseOrders from "./components/purchase-order/PurchaseOrders";
import CreatePurchaseOrder from "./components/purchase-order/CreatePurchaseOrder";
import Confirmation from "./components/confirmation/Confirmation";
import Vendor from "./components/vendor/Vendor";
import CreateVendor from "./components/vendor/CreateVendor";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Main from "./components/main/Main";
import Login from "./components/login/Login";
import Inventory from "./components/inventory/Inventory";
import AddRawMaterialInventory from "./components/inventory/AddRawMaterialInventory";
import AddFoodItemInventory from "./components/inventory/AddFoodItemlInventory";

Route.propTypes = {
    component: PropTypes.any,
    path: PropTypes.string,
    exact: PropTypes.bool
};

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
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
        <Route exact path="/inventory/confirmation" component={Confirmation} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Main} />
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
          <Route exact path="/vendors" component={Vendor} />
          <Route exact path="/vendors/create" component={CreateVendor} />
          <Route exact path="/vendor/confirmation" component={Confirmation} />

      </Switch>
    </div>
  );
}

export default App;
