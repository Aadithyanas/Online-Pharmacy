import { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Container,
  Heading,
  Image,
  Badge,
  Divider,
  Button,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Get all orders from localStorage
    const allOrders = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('order_')) {
        const order = JSON.parse(localStorage.getItem(key));
        allOrders.push(order);
      }
    }
    setOrders(allOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
  }, []);

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (orders.length === 0) {
    return (
      <Container maxW="lg" py={8}>
        <Box textAlign="center">
          <Heading size="lg" mb={4}>No Orders Found</Heading>
          <Text mb={4}>You haven't placed any orders yet.</Text>
          <Button colorScheme="blue" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading size="lg" textAlign="center" mb={6}>
        Your Orders
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {orders.map((order) => (
          <MotionBox
            key={order.trackingId}
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={4} align="stretch">
              <Box>
                <HStack justify="space-between" mb={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    Order #{order.trackingId.slice(0, 8)}
                  </Text>
                  <Badge colorScheme="green">{order.status}</Badge>
                </HStack>
                <HStack justify="space-between">
                  <Text>Amount:</Text>
                  <Text fontWeight="bold">₹{order.amount}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Order Date:</Text>
                  <Text fontWeight="bold">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </Text>
                </HStack>
              </Box>

              <Divider />

              <Box>
                <Text fontSize="md" fontWeight="bold" mb={2}>
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
                <Text fontSize="md" fontWeight="bold" mb={2}>
                  Delivery Information
                </Text>
                <HStack mb={2}>
                  <Icon as={FaMapMarkerAlt} />
                  <Text fontSize="sm">{order.deliveryAddress}</Text>
                </HStack>
                <HStack mb={2}>
                  <Icon as={FaPhone} />
                  <Text fontSize="sm">{order.phoneNumber}</Text>
                </HStack>
                <HStack>
                  <Icon as={FaEnvelope} />
                  <Text fontSize="sm">{order.email}</Text>
                </HStack>
              </Box>
            </VStack>
          </MotionBox>
        ))}
      </SimpleGrid>

      <Box textAlign="center" mt={6}>
        <Button colorScheme="blue" onClick={handleContinueShopping}>
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
};

export default Orders; 