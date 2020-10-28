import React from "react";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext
} from "formik";

export function Form(props) {
  return (
    <Formik {...props}>
      <FormikForm className="needs-validation" novalidate="">
        {props.children}
      </FormikForm>
    </Formik>
  );
}

//Text Input
export function TextField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <>
      {label && <label for={name}>{label}</label>}
      <Field
        className="form-control"
        type="text"
        name={name}
        id={name}
        placeholder={placeholder || ""}
        {...rest}
      />

      <ErrorMessage
        name={name}
        render={(msg) => (
          <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
        )}
      />
      <br />
    </>
  );
}

//Textarea Input
export function TextAreaField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <>
      {label && <label for={name}>{label}</label>}
      <Field
        className="form-control"
        as="textarea"
        name={name}
        id={name}
        placeholder={placeholder || ""}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
        )}
      />
      <br />
    </>
  );
}

//Number Input
export function NumberField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <>
      {label && <label for={name}>{label}</label>}
      <Field
        className="form-control"
        type="number"
        name={name}
        id={name}
        placeholder={placeholder || ""}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
        )}
      />
      <br />
    </>
  );
}

//Date Input
export function DateField(props) {
  const { name, label, placeholder, ...rest } = props;
  return (
    <>
      {label && <label for={name}>{label}</label>}
      <Field
        className="form-control"
        type="date"
        name={name}
        id={name}
        placeholder={placeholder || ""}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
        )}
      />
      <br />
    </>
  );
}

// //Radio button Input
// export function RadioField(props) {
//   const { name, id, value, onChange, label, ...rest } = props;
//   return (
//     <>
//       {label && <label for={id}>{label}</label>}
//       <Field
//         className="form-control"
//         type="radio"
//         name={name}
//         id="gender"
//         value={value || ""}
//         checked={id === value}
//         // onChange={e => change(e, name, true)}
//         {...rest}
//       />
//       <ErrorMessage
//         name={name}
//         render={(msg) => (
//           <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
//         )}
//       />
//     </>
//   );
// }


//Dropdown Input
export function SelectField(props) {
  const { name, label, options } = props;
  return (
    <>
      {label && <label for={name}>{label}</label>}
      <Field as="select" id={name} name={name}>
        <br />
        <option value="">Choose...</option>
        {options.map((optn, index) => (
          <option value={optn.value} label={optn.label || optn.value} />
        ))}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
        )}
      />
      <br />
    </>
  );
}

export function SubmitButton(props) {
  const { title, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <button className="btn" type="submit" {...rest} disabled={isSubmitting}>
      {isSubmitting ? "Please wait..." : "Submit"}
    </button>
  );
}
