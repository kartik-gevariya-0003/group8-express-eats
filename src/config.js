/* General API Constants */
const API_URL = process.env.REACT_APP_CONTAINER_1_URL || 'http://localhost:3001';

/* Custom Endpoint Constants */
const GET_MANUFACTURING_ORDERS = API_URL + "/get-manufacturing-orders";
const POST_CREATE_MANUFACTURING_ORDER = API_URL + '/create-manufacturing-order';
const PUT_CHANGE_MANUFACTURING_ORDER_STATUS = API_URL + '/change-manufacturing-order-status';
const DELETE_MANUFACTURING_ORDER = API_URL + '/delete-manufacturing-order';

const POST_ADD_FOOD_ITEM = API_URL + "/add-food-item"
const GET_FOOD_ITEM_NAME = API_URL + "/get-food-item-name/"
const GET_FOOD_ITEM_BY_ID = API_URL + "/get-food-item-by-id/"
const PUT_FOOD_ITEM_WITH_IMAGE = API_URL + "/update-food-item-with-image"
const PUT_FOOD_ITEM = API_URL + "/update-food-item"
const DELETE_FOOD_ITEM = API_URL + "/delete-food-item/"
const GET_FOOD_ITEMS = API_URL + "/get-food-items"

module.exports = {API_URL, GET_MANUFACTURING_ORDERS, POST_CREATE_MANUFACTURING_ORDER,
  PUT_CHANGE_MANUFACTURING_ORDER_STATUS, DELETE_MANUFACTURING_ORDER, POST_ADD_FOOD_ITEM,
  GET_FOOD_ITEM_NAME, GET_FOOD_ITEM_BY_ID, PUT_FOOD_ITEM_WITH_IMAGE, PUT_FOOD_ITEM, DELETE_FOOD_ITEM, GET_FOOD_ITEMS}