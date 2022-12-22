import classes from './Checkout.module.css';
import { useFormik} from 'formik';
import { schema } from '../../schemas';
const initialValues = {
  name: "",
  street: "",
  postal: "",
  city: "",
};
const Checkout = (props) => {
  const {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit : (values)=> {
        // console.log(values);
    }
  });
  let n = classes.control;
  let s = classes.control;
  let p = classes.control;
  let c = classes.control;
  // console.log(handleSubmit);
  let cansubmit = true;
  if(touched.name)
  {
    if(errors.name || values.name === "") {n = classes.invalid; cansubmit = false;}
  }
  if(touched.street)
  {
    if(errors.street || values.street === "") {s = classes.invalid; cansubmit= false;}
  } 
  if(errors.postal && touched.postal)
  {
    p = classes.invalid;
    cansubmit = false;
  } 
  if(touched.city)
  {
    if(errors.city || values.city === "") {c = classes.invalid;cansubmit = false;}
  }
  if(values.name === "" || values.city === "" || values.postal === "" || values.street === "")
  {
    cansubmit = false;
  }
  // console.log(cansubmit);
  const sumbithandler =(event)=>
  {
    event.preventDefault();
    handleSubmit();
    if(cansubmit)
    {
      props.onConfirm(values);
    }
  }
  return (
    <form className={classes.form} onSubmit={sumbithandler}>
      <div className={n}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' name='name' value={values.name} onChange={handleChange} onBlur={handleBlur}/>
      </div>
      {errors.name && touched.name ? (<p>{errors.name}</p>) : null}
      <div className={s}>
        <label htmlFor='street' >Street</label>
        <input type='text' id='street' name='street' value={values.street} onChange={handleChange} onBlur={handleBlur}/>
      </div>
      {errors.street && touched.street ? (<p>{errors.street}</p>) : null}
      <div className={p}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' name='postal' value={values.postal} onChange={handleChange} onBlur={handleBlur}/>
      </div>
      {errors.postal && touched.postal ? (<p>{errors.postal}</p>) : null}
      <div className={c}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' name='city' value={values.city} onChange={handleChange} onBlur={handleBlur}/>
      </div>
      {errors.city && touched.city ? (<p>{errors.city}</p>) : null}
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;