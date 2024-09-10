// form.tsx
import {
  createZodForm,
  createZodStepForm,
  createZodFormDialog
} from '@saas-ui/forms/zod';
import { Editor } from './editor';
import { createField } from '@saas-ui/forms';

// zod
// import {createZodForm} from '@saas-ui/forms/zod'

// yup
// import {createYupForm} from '@saas-ui/forms/yup'

// const MyCustomField = createField(
//   React.forwardRef((props, ref) => {
//     return <input ref={ref} {...props} />;
//   })
// );

const EditorField = createField(Editor,
  {
    isControlled: true,
  }
);



const fields = {
  editor: EditorField,
};

export const Form = createZodForm({
  fields,
});

export const StepForm = createZodStepForm({
  fields
});

export const FormDialog = createZodFormDialog(Form);
