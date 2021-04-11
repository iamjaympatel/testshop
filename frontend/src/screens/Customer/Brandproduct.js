import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Brand from '../../components/Brand'
import Product from '../../components/Product'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { listProducts } from '../../actions/productActions'
import { fetchBrands } from '../../actions/brandAction'

const Brandproduct = ({ match }) => {
  const keyword = match.params.keyword
const slug=match.params.slug
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  //const productList = useSelector((state) => state.productList)
  //const { loading, error, products, page, pages } = productList

  const brand=useSelector((state)=>state.brand) 
  const {brands,loading,error}=brand
 
 
  const brandproduct = brands.filter((b)=>b.slug===slug)


  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    dispatch(fetchBrands())
  }, [dispatch, keyword, pageNumber])

  

  return (
    <>
      <Meta />
      <Link className='btn btn-light my-3' to='/brand'>
        Go Back
      </Link> 
      {brandproduct.map((p)=>
      <h1>{p.name}</h1>)}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
          {brandproduct.map((p)=>
            p.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            )) 
            )}
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

export default Brandproduct
