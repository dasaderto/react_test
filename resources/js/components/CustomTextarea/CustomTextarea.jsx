import React from 'react';
import {useField} from 'formik';
import {FormControl, TextField, InputLabel} from "@material-ui/core";

export default function CustomTextarea({label, ...props}) {
    const [field] = useField(props);
    return <FormControl>
        <textarea className={'input-box'} defaultValue={props.value || ""}></textarea>
    </FormControl>
}
