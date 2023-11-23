import React, {useEffect, useState} from 'react';
import './Input.css';

const Input = ({isValid, ...props}) => {
    const [value, setValue] = useState('')
    useEffect(() => {
        if (!isValid) {
            setValue('')
        }
    }, [isValid]);
    return (
        <>
            <input
                className={'form-input'}
                value={value}
                onChange={(event) => +setValue(event.target.value)}
                {...props}
            />
            {
                isValid === false ?
                <div className={'validation'}>Введіть правильне значення</div> : <></>
            }
        </>

    );
};

export default Input;