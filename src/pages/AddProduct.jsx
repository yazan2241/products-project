import React, { useContext, useEffect, useState } from 'react'
import { BLUE_TEXT_USED, BLUE_USED, DARK_BG } from '../constant/ThemeConstant'
import { IoClose } from "react-icons/io5";
import FormInput from '../components/FormInput';
import { ServerUrl } from '../constant/Urls';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../providers/UserProvider';

const AddProduct = () => {
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

    const inputs = [
        {
            id: 1,
            name: "article",
            type: "string",
            placeholder: "",
            label: "Артикул",
            errorMessage: "Пожалуйста, введите свое Артикул!",
            required: true,
        },
        {
            id: 2,
            name: "title",
            type: "string",
            placeholder: "",
            label: 'Название',
            errorMessage: "Пожалуйста, введите свой Название",
            required: true,
        },
    ];

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
        }
    }, []);


    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onStatusChange = (e) => {
        setValues({ ...values, "status": e.target.value })
    }

    const handleForm = (e) => {
        e.preventDefault();

        console.log(attributes);
        let data = {};

        attributes.map((attr, index) => {
            if (index % 2 == 0) {
                // key
                let val = attr[`input-${index}`];
                data[val] = '';
            } else {
                // value
                let val = attr[`input-${index}`];

                let pVal = attributes[index - 1][`input-${index - 1}`];
                data[pVal] = val;
            }
        });

        setValues({ ...values, "attribute": data });

        console.log(values);

        const config = {
            headers: { Authorization: `Bearer ${User.token}` }
        };

        if (id != undefined) {
            axios.post(`${ServerUrl}/products/${id}`, {
                article: values.article,
                name: values.title,
                status: values.status,
                data: data
            } , config)
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
        axios.post(`${ServerUrl}/products`, {
            article: values.article,
            name: values.title,
            status: values.status,
            data: data
        }, config)
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
        }
    }

    const addAttribute = (e) => {
        e.preventDefault();
        var key1 = `input-${attributes.length}`
        var key2 = `input-${attributes.length + 1}`
        var newInput = {};
        newInput[key1] = '';
        var newInput1 = {};
        newInput1[key2] = '';
        setAttributes(attributes.concat([newInput, newInput1]));
    }

    const handleNewInput = (e) => {

        let name = e.target.name, value = e.target.value;
        let number = parseInt(name.split('-')[1]);
        let allAttr = [...attributes];
        let attr = { ...allAttr[number] };
        let key = Object.keys(attr)[0];
        attr[key] = value;
        allAttr[number] = attr;
        setAttributes(allAttr);
    }

    useEffect(() => {

    }, []);

    return (
        <div className={`w-full h-screen ${DARK_BG} p-4`}>
            <div className='flex justify-between items-center'>
                <p className='text-white font-bold'>Добавить продукт</p>
                <a href='/'><IoClose className='text-white w-8 h-8' /></a>
            </div>

            <form onSubmit={handleForm} className='flex flex-col gap-2 w-full sm:w-3/4'>

                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        value={values[input.name]}
                        onChange={onChange}
                        productId = {id} 
                        role = {User.role}
                        {...input}
                    />
                ))}
                <div className='p-3 flex flex-col '>

                    <label className='text-white px-3 py-1'>Статус</label>
                    <select defaultValue={values.status} onChange={onStatusChange} className='bg-white text-black placeholder:text-[#535860] py-2 px-4 rInput rounded' >
                        <option value='available'>Доступен</option>
                        <option value='notAvailable'>Не Доступен</option>
                    </select>
                </div>

                <div className='p-3 flex flex-col '>
                    <label className='text-white '>Атрибуты</label>
                    <div className='grid grid-cols-2 gap-2'>
                        {
                            attributes.map((item, index) => (
                                <input
                                    className='bg-white text-black placeholder:text-[#535860] py-2 px-4 rInput rounded'
                                    key={index}
                                    name={Object.keys(item)[0]}
                                    defaultValue={Object.values(item)[0]}
                                    onChange={handleNewInput}
                                />
                            ))
                        }
                    </div>
                </div>

                <button onClick={addAttribute} className={`${BLUE_TEXT_USED} border-b-2 mt-3 border-[#0FC5FF] border-dashed max-w-fit`}>+ Добавить атрибут</button>
                <button className={`${BLUE_USED} max-w-fit mt-4 px-8 py-2 text-white rounded-md`}>Добавить</button>

            </form>
        </div>
    )
}

export default AddProduct