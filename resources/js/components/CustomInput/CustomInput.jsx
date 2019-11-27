import React from 'react';
import {useField} from 'formik';
import {FormControl, Input, InputLabel} from "@material-ui/core";

export default function CustomInput({label, ...props}) {
    const [field] = useField(props);
    return <FormControl>
        <InputLabel>{props.placeholder}</InputLabel>
        <Input {...field} />
    </FormControl>
}
