import {useState} from 'react';

import { signInWithGooglePopup ,createUserDocumentFromAuth ,signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
const defaultFormFields={
    email:'',
    password:'',

}

const SignInForm=()=>{

    const [formFields,setFormFields] =useState(defaultFormFields);
    const {email,password}=formFields;
    
    // console.log(formFields);

    const resetFormFields =()=>{
        setFormFields(defaultFormFields);
    }
    const signInWithGoogle = async () => {
       await signInWithGooglePopup();
         ;//await removed
      };

    const handleSubmit =async(event)=>{
        event.preventDefault();
      
        try{
           const {user}=await signInAuthUserWithEmailAndPassword(email,password);
        //    console.log(response);
        }
        catch(error){

            switch(error.code){
                case "auth/wrong-password":
                    alert('incorrect password for email');
                    break;

                    case"auth/user-not-found":
                    alert('user not found');
                    break;

            }
           
           console.log(error);
        }
    }

    const handleChange = (event)=>{
        const {name,value}=event.target;
        setFormFields({...formFields,[name]:value});

    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <h1>Sign in with your email and password !</h1>

            <form onSubmit={handleSubmit} >
                <FormInput type="email" label="Email" onChange={handleChange} name='email' value={email}  required />
                <FormInput type="password" label="Password" onChange={handleChange} name='password' value={password} required />
                <div className='buttons-container'>
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}
export default SignInForm;