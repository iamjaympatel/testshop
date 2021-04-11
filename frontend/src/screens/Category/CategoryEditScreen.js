import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { selectProducts } from '../../actions/productActions'
import Select from 'react-select'


import {fetchCategory, updateCategory} from '../../actions/categoryAction'

const CategoryEditScreen = ({ match, history }) => {
  const categoryId = match.params.id

  
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [products, setProducts] = useState([])
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()


  const ProductSelect=  useSelector((state)=>state.ProductSelect)
   //const { products,selectedProducts}=ProductSelect
   const productforselect=ProductSelect.products

   
  const categorySelect=  useSelector((state)=>state.category)
  const {categories,category,success,loading,error}=categorySelect

  
  useEffect(() => {
    
   
    dispatch(selectProducts())
    if (success) {
      history.push('/admin/categorylist')
    } 
    if (!category.name || category._id !==categoryId) {
      dispatch( fetchCategory(categoryId)) 
       } else {
        const oldproducts=[]
        category.products.forEach((pro)=>
        oldproducts.push({label:pro.slug,value:pro._id})
        )
        setName(category.name)
        setImage(category.image)
        setDescription(category.description)
        setProducts(oldproducts)
      }
    
  }, [dispatch, history, categoryId,category, success])

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


  
  const selectoption=[]
 
  productforselect.forEach((pro)=>
  selectoption.push({label:pro.slug,value:pro._id})
  )

  const array=[]
  products.forEach((p)=>array.push(p.value))

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCategory({
        _id: categoryId,
        name:name,
        image:image,
        array:array,
        description:description,
      })
    )
  }
  return (
    <>
      <Link to='/admin/categorylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Category</h1>
        {loading ? (
          <Loader />
        ) : (
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
            <Select
            value={products}
            onChange={(e)=>setProducts(e)}
             options={selectoption}
             isMulti={true}
             />               
            
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}


export default CategoryEditScreen
