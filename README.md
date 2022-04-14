# Form component for Wooga 

Since the main task was to build a generic form component our Form accepts props `fields` and `width`.
With `width` prop we can specify the desired width of our form, height is auto calculated based on number of our fields.
`fields` props accepts an array where every single field should be declared as FormField type:

    type FormField = {
        name: string
        label: string
        validate?: (value: string) => boolean
        validationMessage?: string
    }

## `name`
Technical name, should be unique for each form, required  

## `label`
Label that is shown to user on the form, required

## `validate`
Method for validation, optional. If present field may be validated, must return true if incorrect  
Requires validationMessage to display information about errors to user

## `validationMessage`
Message that is shown to user on errors, required for validation  
Using this approach to validation developers can provide any custom and complex validation rules to component
validationMessage?: string

##

Our Form component will render as many fields as there are in formFields prop. So we can use
our new component whenever we need to display a form to user and developer can customise it as needed.
Everything project specific may be applied outside the component

As long as forms in the app only need to differ with its content, out component is resilient to changes.
We can add or remove fields, add validation to fields as we need for each field. It will always
(send data to backend) display submit result in the same way or show errors to user.  
Ideally, custom styles support should be added and component should be covered with unit tests.  

Working example may be found in `App.tsx`  
App was created using create-react-app
To run type `npm run start` in console
