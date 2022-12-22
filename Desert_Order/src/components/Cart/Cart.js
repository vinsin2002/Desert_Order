import classes from './Cart.module.css';
import Modal from '../UI/Modal.js';
import checkedgif from '../../assets/checked.gif'
import React, { Fragment, useContext, useState } from 'react'
import CartContext from '../Store/card-context';
import Loader from '../Meals/Loader';
import CartItem from './CartItem';
import Checkout from './Checkout';
import axios from "axios";
const Cart = (props) => {
    const [onOrder, setonOrder] = useState(false);
    const [issubmitting, setissubmitting] = useState(false);
    const [didSubmit, setdidSubmit] = useState(false);
    const [orderid,setorderid] = useState(' ');
    const [userinfo,setuserinfo] = useState({});
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
          const onsubmithandler =async (userdata)=>
          {
            setuserinfo(userdata);
            setissubmitting(true);
            console.log(userdata);
            const response = await axios.post('https://desert-order-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
              UserData: userdata,
              OrderedItems: cartctx.items
            })
            console.log(response);
            setorderid(response.data.name);
            setissubmitting(false);
            setdidSubmit(true);
            cartctx.clearCart();
          }
          const cartModalContent = <Fragment>
            {CartItems}
        <div className={classes.total} >
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {onOrder && <Checkout onCancel={props.closemodal} onConfirm={onsubmithandler} />}
        {!onOrder && <div className={classes.actions} >
            <button className={classes['button--alt']} onClick={props.closemodal} >Close</button>
            {hasitems && <button className={classes.button} onClick={onorder}>Order</button>}
        </div>}
          </Fragment>
          const issubmittingmodal = <center><Loader/></center>
          const didSubmitmodal = <Fragment>
            <center>
            <h2>Thank You!</h2>
            <h3>For shopping with us</h3>
            <img src={checkedgif} alt="checked" />
            <h2>Order Placed </h2>
            <h2>Amount paid : {totalAmount}</h2>
            <p>Order ID: {orderid}</p>
            <p>Name: {userinfo.name}</p>
            <p>Street: {userinfo.street}</p>
            <p>City: {userinfo.city}</p>
            <p>Pincode: {userinfo.postal}</p>
            <div className={classes.actions} >
            <button className={classes.button} onClick={props.closemodal} >Close</button>
            </div>
            </center>
          </Fragment>
  return (
    <Modal closemodal={props.closemodal}>
        {!issubmitting && !didSubmit && cartModalContent}
        {issubmitting && issubmittingmodal}
        {!issubmitting && didSubmit && didSubmitmodal}
    </Modal>
  )
}

export default Cart