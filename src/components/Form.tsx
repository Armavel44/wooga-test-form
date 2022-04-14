import React, {ChangeEvent, useState} from "react";
import "./Form.css";

type FormField = {
    name: string
    label: string
    validate?: (value: string) => boolean
    validationMessage?: string
}

interface FormComponentProps {
    fields: FormField[],
    width?: number
}

type FormState = Record<string, string>

export const Form: React.FunctionComponent<FormComponentProps> = ({fields = [], width = 300}) => {
    const initialState = fields.reduce((state, it) => ({...state, [it.name]: ''}), {})
    // alternatively we can control input state in a separate <Input> component
    // and I would say it is a better practice (and mostly common),
    // but for the current task I've decided that this method can also work ok :)
    const [formState, setFormState] = useState<FormState>(initialState)
    const [errors, setErrors] = useState({})

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
        e.preventDefault()

        setFormState({...formState, [fieldName]: e.target.value})
    }

    const handleBlur = (e: ChangeEvent<HTMLInputElement>, name: string, validate?: (value: string) => boolean, validationMessage?: string) => {
        if (validate && validationMessage) {
            // we can also add visual controls for fields here
            setErrors(validate(e.target.value) ? {...errors, [name]: validationMessage} : {...errors, [name]: null})
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formErrorMessages = Object.values(errors).filter(it => typeof it === 'string')
        if (formErrorMessages.length) {
            alert(formErrorMessages.join('\r\n'))
            return
        }
        // Let's show in console the current form state, and instead in real app we will i.e. send the data to backend with REST
        // also let's clear our form since that is the most expected action after submitting the form
        alert(`You've submitted: ${JSON.stringify(formState)}`)
        setFormState(initialState)
    }

    return (
        <>
            <form className="main-form" style={{width: `${width}px`}}>
                {fields.map(({name, label, validate, validationMessage}) => (
                    <div className="main-form_input-container">
                        <label className="main-form_label">{label}</label>
                        <input
                            type="text"
                            key={name}
                            onChange={(e) => handleInputChange(e, name)}
                            onBlur={(e) => handleBlur(e, label, validate, validationMessage)}
                            value={formState[name]}
                            className="main-form_input"
                        />
                    </div>
                ))}
                <div className="main-form_button-container">
                    <button onClick={handleSubmit} className="main-form_button">Submit</button>
                </div>
            </form>
        </>
    )
}
