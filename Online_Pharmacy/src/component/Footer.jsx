// Footer.jsx
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  HStack,
  Icon,
  Input,
  Button,
  Divider,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    <Box bg={useColorModeValue("black", "black")} pt={12} pb={6}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} mb={8}>
          {/* Company Info */}
          <VStack align="start" spacing={4}>
            <Text color="white" fontWeight="bold" fontSize="lg" mb={2}>
              About Us
            </Text>
            <Text color="white" fontSize="sm" mb={4}>
              Your trusted pharmacy partner providing quality healthcare
              products and services nationwide.
            </Text>
            <HStack spacing={4}>
              <Icon
                color="white"
                as={Facebook}
                w={5}
                h={5}
                // color="gray.600"
                cursor="pointer"
                _hover={{ color: "blue.500" }}
              />
              <Icon
                as={Twitter}
                w={5}
                h={5}
                color="white"
                cursor="pointer"
                _hover={{ color: "blue.400" }}
              />
              <Icon
                as={Instagram}
                w={5}
                h={5}
                color="white"
                cursor="pointer"
                _hover={{ color: "pink.500" }}
              />
              <Icon
                as={Linkedin}
                w={5}
                h={5}
                color="white"
                cursor="pointer"
                _hover={{ color: "blue.700" }}
              />
            </HStack>
          </VStack>

          {/* Quick Links */}
          <VStack align="start" spacing={2}>
            <Text color="white" fontWeight="bold" fontSize="lg" mb={2}>
              Quick Links
            </Text>
            <Text color="white" cursor="pointer" _hover={{ color: "blue.500" }}>
              Shop
            </Text>
            <Text color="white" cursor="pointer" _hover={{ color: "blue.500" }}>
              Prescriptions
            </Text>
            <Text color="white" cursor="pointer" _hover={{ color: "blue.500" }}>
              Healthcare Devices
            </Text>
            <Text color="white" cursor="pointer" _hover={{ color: "blue.500" }}>
              Offers
            </Text>
            <Text color="white" cursor="pointer" _hover={{ color: "blue.500" }}>
              Blog
            </Text>
          </VStack>

          {/* Contact Info */}
          <VStack align="start" spacing={3}>
            <Text color="white" fontWeight="bold" fontSize="lg" mb={2}>
              Contact Us
            </Text>
            <HStack>
              <Icon as={Phone} w={4} h={4} color="white" />
              <Text color="white">1-800-PHARMA</Text>
            </HStack>
            <HStack>
              <Icon as={Mail} w={4} h={4} color="white" />
              <Text color="white">support@pharmacy.com</Text>
            </HStack>
            <HStack>
              <Icon as={MapPin} w={4} h={4} color="white" />
              <Text color="white">123 Health Street, Med City</Text>
            </HStack>
          </VStack>

          {/* Newsletter */}
          <VStack align="start" spacing={4}>
            <Text color="white" fontWeight="bold" fontSize="lg" mb={2}>
              Newsletter
            </Text>
            <Text color="white" fontSize="sm">
              Subscribe to receive updates and exclusive offers
            </Text>
            <Stack direction="row" w="full">
              <Input placeholder="Email" />
              <Button colorScheme="blue">Subscribe</Button>
            </Stack>
          </VStack>
        </SimpleGrid>

        {/* Trust Badges */}
        <Box mt={8} mb={6}>
          <SimpleGrid
            columns={{ base: 1, sm: 3 }}
            spacing={4}
            maxW="3xl"
            mx="auto"
          >
            <HStack justify="center">
              <Icon as={Shield} w={5} h={5} color="green.500" />
              <Text fontSize="sm" color="white">
                Secure Payment
              </Text>
            </HStack>
            <HStack justify="center">
              <Icon as={CreditCard} w={5} h={5} color="blue.500" />
              <Text fontSize="sm" color="white">
                Multiple Payment Options
              </Text>
            </HStack>
            <HStack justify="center">
              <Icon as={Clock} w={5} h={5} color="purple.500" />
              <Text fontSize="sm" color="white">
                24/7 Support
              </Text>
            </HStack>
          </SimpleGrid>
        </Box>

        <Divider my={6} />

        {/* Bottom Bar */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          fontSize="sm"
          color="white"
        >
          <Text>© 2025 Your Pharmacy. All rights reserved.</Text>
          <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            <Text cursor="pointer" _hover={{ color: "blue.500" }}>
              Privacy Policy
            </Text>
            <Text cursor="pointer" _hover={{ color: "blue.500" }}>
              Terms of Service
            </Text>
            <Text cursor="pointer" _hover={{ color: "blue.500" }}>
              Shipping Policy
            </Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
