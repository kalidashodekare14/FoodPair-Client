import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import './Home.css'
import { useLoaderData } from 'react-router-dom';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

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


    const pages = [...Array(numberOfPages).keys()];

    const { data: product = [], } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/food_products?page=${currentPage}&size=${itemsPerPage}`)
            setFilteredProduct(res.data)
            return res.data
        }
    })

    console.log(product)

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


    const handleBrandName = (e) => {
        setIsBrandName(e.target.value)
    }

    const handleCategoryName = (e) => {
        setIsCategoryName(e.target.value)
    }

    useEffect(() => {
        const brandNameFiltering = product.filter(p => p.BrandName.toLowerCase().includes(isBrandName.toLowerCase()))
        setFilteredProduct(brandNameFiltering)


    }, [isBrandName, product])

    useEffect(() => {
        const categoryNameFiltering = product.filter(p => p.Category.toLowerCase().includes(isCategoryName.toLowerCase()))
        setFilteredProduct(categoryNameFiltering)
    }, [isCategoryName, product])

   
    

    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='lg:w-96 w-full  border bg-no-repeat bg-center bg-cover '>
                <div className='h-[40vh] flex flex-col justify-center items-center my-5'>
                    <div className='space-x-3 flex items-center lg:mt-32 mx-5'>
                        <input
                            className='input input-bordered' type="text"
                            placeholder='Search'
                            onChange={(e) => setIsSearch(e.target.value)}
                        />
                        <input onClick={handleSearch} className='btn' type="submit" value="Search" />
                    </div>
                    <div className='flex flex-col lg:mt-10 mt-5 w-full space-y-5 px-10 lg:px-5'>
                        <select onChange={handleBrandName} className='w-full h-12 border rounded-md'>
                            <option className='disabled' value="">Brand Name</option>
                            <option value="Italian Delights">Italian Delights</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Breakfast Bar">Breakfast Bar</option>
                            <option value="Wrap">Wrap</option>
                            <option value="Asian Fusion">Asian Fusion</option>
                            <option value="Sweet Treats">Sweet Treats</option>
                            <option value="Seafood Delights">Seafood Delights</option>
                            <option value="Wrap Works">Wrap Works</option>
                            <option value="Burger">Burger</option>
                            <option value="Fresh Greens">Fresh Greens</option>
                            <option value="Sandwich Central">Sandwich Central</option>
                            <option value="Burger Haven">Burger Haven</option>
                            <option value="Grill Masters">Grill Masters</option>
                        </select>
                        <select onChange={handleCategoryName} className='w-full h-12 border rounded-md'>
                            <option value="">Category Name</option>
                            <option value="Salad">Salad</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Burger">Burger</option>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Soup">Soup</option>
                            <option value="Beverage">Beverage</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Wrap">Wrap</option>
                        </select>
                        <details className="dropdown">
                            <summary className="btn w-full">Sort By</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                                <li onClick={handleShortedLow}><a>Low to High</a></li>
                                <li onClick={handleShortedHigh}><a>High to Low</a></li>
                                <li onClick={handleShortedDateAndTime}><a>Newest first</a></li>
                            </ul>
                        </details>
                    </div>
                    
                </div>
            </div>
            <div>
                <div className='mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
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
        </div>
    );
};

export default Home;