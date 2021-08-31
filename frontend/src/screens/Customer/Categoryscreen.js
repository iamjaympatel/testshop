import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Category from '../../components/Category'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listProducts } from '../../actions/productActions'
import { fetchBrands } from '../../actions/brandAction'
import { fetchCategories } from '../../actions/categoryAction'

const CategoryScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  //const productList = useSelector((state) => state.productList)
  //const { loading, error, products, page, pages } = productList

  const brand=useSelector((state)=>state.category) 
  const {categories,loading,error}=brand
 

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    dispatch(fetchCategories())
  }, [dispatch, keyword, pageNumber])

  

  return (
    <>
    <Meta />
    
    <h1> SELECT Category</h1>
    <Link className='btn btn-light my-3' to='/' style={{"backgroundColor":"pink" ,"margin":"1rem"}}>
    Go back
  </Link> 
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <>
        <Row>
          {categories.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Category brand={product} />
            </Col>
          ))}
        </Row>
        <Paginate
         // pages={pages}
          //page={page}
          keyword={keyword ? keyword : ''}
        />
      </>
    )}
  </>


  )
}

export default CategoryScreen
