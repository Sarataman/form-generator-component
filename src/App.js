import React, { useState, useEffect } from 'react';
import { Form, TextField, SelectField, NumberField, RadioField, DateField, LongTextField, SubmitButton } 
    from './components/FormElements';
import * as Yup from 'yup';

const formSchema = {
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
    },
    6: {
        type: "radio",
        label: "Male",
    },
}

function App() {
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});

    useEffect(() => {   
        initForm(formSchema);
    }, []);

    const initForm = (formSchema) => {
        let _formData = {};
        let _validationSchema = {};

        for(var key of Object.keys(formSchema)){
            _formData[key] = "";

            if(formSchema[key].type === "text" || "textarea"){
                _validationSchema[key] = Yup.string();
            }else if(formSchema[key].type === "date"){
                _validationSchema[key] = Yup.date();
            }else if(formSchema[key].type === "number"){
                _validationSchema[key] = Yup.number().positive().integer();
            }else if(formSchema[key].type === "select" || "radio"){
                _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
            }

            if(formSchema[key].required){
                _validationSchema[key] = _validationSchema[key].required('Please fill out field');
            }
        }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

    const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementName,
            gender:elementName,
            label: elementSchema.label,
            options: elementSchema.options
        };

        if (elementSchema.type === "text") {
            return <TextField {...props} />
        }
        if (elementSchema.type === "number") {
            return <NumberField {...props} />
        }
        if (elementSchema.type === "textarea") {
            return <LongTextField {...props} />
        }
        if (elementSchema.type === "date") {
            return <DateField {...props} />
        }
        if (elementSchema.type === "select") {
            return <SelectField  {...props} />
        }
        if (elementSchema.type === "radio") {
            return <RadioField  {...props} />
        }

    }

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        console.log(values);
        setSubmitting(false);
    }

    return (
        <div className="App">
            <Form
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >

                {Object.keys(formSchema).map( (key, ind) => (
                    <div key={key}>
                        {getFormElement(key, formSchema[key])}
                    </div>
                ))}

            <SubmitButton
                title="Submit"
              />

            </Form>
        </div>
    );
}

export default App;