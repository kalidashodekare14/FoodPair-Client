import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import './Home.css'

const Home = () => {

    const axiosPublic = useAxiosPublic()
    const [isSearch, setIsSearch] = useState("")
    const [filteredProduct, setFilteredProduct] = useState([])


    const { data: product = [], } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await axiosPublic.get('/food_products')
            setFilteredProduct(res.data)
            return res.data
        }
    })


    const handleSearch = () => {

        const result = product.filter(search =>
            search.ProductName.toLowerCase().includes(isSearch.toLowerCase())
        );
        setFilteredProduct(result)
    }

    const handleShortedLow = () => {
        const check = filteredProduct.sort((a, b) => parseFloat(a.Price.replace('$', '')) - parseFloat(b.Price.replace('$', '')))
        setFilteredProduct([...check])
    };
    const handleShortedHigh = () => {
        const check = filteredProduct.sort((a, b) => parseFloat(b.Price.replace('$', '')) - parseFloat(a.Price.replace('$', '')))
        setFilteredProduct([...check])
    };
    const handleShortedDateAndTime = () => {
        const check = filteredProduct.sort((a, b) => new Date(b.ProductCreationDateTime) - new Date(a.ProductCreationDateTime) )
        setFilteredProduct([...check])
    };

    return (
        <div>
            <div className='banner h-[40vh] bg-no-repeat bg-center bg-cover mb-10'>
                <div className='h-[40vh] flex flex-col justify-center items-center'>
                    <div className='space-x-3'>
                        <input
                            className='input input-bordered' type="text"
                            placeholder='Search'
                            onChange={(e) => setIsSearch(e.target.value)}
                        />
                        <input onClick={handleSearch} className='btn' type="submit" value="Search" />
                    </div>
                    <div className='space-x-5 my-5'>
                        <details className="dropdown">
                            <summary className="btn m-1 w-40">Categorization</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                                <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li>
                            </ul>
                        </details>
                        <details className="dropdown">
                            <summary className="btn m-1 w-40">Sort By</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                                <li onClick={handleShortedLow}><a>Low to High</a></li>
                                <li onClick={handleShortedHigh}><a>High to Low</a></li>
                                <li onClick={handleShortedDateAndTime}><a>Newest first</a></li>
                            </ul>
                        </details>
                    </div>
                </div>
            </div>
            <div className='mx-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    filteredProduct.map(foods => <div>
                        <div className="card card-compact bg-base-100 shadow-xl">
                            <div className='relative'>
                                <figure>
                                    <img className='w-full h-[40vh]' src={foods.ProductImage} alt="" />
                                </figure>
                                <span className='absolute top-0 right-0 p-3 font-bold text-white bg-black'>{foods.Price}</span>
                            </div>
                            <div className="card-body">
                                <div className='flex justify-between items-center'>
                                    <h2 className="card-title">{foods.ProductName}</h2>
                                    <h2 className='text-xl'>{foods.Category}</h2>
                                </div>
                                <p>{foods.Description}</p>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={foods.Ratings}
                                    readOnly
                                />
                                <div className="flex justify-between items-center">
                                    <h1>{foods.ProductCreationDateTime}</h1>
                                    <button className="btn btn-primary">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;