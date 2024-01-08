import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import axios from 'axios';
import { ServerUrl } from '../constant/Urls';
import { DARK_BG } from '../constant/ThemeConstant';
import { IoClose } from 'react-icons/io5';
import { MdEdit, MdDelete } from "react-icons/md";

const Show = () => {
    const { id } = useParams();

    let navigate = useNavigate();
    const User = useContext(UserContext);

    const [values, setValues] = useState({
        article: "",
        title: "",
        status: "available",
        attribute: [],
    });

    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        if (id != undefined) {
            axios.get(`${ServerUrl}/products/${id}`)
                .then(function (response) {
                    let res = response.data;
                    console.log(res);
                    setValues({
                        article: res.article,
                        title: res.name,
                        status: res.status,
                        attribute: res.data
                    });
                    let dataArray = [];
                    Object.entries(res.data).map(([key, value], index) => {

                        let nKey = `input-${index}`;
                        let nValue = key;
                        let nKey1 = `input-${index + 1}`;
                        let nValue1 = value;

                        let obj = {};
                        obj[nKey] = nValue;
                        dataArray.push(obj);

                        obj = {};
                        obj[nKey1] = nValue1;
                        dataArray.push(obj);


                    })
                    setAttributes(dataArray);
                    console.log(attributes);

                })
                .catch(function (error) {
                    console.log(error);
                    if(error.response.statusText == 'Unauthorized'){
                        navigate('/login');
                    }
                    // TODO
                });
        } else {
            navigate('/');
        }
    }, []);


    const deleteItem = (e) => {
        if(User != null){
            
        const config = {
            headers: { Authorization: `Bearer ${User.token}` }
        };

        axios.delete(`${ServerUrl}/products/delete/${id}` , config )
            .then(function (response) {

                console.log(response);
                navigate('/');

            })
            .catch(function (error) {
                console.log(error);
                if(error.response.statusText == 'Unauthorized'){
                    navigate('/login');
                }
                
                // TODO
            });
        }else{
            navigate('/login');
        }
    }

    return (
        <div className={`w-full h-screen ${DARK_BG} p-4`}>
            <div className='flex justify-between items-center'>
                <p className='text-white font-bold text-2xl pl-3'>{values.title}</p>
                <div className='flex gap-1'>
                    <a href={`/update/${id}`} className='bg-[#C4C4C470] p-2'><MdEdit className='text-white w-6 h-6' /></a>
                    <button onClick={deleteItem} className='bg-[#C4C4C470] p-2'><MdDelete className='text-white w-6 h-6' /></button>
                    <a href='/' className='p-2'><IoClose className='text-white w-6 h-6' /></a>

                </div>
            </div>
            <div className='m-4'>
                <p className='text-white font-medium'><span className='text-[#ffffff70] pr-12'>Артикул</span>  {values.article}</p>
                <p className='text-white font-medium'><span className='text-[#ffffff70] pr-12'>Название</span>  {values.title}</p>
                <p className='text-white font-medium'><span className='text-[#ffffff70] pr-12'>Статус</span>  {values.status}</p>
                <p className='text-white font-medium inline-block'><span className='text-[#ffffff70] pr-12'>Атрибут</span>
                    <div className='inline-block'>

                        {
                            Object.entries(values.attribute).map(([key, value], index) => (
                                <p className='font-medium'>{key} : {value}</p>
                            ))
                        }
                    </div>
                </p>
            </div>
        </div>
    )
}

export default Show