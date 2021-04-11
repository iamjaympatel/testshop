import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { listProductDetails, updateProduct,selectProducts } from '../../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import {fetchStoreBrands,updateBrand, fetchBrand} from '../../actions/brandAction'
import { RESET_BRAND } from '../../constants/brandConstatnt'
import Select from 'react-select'


const BrandEditScreen = ({ match, history }) => {
  const brandId = match.params.id

  const brands=useSelector((state)=>state.brand)
  const {storeBrands,brand,success,loading} =brands
  
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [products, setProducts] = useState([])
  const [data, setData] = useState([])
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()



  // const ProductSelect=  useSelector((state)=>state.ProductSelect)
  //  //const { products,selectedProducts}=ProductSelect
  //  const productforselect=ProductSelect.products

  //  const selectoption=[]

  //  productforselect.forEach((pro)=>
  //  selectoption.push({label:pro.slug,value:pro._id})
  //  )

  
  useEffect(() => {
    dispatch(selectProducts())
    dispatch(fetchStoreBrands())
    
    
    if (success) {
    
      history.push('/admin/brandlist')
    } 
    if (!brand.name || brand._id !==brandId) {
      dispatch( fetchBrand(brandId)) 
       } else {
        const oldproducts=[]
        brand.products.forEach((pro)=>
        oldproducts.push({label:pro.slug,value:pro._id})
        )
        setName(brand.name)
        setImage(brand.image)
        setDescription(brand.description)
        setProducts(oldproducts)
      }
    
  }, [dispatch, history, brandId,brand, success])

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
      updateBrand({
        _id: brandId,
        name:name,
        image:image,
        description:description,
      })
    )
  }
  return (
    <>
      <Link to='/admin/brandlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>ADD Brand</h1>
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


export default BrandEditScreen



// {
//   <Form.Group controlId='brand'>
          
//             <Select
//           value={products}
//           onChange={(e)=>setProducts(e)}
//            options={selectoption}
//            isMulti={true}
//           />               
             
            
//             </Form.Group>
            
// }