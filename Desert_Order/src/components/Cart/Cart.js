import classes from './Cart.module.css';
import Modal from '../UI/Modal.js';
import React, { useContext, useState } from 'react'
import CartContext from '../Store/card-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import axios from "axios";
const Cart = (props) => {
    const [onOrder, setonOrder] = useState(false);
    const cartctx = useContext(CartContext);
    const totalAmount = `$${cartctx.totalAmount.toFixed(2)}`;
    const hasitems = cartctx.items.length > 0;
    const cartItemRemoveHandler = (item) => {
      cartctx.removeItem({...item,amount:1});
    };

  const cartItemAddHandler = (item) => {
    cartctx.addItem({...item,amount:1});
  };
    const CartItems = <ul className={classes['cart-items']} >{cartctx.items.map((item) => <CartItem
    key={item.id} name={item.name} amount={item.amount} price={item.price} 
    onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)} ></CartItem>)}</ul>;
          const onorder =()=>
          {
              setonOrder(true);
          }
          const onsubmithandler =(userdata)=>
          {
            console.log(userdata);
            axios.post('https://desert-order-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
              UserData: userdata,
              OrderedItems: cartctx.items
            })
          }
  return (
    <Modal closemodal={props.closemodal}>
        {CartItems}
        <div className={classes.total} >
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {onOrder && <Checkout onCancel={props.closemodal} onConfirm={onsubmithandler} />}
        {!onOrder && <div className={classes.actions} >
            <button className={classes['button--alt']} onClick={props.closemodal} >Close</button>
            {hasitems && <button className={classes.button} onClick={onorder} >Order</button>}
        </div>}
    </Modal>
  )
}

export default Cart