/* General API Constants */
const API_URL = process.env.REACT_APP_CONTAINER_1_URL || 'http://localhost:3001';

/* Custom Endpoint Constants */
const GET_MANUFACTURING_ORDERS = API_URL + "/get-manufacturing-orders";
const POST_CREATE_MANUFACTURING_ORDER = API_URL + '/create-manufacturing-order';
const PUT_CHANGE_MANUFACTURING_ORDER_STATUS = API_URL + '/change-manufacturing-order-status';
const DELETE_MANUFACTURING_ORDER = API_URL + '/delete-manufacturing-order';

module.exports = {API_URL, GET_MANUFACTURING_ORDERS, POST_CREATE_MANUFACTURING_ORDER,
  PUT_CHANGE_MANUFACTURING_ORDER_STATUS, DELETE_MANUFACTURING_ORDER}