import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from './Rating'

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    marginBottom:20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Product({ product }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
     
     <Link to={`/product/${product._id}`}>
       <CardMedia     className={classes.media} image={product.image} title="Paella dish"/>
     </Link>
      <CardContent>
      <Link to={`/product/${product._id}`}>
          <Typography as='div'>
            <strong>{product.name}</strong>
          </Typography>
        </Link>

        
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
  <Typography as='h3'>${product.price}</Typography>
      </CardContent>
      <CardActions disableSpacing>
    
      </CardActions>
    </Card>
  );
}
