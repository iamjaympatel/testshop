import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import {
    listProducts,
    deleteProduct,
    createProduct,selectProducts
  } from '../../actions/productActions'
  import {fetchBrands,fetchStoreBrands} from '../../actions/brandAction'
  import {fetchCategories} from '../../actions/categoryAction'
import Select from 'react-select'

const ProductAddScreen = ({ match, history }) => {
  
  const [name, setName] = useState('T-shirt')
  const [price, setPrice] = useState(20)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(10)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productList)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productList)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate


  
  const categorySelect=  useSelector((state)=>state.category)
  const {categories}=categorySelect


   const brands=useSelector((state)=>state.brand)
   const {storeBrands} =brands
const [userLocation, setUserLocation] = useState('')
    
  const [details, setDetails] = useState(null);
   const getUserGeolocationDetails = () => {
             fetch(
            "https://geolocation-db.com/json/7a802a00-8c89-11eb-9c50-4fd4fef29257/157.32.96.46"
          )
              .then(response => response.json())
              .then(data => setUserLocation(data.state));
      };

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchStoreBrands())
    getUserGeolocationDetails()
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    }
    
   },
 [dispatch, history, product, successUpdate])



  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    
    dispatch(
        createProduct({
        name, price,image, brand,category,description,countInStock,userLocation
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>ADD Product</h1>
        {loadingUpdate && <Loader />}
        {error&& <Message variant='danger'>{error.message}</Message>}
        {loading ? (
          <Loader />
        )  : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
          
            <Form.Control
                          as='select'
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)} 
                       
                        >
                          <option value=''> select brand</option>
                        
  {storeBrands.map((pro)=>                        
                          <option value={pro._id}>{pro.slug}</option>
  )}            
                        </Form.Control>
            
            </Form.Group>
            
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
             
              <Form.Control
                as='select'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                          <option value=''>select category</option>

           {categories.map((cat)=>                        
                          <option value={cat._id}>{cat.slug}</option>
  )}          
              </Form.Control>
            </Form.Group>
            
        <Form.Group controlId='Location'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Location'
            value= {`${userLocation}`}
            onChange={(e) => setUserLocation(e.target.value)}
          ></Form.Control>
        </Form.Group>
     

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Save
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductAddScreen
