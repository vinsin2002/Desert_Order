import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  postal: yup.number().required()
});