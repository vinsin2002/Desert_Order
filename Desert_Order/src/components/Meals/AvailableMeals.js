import React,{ useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Loader from "./Loader";
import Card from "../UI/Card";
import axios from "axios";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Gulab jamun",
//     description: "Sweet, indulgent treat",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Crème brûlée",
//     description: "A French specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Trifle",
//     description: "Luscious, layered dessert",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Pavlova",
//     description: "Crisp, creamy delights",
//     price: 18.99,
//   },
// ];
const AvailableMeals = () => {
  let DUMMY_MEAL = [];
const [DUMMY_MEALS, setdummymeal] = useState([]);
const [loading, setloading] = useState(false);
async function getdesertfromdb() {
  setloading(true);
   const response = await axios.get("https://desert-order-default-rtdb.asia-southeast1.firebasedatabase.app/deserts.json");
      const data = await response.data;
      for (const key in data) {
        // console.log(key);
        for (let i in data[key]) {
          console.log(data[key][i].describe)
          DUMMY_MEAL.push(data[key][i]);
        }
      }
      console.log(DUMMY_MEAL);
      setdummymeal(DUMMY_MEAL);
      setloading(false);
}
useEffect(() => {
  getdesertfromdb();
}, []);
  const Mealslist = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {!loading && <ul>{Mealslist}</ul>}
        {loading && <center><Loader/></center>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
