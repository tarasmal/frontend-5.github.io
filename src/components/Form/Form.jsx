import React, {useMemo, useRef, useState} from 'react';
import Input from "../Input/Input";
import './Form.css';

const Form = ({id}) => {
    const names = ['ПІБ', 'Група', 'ID-card', 'Дата народження', 'Email'];
    const [validInputs, setValidInputs] = useState(Array(names.length).fill(NaN));
    const [data, setData] = useState({})
    const [isResultShown, setIsResultShown] = useState(false);
    const ref = useRef(null);
    const regexpPatterns = useMemo(() => [
        /^([А-ЯІЇЄ][а-яіїє']+\s){2}[А-ЯІЇЄ][а-яіїє']+$/u,
        /^[А-ЯІЇЄ]{2}-\d{2}$/,
        /^[A-Z]{2}\d{4}-\d{4}$/,
        /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.\d{4}$/,
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    ], [])

    const getFormData = (e) => {
        e.preventDefault()
        const form = ref.current
        const data = {}
        if (form) {
            names.forEach(name => {
                const input = form.elements[name];
                data[name] = input ? input.value : '';
            });
        }
        return data

    }
    const validateForm = (e) => {
        const formData = getFormData(e);
        const values = Object.values(formData);
        const validationResult = regexpPatterns.map((regexp, index) => regexp.test(values[index]))
        setValidInputs(validationResult);
        setData(formData);
    }
    const onSubmit = (e) => {
        validateForm(e)
        if (validInputs.every((validationResult) => validationResult === true)) {
            setIsResultShown(true);
        }
        else {
            setIsResultShown(false);
        }
    }

    return (
        <div className={'container'}>
            <form id={id} ref={ref}>
                {
                    names.map((name, index) =>
                        <Input
                            name={name}
                            placeholder={name}
                            key={name}
                            isValid={validInputs[index]}
                        />
                    )
                }
                <button id={'submit1'} onClick={onSubmit}>Відправити</button>
            </form>
            <div className={'result'}>
                {

                    isResultShown ?
                        Object.values(data).map(el => <h3>{el}</h3>)
                        :
                        <></>
                }
            </div>

        </div>

    );
};

export default Form;