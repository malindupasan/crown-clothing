import {useState,useContext} from 'react';

import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss';
import Button from '../button/button.component';
import {UserContext} from '../../contexts/user.contexts'

const defaultFormFields={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',

}
const SignUpForm=()=>{

    const [formFields,setFormFields] =useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formFields;
    const val=useContext(UserContext)

    const {setCurrentUser}=useContext(UserContext);

    console.log(formFields);

    const resetFormFields =()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit =async(event)=>{
        event.preventDefault();
        if(password!=confirmPassword){
            alert('password dont match');
            return;
        }
        try{
            const {user} =await createAuthUserWithEmailAndPassword(email,password);

            await createUserDocumentFromAuth(user,{displayName}); 
            resetFormFields();
            setCurrentUser(user);
        }
        catch(error){
            if(error.code=='auth/email-already-in-use')
                alert('email already in use');
            console.log(error);
            console.log("user creation encountered an error ",error);
        }
    }

    const handleChange = (event)=>{
        const {name,value}=event.target;
        setFormFields({...formFields,[name]:value});

    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <h1>Sign up with your email and password !</h1>

            <form onSubmit={handleSubmit} >
                <FormInput label="Display Name" type="text" onChange={handleChange} name='displayName' value={displayName} required   />
                <FormInput type="email" label="Email" onChange={handleChange} name='email' value={email}  required />
                <FormInput type="password" label="Password" onChange={handleChange} name='password' value={password} required />
                <FormInput type="password" label="Confirm Password" onChange={handleChange}  name='confirmPassword' value={confirmPassword} required />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm;