import React, {FC} from 'react';

interface RadioInputProps {
    label: string,
    checked: boolean,
    onChange: () => void
}

const CustomRadioInput:FC<RadioInputProps> = ({label, checked, onChange}) => {
    return <label>
            <input
                type='radio'
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
};

export default CustomRadioInput;