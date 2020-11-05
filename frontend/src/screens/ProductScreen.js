import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../actions/productActions';
import {Link} from 'react-router-dom';
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductScreen = (props) => {
    
    const dispatch = useDispatch();

    const productDetails = useSelector( state => state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(() => {
        dispatch(fetchProduct(props.match.params.id));
    },[dispatch,props.match]);

    return (
        <>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>): ( 
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>{product.name}</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card >
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock':'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button className='btn-block' type='button' disabled={product.countInStock <= 0}>
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
            
        </>
    );
}

export default ProductScreen;
