// form.tsx
import {
  createZodForm,
} from '@saas-ui/forms/zod';

// zod
// import {createZodForm} from '@saas-ui/forms/zod'

// yup
// import {createYupForm} from '@saas-ui/forms/yup'

// const MyCustomField = createField(
//   React.forwardRef((props, ref) => {
//     return <input ref={ref} {...props} />;
//   })
// );

// const MyCustomControlledField = createField(
//   React.forwardRef((props, ref) => {
//     return <ReactSelect ref={ref} {...props} />;
//   }),
//   {
//     isControlled: true,
//   }
// );

export const Form = createZodForm({
  fields: {
  },
});