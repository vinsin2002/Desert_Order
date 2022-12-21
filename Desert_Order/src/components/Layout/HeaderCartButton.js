import React,{ useContext, useEffect, useState } from "react";
// import { useMediaQuery } from 'react-responsive';
import CartIcon from '../Cart/CartIcon';
import CartContext from "../Store/card-context";
import classes from './HeaderCartButton.module.css';
const HeaderCartButton =(props)=>
{
    // const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    // console.log(isMobile);
    const [btnishighlighted, setbtnishighlighted] = useState(false);
    const cartctx = useContext(CartContext);
    const { items } = cartctx;
    const numberofcartitems = cartctx.items.reduce((cur,item)=>{
        return cur + item.amount;
    },0);
    const btnClasses = `${classes.button} ${btnishighlighted ? classes.bump: ''}`;
    useEffect(() => {
        if(cartctx.items.length === 0)
        {
            return;
        }
        setbtnishighlighted(true);
        const timer = setTimeout(()=> {
            setbtnishighlighted(false);
        },300);

        return () =>
        {
            clearTimeout(timer);
        };
    }, [items,cartctx.items.length]);
    return(
        <button className={btnClasses} onClick={props.modal}>
            <span className={classes.icon} > 
                <CartIcon/>
            </span>
            {/* {!isMobile && <span >Your Cart</span>} */}
            <span >Your Cart</span>
            <span className={classes.badge}>{numberofcartitems}</span>
        </button>
    );
};

export default HeaderCartButton;