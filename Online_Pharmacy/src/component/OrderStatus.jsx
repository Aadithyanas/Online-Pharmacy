import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Progress,
  Container,
  Heading,
  Image,
  Badge,
  Divider,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaShippingFast,
  FaTruck,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const statusSteps = [
  { name: "Processing", icon: FaCheckCircle, description: "Order is being processed" },
  { name: "Shipped", icon: FaShippingFast, description: "Order has been shipped" },
  { name: "Out for Delivery", icon: FaTruck, description: "Order is out for delivery" },
  { name: "Delivered", icon: FaBoxOpen, description: "Order has been delivered" },
];

const OrderStatus = () => {
  const [order, setOrder] = useState(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const [estimatedDelivery, setEstimatedDelivery] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  // Fetch order details from localStorage and Firebase
  useEffect(() => {
    // Get order details from localStorage
    const orderKeys = Object.keys(localStorage).filter(key => key.startsWith('order_'));
    if (orderKeys.length > 0) {
      const latestOrderKey = orderKeys[orderKeys.length - 1];
      const parsedOrder = JSON.parse(localStorage.getItem(latestOrderKey));
      setOrder(parsedOrder);
      
      // Calculate estimated delivery time
      const orderDate = new Date(parsedOrder.orderDate);
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days delivery
      setEstimatedDelivery(deliveryDate.toLocaleDateString());
    } else {
      toast({
        title: "No Order Found",
        description: "Please place an order first",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    }

    // Get status from Firebase
    axios
      .get("https://userstatus-9db86-default-rtdb.firebaseio.com/status.json")
      .then((response) => {
        const data = response.data;
        if (data) {
          const latestTransaction = Object.values(data).pop();
          setOrder(prevOrder => ({
            ...prevOrder,
            ...latestTransaction
          }));
        }
      })
      .catch((error) => console.error("Error fetching status: ", error));
  }, [navigate, toast]);

  // Simulate Order Progression (Every 5 Seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prevIndex) =>
        prevIndex < 3 ? prevIndex + 1 : prevIndex
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (!order) {
    return (
      <Container maxW="lg" py={8}>
        <Box textAlign="center">
          <Heading size="lg" mb={4}>Loading Order Details...</Heading>
          <Button colorScheme="blue" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="lg" py={8}>
      <Heading size="lg" textAlign="center" mb={6}>
        Order Status
      </Heading>

      <Box
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="md"
        mb={6}
      >
        <VStack spacing={4} align="stretch">
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Order Details
            </Text>
            <HStack justify="space-between">
              <Text>Order ID:</Text>
              <Text fontWeight="bold">{order.trackingId}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Transaction ID:</Text>
              <Text fontWeight="bold">{order.transactionId}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Amount:</Text>
              <Text fontWeight="bold">₹{order.amount}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Order Date:</Text>
              <Text fontWeight="bold">{new Date(order.orderDate).toLocaleDateString()}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Estimated Delivery:</Text>
              <Text fontWeight="bold">{estimatedDelivery}</Text>
            </HStack>
          </Box>

          <Divider />

          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Order Items
            </Text>
            {order.items?.map((item) => (
              <HStack key={item.id} justify="space-between" mb={2}>
                <HStack>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    boxSize="40px"
                    borderRadius="md"
                    objectFit="cover"
                  />
                  <Box>
                    <Text fontWeight="medium">{item.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      Brand: {item.brand}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Quantity: {item.quantity}
                    </Text>
                  </Box>
                </HStack>
                <Text fontWeight="bold">₹{item.price * item.quantity}</Text>
              </HStack>
            ))}
          </Box>

          <Divider />

          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Delivery Information
            </Text>
            <HStack mb={2}>
              <Icon as={FaMapMarkerAlt} />
              <Text>{order.deliveryAddress}</Text>
            </HStack>
            <HStack mb={2}>
              <Icon as={FaPhone} />
              <Text>{order.phoneNumber}</Text>
            </HStack>
            <HStack>
              <Icon as={FaEnvelope} />
              <Text>{order.email}</Text>
            </HStack>
          </Box>
        </VStack>
      </Box>

      <VStack spacing={6} mt={8}>
        {statusSteps.map((step, index) => (
          <MotionBox
            key={index}
            display="flex"
            alignItems="center"
            gap={4}
            p={4}
            w="full"
            bg={index <= statusIndex ? "green.100" : "gray.100"}
            borderRadius="md"
            boxShadow="md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Icon
              as={step.icon}
              boxSize={6}
              color={index <= statusIndex ? "green.500" : "gray.500"}
            />
            <Box flex="1">
              <Text
                fontWeight="bold"
                color={index <= statusIndex ? "green.600" : "gray.600"}
              >
                {step.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {step.description}
              </Text>
            </Box>
            {index <= statusIndex && (
              <Badge colorScheme="green">Completed</Badge>
            )}
          </MotionBox>
        ))}
      </VStack>

      <Progress
        value={(statusIndex + 1) * 25}
        size="lg"
        colorScheme="green"
        mt={6}
        borderRadius="md"
      />

      <Box textAlign="center" mt={6}>
        <Button colorScheme="blue" onClick={handleContinueShopping}>
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default OrderStatus;
