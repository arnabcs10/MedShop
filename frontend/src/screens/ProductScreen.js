import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct , createProductReview} from '../actions/productActions';
import {Link} from 'react-router-dom';
import { Row,Col,Image,ListGroup,Card,Button, ListGroupItem, FormControl, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = (props) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const productReviewCreate = useSelector( state => state.productReviewCreate);
    const {success: successProductReview, error: errorProductReview} = productReviewCreate;

    const productDetails = useSelector( state => state.productDetails);
    const {loading, error, product} = productDetails;

    const userLogin = useSelector( state => state.userLogin);
    const {userInfo} = userLogin;

    useEffect(() => {
        if(successProductReview){
            alert('Review Submitted');
            setRating(0);
            setComment('');
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET});
        }
        dispatch(fetchProduct(props.match.params.id));
    },[dispatch,props.match,successProductReview]);

    const addToCartHandler = () =>{
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
    }
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(createProductReview(props.match.params.id, {
            rating,
            comment
        }));
    }
    return (
        <>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>): ( 
                <>
                <Meta title={product.name}/>
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
                            Price: Rs.{product.price}
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
                                        <strong>Rs.{product.price}</strong>
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
                            {product.countInStock > 0 && (
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Qty:
                                        </Col>
                                        <Col>
                                            <FormControl as='select' value={qty} onChange={e => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                            </FormControl>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}
                            
                            <ListGroupItem>
                                <Button 
                                className='btn-block' 
                                type='button' 
                                disabled={product.countInStock <= 0}
                                onClick={addToCartHandler}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>No reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map( review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating}/>
                                <p>{review.createdAt}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}

                    <ListGroup.Item>
                        <h2>Drop your review</h2>
                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                        {
                            userInfo ? 
                            (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e)=> setRating(e.target.value)}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3' value={comment} onChange={(e)=> setComment(e.target.value)}>

                                        </Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>
                                        Submit
                                    </Button>
                                </Form>
                            ) 
                            : <Message>Please <Link to='/login'>Login</Link> to write a review</Message>
                        }
                    </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
            )}
            
        </>
    );
}

export default ProductScreen;
