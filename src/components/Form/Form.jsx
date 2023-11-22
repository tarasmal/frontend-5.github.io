import React, {useRef} from 'react';
import Input from "../Input/Input";
import './Form.css';

const Form = ({id}) => {
    const names = ['ПІБ', 'Група', 'ID-card', 'Дата народження', 'Email'];
    const ref = useRef(null);
    const getFormData = (e) => {
        e.preventDefault()
        const form = ref.current
        const formData = {}
        if (form) {
            names.forEach(name => {
                const input = form.elements[name];
                formData[name] = input ? input.value : '';
            });
        }
        return formData

    }
    const validateForm = () => {

    }

    return (
        <form id={id} ref={ref}>
            {
                names.map(name => <Input name={name} placeholder={name} key={name}/>)
            }
            <button onClick={(e) => getFormData(e)}></button>
        </form>
    );
};

export default Form;