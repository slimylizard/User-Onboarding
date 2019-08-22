import React from 'react';
import {Form, Field, withFormik} from 'formik';
import * as yup from 'yup';

const FormComp = (props) => {
    console.log(props);
    const {values, touched, errors} = props;
    return (
        <Form>
            {touched.name && errors.name && <p className='error'>{errors.name}</p>}
            <Field type='text' name='name' placeholder='name' />
            {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            <Field type='email' name='email' placeholder='email' />
            {touched.password && errors.password && <p className='error'>{errors.password}</p>}
            <Field type='password' name='password' name='password' placeholder='password' />
            {touched.terms && errors.terms && <p className='error'>{errors.terms}</p>}
            <label>
                <Field type='checkbox' name='terms' />
                Agree to terms of service
            </label>
            <button type='submit'>Submit</button>
        </Form>
    );
};

const FormikForm = withFormik({
    mapPropsToValue: ({name, email, password, terms}) => {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false,
        };
    },
    validationSchema:yup.object().shape({
        name: yup.string()
        .required('Need a Name.'),
        email: yup.string()
        .email('Need an Email')
        .required(),
        password: yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Password is required'),
        terms: yup.boolean()
        .oneOf([true], 'Must read tos')
        .required()
    })
})(FormComp);

export default FormikForm;