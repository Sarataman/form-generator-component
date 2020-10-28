import React, { useState, useEffect } from "react";
import {
  Form,
  TextField,
  SelectField,
  NumberField,
  // RadioField,
  DateField,
  TextAreaField,
  SubmitButton
} from "./FormElements";
import * as Yup from "yup";

const form = {
  officerName: {
    type: "text",
    label: "What is the name of the officer in question?*",
    required: true
  },
  recollection: {
    type: "textarea",
    label: "What happened?*",
    required: true
  },
  date: {
    type: "date",
    label: "When was the date of the incident?*",
    required: true
  },
  bribePrice: {
    type: "number",
    label: "How much is the bribe that was paid? (optional)"
  },
  pastCrime: {
    type: "select",
    name: "pastCrime",
    label: "Have you been arrested before? If so, what for?(optional)",
    options: [
      {
        label: "Assault and Battery",
        value: "Assault and Battery"
      },
      {
        label: "Attempted murder",
        value: "Attempted murder"
      },
      {
        label: "Forgery",
        value: "Forgery"
      },
      {
        label: "Stealing",
        value: "Stealing"
      },
      {
        label: "Others",
        value: "Others"
      }
    ]
  }
  // 6: {
  //     type: "radio",
  // name: "gender",
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

      //Validation for input types using Yup
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

    //Specify usage of Field functions created in FormELements component
    if (elementSchema.type === "text") {
      return <TextField {...props} />;
    }
    if (elementSchema.type === "number") {
      return <NumberField {...props} />;
    }
    if (elementSchema.type === "textarea") {
      return <TextAreaField {...props} />;
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
    setSubmitting(true);
    setTimeout(function () {
      resetForm();
    }, 1000);
  };

  return (
    <div className="form-page">
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

        <br />
        <SubmitButton title="Submit" />
      </Form>
    </div>
  );
}

export default FormGenerator;
