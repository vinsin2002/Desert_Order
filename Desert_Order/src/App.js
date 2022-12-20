import React,{ useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/Store/CartProvider";
function App() {
  const [showmodal,setshowmodal] = useState(false);
  const showmodalhandler =()=>
  {
    setshowmodal(true);
  }
  const disableshowhandler =()=>
  {
    setshowmodal(false);
  }
  return (
    <CartProvider>
      {showmodal && <Cart closemodal={disableshowhandler} />}
      <Header modal={showmodalhandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
