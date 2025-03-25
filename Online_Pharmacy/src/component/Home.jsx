/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  Badge,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaTruck,
  FaClock,
  FaPhoneAlt,
  FaPrescription,
  FaPercent,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tesseract from "tesseract.js";
import Footer from "./Footer";
import { UserContext } from "../context/UserContext";
import UUpload from "./UUpload";

const MotionBox = motion(Box);

const Home = () => {
  const { handleUserLogin, userlogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgGradient = useColorModeValue(
    "linear(to-r, blue.50, white, green.50)",
    "linear(to-r, blue.900, gray.800, green.900)"
  );

  const handleImageUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      handleOCR(uploadedFile);
    }
  };

  const handleOCR = (image) => {
    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setExtractedText(text);
        toast({
          title: "OCR Completed",
          description: "The prescription text has been extracted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "OCR Failed",
          description: "There was an issue processing the image.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error(error);
      });
  };
  function handleBrowser() {
    userlogin ? navigate("/dashboard") : navigate("/Login");
  }
  return (
    <Box>
      {/* Hero Section */}
      <Box bg={bgGradient} minH="600px" position="relative" overflow="hidden">
        <Container maxW="container.xl" pt={20}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
            <VStack align="flex-start" spacing={6} pt={10}>
              <Badge
                colorScheme="green"
                fontSize="md"
                px={4}
                py={2}
                rounded="full"
              >
                24/7 Healthcare Support
              </Badge>
              <Heading
                size="2xl"
                color={useColorModeValue("gray.700", "white")}
                lineHeight="shorter"
              >
                Your Trusted Online
                <Text
                  as="span"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  bgClip="text"
                  fontWeight="extrabold"
                >
                  {" "}
                  Pharmacy Partner
                </Text>
              </Heading>
              <Text
                fontSize="xl"
                color={useColorModeValue("gray.600", "gray.300")}
                maxW="600px"
              >
                Get your medications delivered right to your doorstep.
                Professional care and support available around the clock.
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
                <Button
                  onClick={() => handleBrowser()}
                  size="lg"
                  colorScheme="teal"
                  rightIcon={<FaSearch />}
                >
                  Browse Medicines
                </Button>
                <Button
                  onClick={onOpen}
                  size="lg"
                  variant="outline"
                  colorScheme="blue"
                  rightIcon={<FaPrescription />}
                >
                  Upload Prescription
                </Button>
              </Stack>
            </VStack>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              display={{ base: "none", md: "block" }}
            >
              <Image
                src="https://ik.imagekit.io/m9qnay09g/pharmasy-ilust-removebg-preview.png?updatedAt=1738835059755"
                alt="Medical Illustration"
                w="full"
                h="auto"
                objectFit="cover"
                rounded="2xl"
              />
            </MotionBox>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg={useColorModeValue("white", "gray.800")}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <FeatureCard
              icon={FaTruck}
              title="Free Delivery"
              description="Free shipping on orders above $50"
              color="blue"
            />
            <FeatureCard
              icon={FaClock}
              title="24/7 Support"
              description="Round the clock customer service"
              color="green"
            />
            <FeatureCard
              icon={FaPercent}
              title="Best Prices"
              description="Competitive prices on all products"
              color="purple"
            />
            <FeatureCard
              icon={FaPhoneAlt}
              title="Expert Consultation"
              description="Professional pharmacist consultation"
              color="red"
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Popular Categories */}
      <Box py={20} bg={useColorModeValue("gray.50", "gray.900")}>
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Heading
              textAlign="center"
              size="xl"
              color={useColorModeValue("gray.700", "white")}
            >
              Popular Categories
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={8}>
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      {/* <Box py={20} bg={useColorModeValue("white", "gray.800")}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            bg="teal.500"
            p={10}
            rounded="2xl"
            color="white"
          >
            <VStack align="flex-start" spacing={4}>
              <Heading size="lg">Download Our Mobile App</Heading>
              <Text fontSize="lg">
                Get exclusive offers and manage your prescriptions on the go
              </Text>
            </VStack>
            <Button
              size="lg"
              colorScheme="white"
              variant="outline"
              mt={{ base: 6, md: 0 }}
              _hover={{ bg: "whiteAlpha.200" }}
            >
              Get the App
            </Button>
          </Flex>
        </Container>
      </Box> */}

      {/* Upload Prescription Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Upload Prescription Image</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            {/* <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              mb={4}
            /> */}
            <UUpload />
            {/* {file && (
              <Box>
                <Text fontSize="lg" mb={4}>
                  Extracted Text:
                </Text>
                <Box
                  border="1px solid"
                  borderColor="gray.300"
                  p={4}
                  rounded="md"
                  minH="100px"
                  overflowY="auto"
                >
                  <pre>{extractedText}</pre>
                </Box>
              </Box>
            )} */}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
};

