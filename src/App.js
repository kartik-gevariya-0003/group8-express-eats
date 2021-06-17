import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import * as PropTypes from "prop-types";
import ManufacturingOrders from "./components/ManufacturingOrders";
import CreateManufacturingOrder from "./components/CreateManufacturingOrder";
import Header from "./components/Header";
import FoodItems from "./components/FoodItems";
import CreateFoodItem from "./components/CreateFoodItem";
Route.propTypes = {
  component: PropTypes.any,
  path: PropTypes.string,
  exact: PropTypes.bool
};

function App() {
  return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path='/manufacturing-orders' component={ManufacturingOrders}/>
          <Route exact path='/manufacturing-order/create' component={CreateManufacturingOrder}/>
          <Redirect exact from='/' to='manufacturing-orders'/>
          <Route exact path="/food-items" component={FoodItems}/>
          <Route exact path="/food-items/create" component={CreateFoodItem}/>
        </Switch>
      </div>
  );
}

export default App;
