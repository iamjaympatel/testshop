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
  createProduct,selectProducts
} from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'
import { RESET_BRAND } from '../../constants/brandConstatnt'
import { deleteBrand, fetchStoreBrands } from '../../actions/brandAction'

const BrandListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
 

  const dispatch = useDispatch()


  const brandselect=useSelector((state)=>state.brand)
  const {loading ,storeBrands,success} =brandselect

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(fetchStoreBrands())
    dispatch({type:RESET_BRAND})
if(success){
    dispatch(fetchStoreBrands())
}
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin && !userInfo.seller) {
      history.push('/login')
    }

  }, [
    dispatch,
    history,
    userInfo,
  
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteBrand(id))
    }
  }

  const createProductHandler = () => {
    history.push(`/admin/brand/add`)
    
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Brands</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Brand
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      )  : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRODUCTS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {storeBrands.map((brand) => (
               
                <tr key={brand._id}>  
                  <td>{brand._id}</td>
                  <td>{brand.name}</td>
                 <tr> {brand.products.map((pr)=><td> {pr.name}</td> )}</tr> 
                  
                  <td>
                    <LinkContainer to={`/admin/brand/${brand._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(brand._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate isAdmin={true} />
        </>
      )}
    </>
  )
}

export default BrandListScreen
