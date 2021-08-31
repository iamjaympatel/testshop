import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Category = ({ brand }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/category/${brand.slug}`}>
        <Card.Img src={brand.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/category/${brand.slug}`}>
          <Card.Title as='h3'>
            <strong>{brand.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='h5'>{brand.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Category
