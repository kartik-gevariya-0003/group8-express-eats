/**
 * Author: Karishma Suresh Lalwani
 * Author: Kartik Gevariya
 * Author: Mansi Gevariya
 * Author: Rotesh Chhabra
 * Author: Tasneem Yusuf Porbanderwala
 */
import "./App.css";
import {Route, Switch} from "react-router-dom";
import * as PropTypes from "prop-types";
import FoodItems from "./components/food-item/FoodItems";
import AddFoodItem from "./components/food-item/AddFoodItem";
import ManufacturingOrders from "./components/manufacturing-order/ManufacturingOrders";
import CreateManufacturingOrder from "./components/manufacturing-order/CreateManufacturingOrder";
import PurchaseOrders from "./components/purchase-order/PurchaseOrders";
import CreatePurchaseOrder from "./components/purchase-order/CreatePurchaseOrder";
import Confirmation from "./components/confirmation/Confirmation";
import Vendor from "./components/vendor/Vendor";
import CreateVendor from "./components/vendor/CreateVendor";
import EditVendor from "./components/vendor/EditVendor";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Main from "./components/main/Main";
import Login from "./components/login/Login";
import Inventory from "./components/inventory/Inventory";
import EditFoodItem from "./components/food-item/EditFoodItem";
import RawMaterials from "./components/raw-material/RawMaterials";
import AddRawMaterial from "./components/raw-material/AddRawMaterial";
import UpdateRawMaterial from "./components/raw-material/UpdateRawMaterial";
import Profile from "./components/profile/Profile";
import Register from "./components/register/Register";
import React from "react";
import Footer from "./components/footer/Footer";

Route.propTypes = {
  component: PropTypes.any,
  path: PropTypes.string,
  exact: PropTypes.bool,
};

function App() {
  return (
    <section className="App">
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/manufacturing-orders" component={ManufacturingOrders}/>
        <Route exact path="/manufacturing-order/create" component={CreateManufacturingOrder}/>
        <Route exact path="/purchase-orders" component={PurchaseOrders}/>
        <Route exact path="/purchase-order/create" component={CreatePurchaseOrder}/>
        <Route exact path="/purchase-order/confirmation" component={Confirmation}/>
        <Route exact path="/food-item/confirmation" component={Confirmation}/>
        <Route exact path="/food-items" component={FoodItems}/>
        <Route exact path="/food-items/create" component={AddFoodItem}/>
        <Route exact path="/inventory/confirmation" component={Confirmation}/>
        <Route exact path="/inventory" component={Inventory}/>
        <Route exact path="/edit-food-item" component={EditFoodItem}/>
        <Route exact path="/vendors" component={Vendor}/>
        <Route exact path="/vendors/create" component={CreateVendor}/>
        <Route exact path="/vendor/confirmation" component={Confirmation}/>
        <Route exact path="/vendor/edit" component={EditVendor}/>
        <Route exact path="/raw-materials" component={RawMaterials}/>
        <Route exact path="/raw-material/add" component={AddRawMaterial}/>
        <Route exact path="/raw-material/update" component={UpdateRawMaterial}/>
        <Route exact path="/raw-material/confirmation" component={Confirmation}/>
        <Route exact path="/profile" component={Profile}/>
      </Switch>
      <Footer/>
    </section>
  );
}

export default App;
