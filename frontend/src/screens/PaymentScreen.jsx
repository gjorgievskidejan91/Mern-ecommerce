import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import {Form, Button, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;

    useEffect(() => {
        if(!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [navigate,shippingAddress]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')


return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check className="my-2"
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                >
                </Form.Check>
                </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
                Continue
            </Button>
        </Form>
        
    </FormContainer>
)
}

export default PaymentScreen;