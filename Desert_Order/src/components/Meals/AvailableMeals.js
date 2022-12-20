import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Gulab jamun',
      description: 'Sweet, indulgent treat',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Crème brûlée',
      description: 'A French specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Trifle',
      description: 'Luscious, layered dessert',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Pavlova',
      description: 'Crisp, creamy delights',
      price: 18.99,
    },
  ];

const AvailableMeals =()=>
{
    const Mealslist = DUMMY_MEALS.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
    return (
      <section className={classes.meals}>
        <Card>
          <ul>
            {Mealslist}
          </ul>
        </Card>
      </section>
    );
}

export default AvailableMeals;