import React, { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import './Home.css'
import { useLoaderData } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Home = () => {

    const axiosPublic = useAxiosPublic()
    const [isSearch, setIsSearch] = useState("")
    const [filteredProduct, setFilteredProduct] = useState([])
    const { count } = useLoaderData()
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const numberOfPages = Math.ceil(count / itemsPerPage)
    const [isBrandName, setIsBrandName] = useState("")
    const [isCategoryName, setIsCategoryName] = useState("")

    console.log(isCategoryName)

    // const pages = []
    // for(let i = 0; i< numberOfPages; i++){
    //     pages.push(i)
    // }


    const pages = [...Array(numberOfPages).keys()];

    const { data: product = [], } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/food_products?page=${currentPage}&size=${itemsPerPage}`)
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
        const check = filteredProduct.sort((a, b) => new Date(b.ProductCreationDateTime) - new Date(a.ProductCreationDateTime))
        setFilteredProduct([...check])
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

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
                            <summary className="btn m-1 w-40">Brand Name</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                                <li><a onClick={() => setIsCategoryName("Italian Delights")}>Italian Delights</a></li>
                                <li><a onClick={() => setIsCategoryName("Breakfast")}>Breakfast</a></li>
                                <li><a onClick={() => setIsCategoryName("Breakfast Bar")}>Breakfast Bar</a></li>
                                <li><a onClick={() => setIsCategoryName("Wrap")}>Wrap</a></li>
                                <li><a onClick={() => setIsCategoryName("Asian Fusion")}>Asian Fusion</a></li>
                                <li><a onClick={() => setIsCategoryName("Breakfast Bar")}>Breakfast Bar</a></li>
                                <li><a onClick={() => setIsCategoryName("Cocktail Classics")}>Cocktail Classics</a></li>
                                <li><a onClick={() => setIsCategoryName("Sweet Treats")}>Sweet Treats</a></li>
                                <li><a onClick={() => setIsCategoryName("Seafood Delights")}>Seafood Delights</a></li>
                                <li><a onClick={() => setIsCategoryName("Wrap Works")}>Wrap Works</a></li>
                                <li><a onClick={() => setIsCategoryName("Burger")}>Burger</a></li>
                                <li><a onClick={() => setIsCategoryName("Fresh Greens")}>Fresh Greens</a></li>
                                <li><a onClick={() => setIsCategoryName("Sandwich Central")}>Sandwich Central</a></li>
                                <li><a onClick={() => setIsCategoryName("Burger Haven")}>Burger Haven</a></li>
                                <li><a onClick={() => setIsCategoryName("Grill Masters")}>Grill Masters</a></li>

                            </ul>
                        </details>
                        <details className="dropdown">
                            <summary className="btn m-1 w-40">Category Name</summary>
                            <ul onChange={(e) => setIsBrandName(e.target.value)} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                                <li><a onClick={() => setIsBrandName("Salad")}>Salad</a></li>
                                <li><a onClick={() => setIsBrandName("Dessert")}>Dessert</a></li>
                                <li><a onClick={() => setIsBrandName("Pizza")}>Pizza</a></li>
                                <li><a onClick={() => setIsBrandName("Sandwich")}>Sandwich</a></li>
                                <li><a onClick={() => setIsBrandName("Burger")}>Burger</a></li>
                                <li><a onClick={() => setIsBrandName("Appetizer")}>Appetizer</a></li>
                                <li><a onClick={() => setIsBrandName("Main Course")}>Main Course</a></li>
                                <li><a onClick={() => setIsBrandName("Soup")}>Soup</a></li>
                                <li><a onClick={() => setIsBrandName("Beverage")}>Beverage</a></li>
                                <li><a onClick={() => setIsBrandName("Pasta")}>Pasta</a></li>
                                <li><a onClick={() => setIsBrandName("Breakfast")}>Breakfast</a></li>
                                <li><a onClick={() => setIsBrandName("Wrap")}>Wrap</a></li>
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
                                    <h1>{foods.BrandName}</h1>
                                    <h1>{foods.ProductCreationDateTime}</h1>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <div className='flex justify-center my-10 '>
                <button
                    onClick={handlePrevPage}
                    className='btn'>
                    Prev
                </button>
                {
                    pages.map(page => <button
                        onClick={() => setCurrentPage(page)}
                        className={`btn ${currentPage === page && 'bg-yellow-300'}`}>{page}</button>)
                }
                <button
                    onClick={handleNextPage}
                    className='btn'
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;