/* General API Constants */
const API_URL =
  process.env.REACT_APP_CONTAINER_1_URL || "http://localhost:3001";

/* Custom Endpoint Constants */
const GET_MANUFACTURING_ORDERS = API_URL + "/get-manufacturing-orders";
const POST_CREATE_MANUFACTURING_ORDER = API_URL + "/create-manufacturing-order";
const PUT_CHANGE_MANUFACTURING_ORDER_STATUS =
  API_URL + "/change-manufacturing-order-status";
const DELETE_MANUFACTURING_ORDER = API_URL + "/delete-manufacturing-order";

const GET_FOOD_ITEMS = API_URL + "/get-food-items";
const POST_CREATE_FOOD_ITEM = API_URL + "/add-food-item";
const PUT_UPDATE_FOOD_ITEM = API_URL + "/update-food-item";
const PUT_UPDATE_FOOD_ITEM_WITH_IMAGE =
  API_URL + "/update-food-item-with-image";
const DELETE_FOOD_ITEM = API_URL + "/delete-food-item";

const POST_ADD_RAW_MATERIAL_INVENTORY = API_URL + "/add-raw-material-inventory";
const POST_ADD_FOOD_ITEM_INVENTORY = API_URL + "/add-food-item-inventory";
const GET_ALL_INVENTORY = API_URL + "/get-all-inventory-items";
module.exports = {
  API_URL,
  GET_MANUFACTURING_ORDERS,
  POST_CREATE_MANUFACTURING_ORDER,
  PUT_CHANGE_MANUFACTURING_ORDER_STATUS,
  DELETE_MANUFACTURING_ORDER,
  GET_FOOD_ITEMS,
  POST_CREATE_FOOD_ITEM,
  PUT_UPDATE_FOOD_ITEM_WITH_IMAGE,
  PUT_UPDATE_FOOD_ITEM,
  DELETE_FOOD_ITEM,
  POST_ADD_RAW_MATERIAL_INVENTORY,
  POST_ADD_FOOD_ITEM_INVENTORY,
  GET_ALL_INVENTORY,
};
