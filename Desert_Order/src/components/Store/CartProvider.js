import React, { useReducer } from "react";
import CartContext from "./card-context";
const defaultcartstate = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") 
  {
    // const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.name === action.item.name
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") 
  {
    console.log("yes");
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.name === action.item.name
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount =
    state.totalAmount - existingItem.price;
    let updatedItems;
    if(existingItem.amount === 1)
    {
      updatedItems = state.items.filter(item => item.name !== action.item.name);
    }
    else
    {
      const updatedItem = {...existingItem, amount: existingItem.amount -1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  return defaultcartstate;
};
const CartProvider = (props) => {
  const [cartState, dispatchcartaction] = useReducer(
    cartReducer,
    defaultcartstate
  );
  const addItemToCartHandler = (item) => {
    dispatchcartaction({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (item) => {
    dispatchcartaction({ type: "REMOVE", item: item });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
