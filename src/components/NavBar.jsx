import React, { useContext } from 'react'
import { TEXT_SECONDARY } from '../constant/ThemeConstant'
import { UserContext } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../constant/Urls';

const NavBar = () => {
    const User = useContext(UserContext);
    let navigate = useNavigate();
    const logout = (e) => {
        if(User == null) {
            navigate('/login');
        }else{
            const config = {
                headers: { Authorization: `Bearer ${User.token}` }
            };
            axios.post(`${ServerUrl}/logout` , config )
            .then(function (response) {

                console.log(response);
                localStorage.setItem("user" , null);
                navigate('/login');

            })
            .catch(function (error) {
                console.log(error);
                if(error.response.statusText == 'Unauthorized'){
                    navigate('/login');
                }
                
                // TODO
            });
        }
    }
    return (
        <div className='flex justify-between w-full'>
            <div className='flex flex-row items-start justify-center gap-2'>
                <a href='/' className='flex m-4 p-2 active'> Products </a>
            </div>
            
            <button onClick={logout} className={`m-4 p-2 ${TEXT_SECONDARY} `}>{(User != null) ? User.name : 'Guest' }</button>
        </div>
    )
}

export default NavBar