const FeatureCard = ({ icon, title, description, color }) => (
  <VStack
    p={8}
    bg={useColorModeValue("white", "gray.700")}
    rounded="xl"
    shadow="lg"
    textAlign="center"
    spacing={4}
    _hover={{ transform: "translateY(-5px)" }}
    transition="all 0.3s"
  >
    <Icon as={icon} w={10} h={10} color={`${color}.400`} />
    <Heading size="md" color={useColorModeValue("gray.700", "white")}>
      {title}
    </Heading>
    <Text color={useColorModeValue("gray.600", "gray.300")}>{description}</Text>
  </VStack>
);

const CategoryCard = ({ title, image, count }) => (
  <VStack
    p={6}
    bg={useColorModeValue("white", "gray.700")}
    rounded="xl"
    shadow="md"
    spacing={4}
    cursor="pointer"
    _hover={{ transform: "translateY(-5px)" }}
    transition="all 0.3s"
  >
    <Image
      src={image}
      alt={title}
      w="90%"
      h="100px"
      // rounded="full"
      objectFit="cover"
    />
    <Heading size="sm" color={useColorModeValue("gray.700", "white")}>
      {title}
    </Heading>
    <Badge colorScheme="teal">{count} items</Badge>
  </VStack>
);

const categories = [
  {
    title: "Prescription Drugs",
    count: "1000+",
    image:
      "https://s3.amazonaws.com/thumbnails.illustrationsource.com/huge.16.83013.JPG",
  },
  {
    title: "Healthcare Devices",
    count: "500+",
    image:
      "https://cdni.iconscout.com/illustration/premium/thumb/healthcare-equipment-illustration-download-in-svg-png-gif-file-formats--medical-pattern-first-aid-kit-medicine-doctor-pharmacy-pregnancy-pack-people-illustrations-4494350.png",
  },
  {
    title: "Personal Care",
    count: "800+",
    image:
      "https://media.istockphoto.com/id/1291270019/vector/gift-set-of-organic-cosmetics-for-women-various-bottles-tubes-and-jars-for-skincare-female.jpg?s=612x612&w=0&k=20&c=sfZ2Ihgi7H7CsF2yWIAavHF_7I_c_A1I9j8qqakjvlM=",
  },
  {
    title: "Vitamins & Supplements",
    count: "600+",
    image:
      "https://thumbs.dreamstime.com/b/dietary-supplements-variety-pills-vitamin-capsules-d-34701589.jpg ",
  },
  {
    title: "Baby Care",
    count: "400+",
    image:
      " https://media.vyaparify.com/vcards/products/3691/Jain-medical-Baby-product-.jpg",
  },
  {
    title: "Wellness",
    count: "700+",
    image:
      " https://thumbs.dreamstime.com/b/beauty-wellness-products-isolated-simple-background-35499098.jpg",
  },
  {
    title: "Ayurvedic",
    count: "300+",
    image:
      "https://cdni.iconscout.com/illustration/premium/thumb/ayurvedic-beauty-product-illustration-download-in-svg-png-gif-file-formats--school-salon-cosmetic-applying-makeup-and-health-pack-illustrations-6679884.png ",
  },
  {
    title: "COVID Essentials",
    count: "100+",
    image:
      " https://img.freepik.com/free-vector/virus-equipment-protection-collection_23-2148505981.jpg",
  },
];

export default Home;
