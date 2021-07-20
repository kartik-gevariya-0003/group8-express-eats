/* General API Constants */
const API_URL = process.env.REACT_APP_CONTAINER_1_URL || 'http://localhost:3001';

/* Custom Endpoint Constants */
const LOGIN = API_URL + "/login";
const REGISTER = API_URL + "/register";
const GET_VENDORS = API_URL + "/vendors";
const GET_RAW_MATERIALS = API_URL + "/raw-materials";
const GET_MANUFACTURING_ORDERS = API_URL + "/get-manufacturing-orders";
const POST_CREATE_MANUFACTURING_ORDER = API_URL + '/create-manufacturing-order';
const PUT_CHANGE_MANUFACTURING_ORDER_STATUS = API_URL + '/change-manufacturing-order-status';
const DELETE_MANUFACTURING_ORDER = API_URL + '/delete-manufacturing-order';
const GET_PURCHASE_ORDERS = API_URL + "/purchase-orders"
const CREATE_PURCHASE_ORDER = API_URL + "/purchase-order";
const DELETE_PURCHASE_ORDER = API_URL + "/purchase-order";
const PLACE_PURCHASE_ORDER = API_URL + "/place-purchase-order";
const RECEIVE_PURCHASE_ORDER = API_URL + "/receive-purchase-order";
const ARCHIVE_PURCHASE_ORDER = API_URL + "/archive-purchase-order";

const POST_ADD_FOOD_ITEM = API_URL + "/add-food-item"
const GET_FOOD_ITEM_NAME = API_URL + "/get-food-item-name/"
const GET_FOOD_ITEM_BY_ID = API_URL + "/get-food-item-by-id/"
const PUT_FOOD_ITEM_WITH_IMAGE = API_URL + "/update-food-item-with-image"
const PUT_FOOD_ITEM = API_URL + "/update-food-item"
const DELETE_FOOD_ITEM = API_URL + "/delete-food-item/"
const GET_FOOD_ITEMS = API_URL + "/get-food-items"

module.exports = {
  LOGIN,
  REGISTER,
  GET_VENDORS,
  GET_RAW_MATERIALS,
  GET_PURCHASE_ORDERS, CREATE_PURCHASE_ORDER, DELETE_PURCHASE_ORDER, PLACE_PURCHASE_ORDER, RECEIVE_PURCHASE_ORDER, ARCHIVE_PURCHASE_ORDER,
  API_URL, GET_MANUFACTURING_ORDERS, POST_CREATE_MANUFACTURING_ORDER,
  PUT_CHANGE_MANUFACTURING_ORDER_STATUS, DELETE_MANUFACTURING_ORDER, POST_ADD_FOOD_ITEM,
  GET_FOOD_ITEM_NAME, GET_FOOD_ITEM_BY_ID, PUT_FOOD_ITEM_WITH_IMAGE, PUT_FOOD_ITEM, DELETE_FOOD_ITEM, GET_FOOD_ITEMS
}