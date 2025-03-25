import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
// import { setCartItems } from "../context/CartContext"; 
// Import Cart Context

const CheckoutPage = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === "") {
      toast({
        title: "Error",
        description: "Please enter an amount",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const userId = uuidv4();
    const trackingId = uuidv4();
    const status = "Processing";

    var options = {
      key: "rzp_test_mWVKJchEpzXZ2A",
      key_secret: "OB7MEkYtsm9k53a2qQgEeA9L",
      amount: amount * 100,
      currency: "INR",
      name: "Online Pharmacy",
      description: "For testing purpose",
      handler: function (response) {
        toast({
          title: "Payment Successful!",
          description: `Transaction ID: ${response.razorpay_payment_id}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        const transactionData = {
          userId,
          trackingId,
          transactionId: response.razorpay_payment_id,
          amount,
          status,
          timestamp: new Date().toISOString(),
        };

        axios
          .post(
            "https://userstatus-9db86-default-rtdb.firebaseio.com/status.json",
            transactionData
          )
          .then(() => {
            toast({
              title: "Transaction Stored",
              description: "Transaction details saved successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            // setCartItems(" ")
            navigate("/order-status");
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: "Failed to store transaction",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            console.error("Error storing transaction: ", error);
          });
      },
      prefill: {
        name: "Aadithyan",
        email: "adithyanas@gmail.com",
        contact: "8848673615",
      },
      notes: {
        address: "Ooruttambalam",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <Container maxW="md" py={10} centerContent>
      <Box p={6} boxShadow="lg" borderRadius="lg" bg="white" w="100%">
        <Heading size="lg" textAlign="center" mb={6}>
          Razorpay Payment
        </Heading>
        <VStack spacing={4}>
          <Input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            size="lg"
          />
          <Button colorScheme="teal" size="lg" w="full" onClick={handleSubmit}>
            Proceed to Pay
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
