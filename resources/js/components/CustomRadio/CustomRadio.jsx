import React from 'react';
import {useField} from 'formik';
import {FormControlLabel, Radio} from "@material-ui/core";

export default function CustomRadio({label,...props}) {
    const [field] =useField(props);
    return <FormControlLabel {...field} control={<Radio onChange={(e)=>props.onChange(e)}/>} label={label}/>
}
