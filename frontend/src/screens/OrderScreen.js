import React, {  useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Button, Row,Col, Image,ListGroup,Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetails, payOrder , deliverOrder} from '../actions/orderActions';
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = ({match, history}) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();

    
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error } = orderDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo } = userLogin;

    //orderPay;
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        }
    
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0 ));
    }
    
    const successPaymentHandler =() =>{
        const paymentResult = {
            id: 1234567890,
            status: 'COMPLETED',
            update_time: Date.now(),
            payer:{
                email_address: order.user.email
            }
            
        }
        dispatch(payOrder(orderId, paymentResult));
    }

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }
    useEffect(()=>{
        if(!userInfo){
            history.push('/login');
        }
        if(!order || successPay || order._id !== orderId ||successDeliver){
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(orderId));
        }
        
    },[dispatch,order,orderId,successPay,successDeliver,history,userInfo]);
    

    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :

        <>
           <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                           <p> <strong>Name: </strong> {order.user.name}</p>
                           <p>
                                <strong>Name: </strong>
                               <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}{order.shippingAddress.country}
                            </p>
                            {
                                order.isDelivered ? (
                                <Message variant='success'>Deliverd on {order.deliverdAt.substring(0,10)}</Message>
                                ): (
                                    <Message variant='danger'>Not Deliverd</Message>
                                )
                            }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method:</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {
                                order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt.substring(0,10)}</Message>
                                ): (
                                    <Message variant='danger'>Not Paid</Message>
                                )
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            
                            {order.orderItems.length === 0 ? <Message>No Order Placed</Message> : (
                                <ListGroup variant='flush'> 
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x Rs.{item.price} = Rs.{ item.price * item.qty}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summury:</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Price</Col>
                                    <Col>Rs.{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>Rs.{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Price</Col>
                                    <Col>Rs.{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>Rs.{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                {loadingPay && <Loader />}
                                
                                    <Button
                                    onClick={successPaymentHandler}
                                    >Pay {order.totalPrice}</Button>
                               
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader/>}
                            {
                                userInfo && userInfo.isAdmin && order.isPaid && !order.isDeliverd && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                            Mark as deliverd
                                        </Button>
                                    </ListGroup.Item>
                                )
                            }
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    );
}

export default OrderScreen;
