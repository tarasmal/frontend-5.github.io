import React, {useEffect, useState} from 'react';
import './Input.css';

const Input = ({getValue, validate=()=>{}}) => {
    const [value, setValue] = useState('')
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        validate(value)
        getValue && getValue(value)
    }, [value]);
    return (
        <>
            <input
                className={'form-input'}
                value={value}
                onChange={(event) => +setValue(event.target.value)}
            />
            {
                !isValid &&
                <div className={'validation'}>Введіть правильне значення</div>
            }
        </>

    );
};

export default Input;