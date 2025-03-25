import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  Divider,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const { cartItems, setCartItems, removeFromCart, updateCartItem, clearCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    // Load Razorpay SDK dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const estimatedTax = subtotal * 0.05; // Assuming 5% tax
  const total = subtotal + estimatedTax;

  const handleSubmit = (totalAmount) => {
    // setAmount(totalAmount);

    if (!window.Razorpay) {
      toast({
        title: "Error",
        description:
          "Razorpay SDK failed to load. Please check your internet connection.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (totalAmount === "") {
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
      amount: totalAmount * 100,
      currency: "INR",
      name: "Online Pharmacy",
      description: "For testing purpose",
      handler: function (response) {
        // First check if we have a valid payment ID
        if (!response.razorpay_payment_id) {
          toast({
            title: "Payment Failed",
            description: "No payment ID received. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          return;
        }

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
          amount: totalAmount,
          status,
          timestamp: new Date().toISOString(),
        };

        axios
          .post(
            "https://userstatus-9db86-default-rtdb.firebaseio.com/status.json",
            transactionData
          )
          .then(() => {
            // Store complete order details in localStorage with unique key
            const orderDetails = {
              ...transactionData,
              items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                imageUrl: item.imageUrl,
                brand: item.brand
              })),
              orderDate: new Date().toISOString(),
              deliveryAddress: "123 Main Street, City, Country",
              phoneNumber: "+91 1234567890",
              email: "customer@example.com"
            };
            
            // Store order with unique key
            localStorage.setItem(`order_${orderDetails.trackingId}`, JSON.stringify(orderDetails));
            
            // Only clear cart after confirming order is stored
            clearCart();
            
            toast({
              title: "Order Placed Successfully!",
              description: "Your order has been placed and cart has been cleared.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });

            // Navigate to order status page
            navigate("/order-status");
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: "Failed to store transaction. Cart items will be preserved.",
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

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <Flex 
      minH="100vh" 
      mx="auto" 
      p={6} 
      gap={8}
      bgGradient="linear(to-br, blue.50, purple.50)"
      backgroundImage="url('https://img.freepik.com/free-vector/abstract-medical-background-with-hexagonal-pattern_53876-101672.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundBlendMode="overlay"
    >
      {/* Left Side: Cart Items */}
      <Box 
        flex="2" 
        bg="white" 
        p={6} 
        borderRadius="lg" 
        boxShadow="xl"
        backdropFilter="blur(10px)"
        bgColor="rgba(255, 255, 255, 0.9)"
      >
        <Heading size="lg" mb={4} color="blue.600">
          Your Shopping Cart
        </Heading>

        {cartItems.length === 0 ? (
          <Text textAlign="center" fontSize="lg" color="gray.600">
            Your cart is empty.
          </Text>
        ) : (
          <VStack spacing={6} align="stretch" maxH="80%" overflowY="auto">
            {cartItems.map((item) => (
              <Flex
                key={item.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                align="center"
                justify="space-between"
                bg="white"
                boxShadow="md"
                _hover={{ transform: "translateY(-2px)", transition: "all 0.2s" }}
              >
                <HStack spacing={4}>
                  <Image
                    src={item.img || "https://via.placeholder.com/80"}
                    alt={item.name}
                    boxSize="80px"
                    borderRadius="md"
                    objectFit="cover"
                    boxShadow="md"
                  />
                  <Box>
                    <Text fontSize="md" fontWeight="bold" color="gray.800">
                      {item.name}
                    </Text>
                    <Text fontSize="sm" color="blue.600">
                      Price: ₹{item.price.toFixed(2)}
                    </Text>
                  </Box>
                </HStack>

                <HStack>
                  <IconButton
                    icon={<FaMinus />}
                    size="sm"
                    colorScheme="blue"
                    isDisabled={item.quantity <= 1}
                    onClick={() => updateCartItem(item.id, item.quantity - 1)}
                    _hover={{ bg: "blue.100" }}
                  />
                  <Text fontSize="md" fontWeight="bold" color="gray.700">
                    {item.quantity}
                  </Text>
                  <IconButton
                    icon={<FaPlus />}
                    size="sm"
                    colorScheme="blue"
                    onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    _hover={{ bg: "blue.100" }}
                  />
                </HStack>

                <IconButton
                  icon={<FaTrash />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => {
                    removeFromCart(item.id);
                    toast({
                      title: "Item Removed",
                      description: `${item.name} has been removed from your cart.`,
                      status: "error",
                      duration: 900,
                      isClosable: true,
                    });
                  }}
                  _hover={{ bg: "red.100" }}
                />
              </Flex>
            ))}
          </VStack>
        )}
      </Box>

      {/* Right Side: Order Summary */}
      <Box 
        flex="1" 
        bg="white" 
        p={6} 
        borderRadius="lg" 
        boxShadow="xl"
        backdropFilter="blur(10px)"
        bgColor="rgba(255, 255, 255, 0.9)"
      >
        <Heading size="md" mb={4} color="blue.600">
          Order Summary
        </Heading>
        <VStack spacing={3} align="stretch">
          <HStack justify="space-between">
            <Text color="gray.700">Subtotal:</Text>
            <Text fontWeight="bold" color="gray.800">₹{subtotal.toFixed(2)}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text color="gray.700">Estimated Tax (5%):</Text>
            <Text fontWeight="bold" color="gray.800">₹{estimatedTax.toFixed(2)}</Text>
          </HStack>
          <Divider borderColor="gray.300" />
          <HStack justify="space-between" fontSize="lg">
            <Text fontWeight="bold" color="gray.800">Total:</Text>
            <Text fontWeight="bold" color="green.500">
              ₹{total.toFixed(2)}
            </Text>
          </HStack>
          <Button
            onClick={() => handleSubmit(total.toFixed(2))}
            colorScheme="blue"
            w="full"
            mt={4}
            size="lg"
            _hover={{ transform: "translateY(-2px)", transition: "all 0.2s" }}
          >
            Proceed to Checkout
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Cart;
