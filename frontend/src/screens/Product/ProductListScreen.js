import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import {

  listProducts,
  deleteProduct,
  createProduct,
  listProductsseller,
  listProductsAdmin
} from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productListseller = useSelector((state) => state.productList)
  const { loading, error, sellerproducts, page, pages,success,product } = productListseller


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
  
    if (!userInfo || !userInfo.isAdmin && !userInfo.seller) {
      history.push('/login')
    }

    if (success) {
      history.push(`/admin/product/${product._id}/edit`)
    } else {
      if(userInfo.isAdmin){
      dispatch(listProductsAdmin('', pageNumber))
      }else{
        dispatch(listProductsseller('', pageNumber))
      }
    }
  }, [
    dispatch,
    history,
    userInfo,
    success,
    
    product,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    history.push(`/admin/product/add`)
    
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
     
      {error && <Message variant='danger'>{error}</Message>}
     
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>image</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>stoke</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sellerproducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td><img src={product.image} style={{"width":"4rem","height":"4rem"}}/></td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
               {product.category.slug?<td>{product.category.slug}</td>:<td>{null}</td>}
               {product.brand.slug?<td>{product.brand.slug}</td>:<td>{null}</td>}
                  
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
