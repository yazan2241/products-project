import React, { useState , useContext } from 'react'
import { BLUE_TEXT_USED, BLUE_USED, DARK_BG } from '../constant/ThemeConstant'
import { IoClose } from "react-icons/io5";
import FormInput from '../components/FormInput';
import { ServerUrl } from '../constant/Urls';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext, UserDispatchContext } from '../providers/UserProvider';

const Login = () => {

    const User = useContext(UserContext);
    const setUser = useContext(UserDispatchContext);
    const [errorMessage, seterrorMessage] = useState('');
    let navigate = useNavigate();
    const style = {

        content: 'flex flex-col w-full lg:h-full items-center justify-center h-auto mt-8 lg:mt-1',
        rcontent: `w-full sm:w-4/6`,
        rSignInText: `font-bold text-2xl hidden lg:block text-white text-center`,
        rlogin: `bg-[#4D47C3] text-white flex items-center justify-center w-full rounded mt-6 py-3 shadow-xl`,
        textLeft: `mt-8`,
        registerText: `text-md text-white`,
        registerButton: `text-blue-200 hover:text-blue-400 hover:underline`,
    }

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Enter email or username",
            errorMessage: "should be a valid email address!",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage: "should be more than 8 charectures and contains at least one charecture , one letter and one symbol",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${ServerUrl}/login`, {
            email: values.email,
            password: values.password,
          })
            .then(function (response) {
              setUser(response.data.user);
              localStorage.setItem("user" ,  JSON.stringify(response.data.user));
              navigate('/');
            })
            .catch(function (error) {
                seterrorMessage("email not found");
              console.log(error);
              // TODO
            });
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };



    return (
        <div className={`w-full h-screen ${DARK_BG} p-4`}>
            {
                (errorMessage.length > 1) ?
                    <div className='absolute right-2'>
                        <div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                            <p class="font-bold">Be Warned</p>
                            <p>{errorMessage}</p>
                        </div>
                    </div>
                    : <></>
            }
            <div className={style.content}>
                <div className={style.rcontent}>

                    <div className={style.rSignInText}>Sign in</div>
                    <form onSubmit={handleSubmit}>

                        {inputs.map((input) => (
                            <FormInput key={input.id} value={values[input.name]} onChange={onChange} {...input} />
                        ))}


                        <button className={style.rlogin}>Login</button>
                    </form>

                    <div className={style.textLeft}>
                        <div className={style.registerText}>if you don't have an account register</div>
                        <div className={style.registerText}>You can <a href='/register' className={style.registerButton}>Register here!</a></div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Login