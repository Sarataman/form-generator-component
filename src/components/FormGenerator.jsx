import React, { useState, useEffect } from "react";
import {
  Form,
  TextField,
  SelectField,
  NumberField,
  RadioField,
  DateField,
  LongTextField,
  SubmitButton
} from "./FormElements";
import * as Yup from "yup";

const form = {
  1: {
    type: "text",
    label: "What is the name of the officer in question?",
    required: true
  },
  2: {
    type: "textarea",
    label: "What happened?"
  },
  3: {
    type: "date",
    label: "When was the date of the incident?",
    required: true
  },
  4: {
    type: "number",
    label: "How much is the bribe that was paid? (optional)"
  },
  5: {
    type: "select",
    label: "Role",
    required: true,
    options: [
      {
        label: "Admin",
        value: "admin"
      },
      {
        label: "User",
        value: "user"
      }
    ]
  }
  // 6: {
  //     type: "radio",
  //     label: "Male",
  // },
};

function FormGenerator() {
  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    initForm(form);
  }, []);

  const initForm = (form) => {
    let _formData = {};
    let _validationSchema = {};

    for (var key of Object.keys(form)) {
      _formData[key] = "";

      if (form[key].type === "text" || "textarea") {
        _validationSchema[key] = Yup.string();
      } else if (form[key].type === "date") {
        _validationSchema[key] = Yup.date();
      } else if (form[key].type === "number") {
        _validationSchema[key] = Yup.number().positive().integer();
      } else if (form[key].type === "select" || "radio") {
        _validationSchema[key] = Yup.string().oneOf(
          form[key].options.map((o) => o.value)
        );
      }

      if (form[key].required) {
        _validationSchema[key] = _validationSchema[key].required(
          "Please fill out field"
        );
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  const getFormElement = (elementName, elementSchema) => {
    const props = {
      name: elementName,
      // gender:elementName,
      label: elementSchema.label,
      options: elementSchema.options
    };

    if (elementSchema.type === "text") {
      return <TextField {...props} />;
    }
    if (elementSchema.type === "number") {
      return <NumberField {...props} />;
    }
    if (elementSchema.type === "textarea") {
      return <LongTextField {...props} />;
    }
    if (elementSchema.type === "date") {
      return <DateField {...props} />;
    }
    if (elementSchema.type === "select") {
      return <SelectField {...props} />;
    }
    // if (elementSchema.type === "radio") {
    //     return <RadioField  {...props} />
    // }
  };

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Form
        className="form-group"
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {Object.keys(form).map((key, ind) => (
          <div key={key}>{getFormElement(key, form[key])}</div>
        ))}

        <SubmitButton title="Submit" />
      </Form>
    </div>
  );
}

export default FormGenerator;
