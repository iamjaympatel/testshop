import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import {fetchCategories,deleteCategory} from '../../actions/categoryAction'
import {RESET_CATEGORY} from '../../constants/categoryConstant'

const CategoryListScreen = ({ history, match }) => {
  
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  

  
  const categorySelect=  useSelector((state)=>state.category)
  const {categories,loading,error,success}=categorySelect

 

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {

    dispatch(fetchCategories())
  
    dispatch({type:RESET_CATEGORY})
  
    if (!userInfo || !userInfo.isAdmin ) {
      history.push('/login')
    }
  }, [
    dispatch,
    history,
    userInfo,
    pageNumber
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCategory(id))
    }
  }

  const createProductHandler = () => {
    history.push(`/admin/category/add`)
    
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Category</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
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
                <th>NAME</th>
                <th>PRODUCTS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <tr> {category.products.map((pr)=><td> {pr.name}</td> )}</tr> 
                  <td>
                    <LinkContainer to={`/admin/category/${category._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(category._id)}
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

export default CategoryListScreen
