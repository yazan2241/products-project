import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import { BLUE_USED, TEXT_SECONDARY } from '../constant/ThemeConstant'
// import { products } from '../data/products'
import axios from 'axios';
import { ServerUrl } from '../constant/Urls';

const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios.get(`${ServerUrl}/products`)
            .then(function (response) {

                setProducts(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                // TODO
            });

    }, []);



    return (
        <div className='flex min-h-screen'>
            <div className='flex-0'>
                <SideBar />
            </div>
            <div className='flex-1'>
                <NavBar />
                <div className='bg-[#F2F6FA] h-full p-8'>
                    <div className='flex justify-between'>
                        <div className='flex gap-4 items-center justify-around w-full '>
                            <p className={`${TEXT_SECONDARY} font-medium`}>АРТИКУЛ</p>
                            <p className={`${TEXT_SECONDARY} font-medium `}>НАЗВАНИЕ</p>
                            <p className={`${TEXT_SECONDARY} font-medium `}>СТАТУС</p>
                            <p className={`${TEXT_SECONDARY} font-medium `}>АТРИБУТЫ</p>
                        </div>
                        <a href='/add' className={`${BLUE_USED} px-8 py-2 text-white rounded-md`}>Добавить</a>
                    </div>
                    <div className='flex flex-col '>
                        {
                            products.map((item, index) => (
                                <a href={`/show/${item.id}`} key={index}>

                                    <div className='mx-4' >
                                        <div className='flex'>
                                            <div className=' w-full bg-white border-t-2'>
                                                <div className='flex gap-4 items-center justify-around w-full py-2'>
                                                    <p className=''>{item.article}</p>
                                                    <p className=''>{item.name}</p>
                                                    <p className=''>{item.status}</p>
                                                    <div className=''>
                                                        {
                                                            Object.entries(item.data).map(([key, value], index) => (
                                                                <p key={index} className={`text-sm `}>{key} : {value}</p>
                                                            ))
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                            <button className={`${BLUE_USED} px-8 py-2 text-white rounded-md invisible`}>АТРИБУТЫ</button>
                                        </div>
                                    </div>
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home