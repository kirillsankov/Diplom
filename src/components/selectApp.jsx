import React from 'react';
import CustomSelect from 'react-select';

const SelectApp = ({...props}) => {

    return (
        <CustomSelect
            options={[
                { value: 'высокая', label: 'высокая' },
                { value: 'выше средней', label: 'выше средней' },
                { value: 'средняя', label: 'средняя' },
                { value: 'ниже средней', label: 'ниже средней' },
                { value: 'низкая', label: 'низкая' },
            ]}
            {...props}
        />
    );
};

export default SelectApp;