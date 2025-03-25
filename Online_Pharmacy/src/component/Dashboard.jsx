/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Grid,
  // VStack,
  HStack,
  Text,
  Input,
  Select,
  Button,
  Image,
  Heading,
  Badge,
  Icon,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  // useDisclosure,
  // FormControl,
  // FormLabel,
  useToast,
  Spinner,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch, FaStar, FaShoppingCart } from "react-icons/fa";
// import { FaSearch, FaPlus, FaStar, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../context/CartContext"; // Import Cart Context

const PharmacyDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // New Medicine Form State
  // const [newMedicine, setNewMedicine] = useState({
  //   name: "",
  //   brand: "",
  //   category: "",
  //   price: "",
  //   description: "",
  // });

  // Fetch Medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          "https://medicine-559fb-default-rtdb.firebaseio.com/medicine.json"
        );
        const medicineData = response.data ? Object.values(response.data) : [];
        setMedicines(medicineData);
        setFilteredMedicines(medicineData);
        setIsLoading(false);
      } catch (error) {
        toast({
          title: `Error fetching medicines ${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  // Search and Filter
  useEffect(() => {
    let result = medicines;

    if (searchTerm) {
      result = result.filter(
        (med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          med.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter((med) => med.category === categoryFilter);
    }

    setFilteredMedicines(result);
  }, [searchTerm, categoryFilter, medicines]);

  // Get Unique Categories
  const categories = [...new Set(medicines.map((med) => med.category))];
  const { addToCart } = useCart();
  // Add to cart
  function handleAddToCart(medicine) {
     toast({
       title: "Item Added",
       description: "Item Add to Cart",
       status: "success",
       duration: 900,
       isClosable: true,
       position: "top-right", // Set position here
     });
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: 1,
      img: medicine.imageUrl,
    });
  }

  // Add Medicine Handler
  // const handleAddMedicine = async () => {
  //   try {
  //     // Add validation
  //     if (!newMedicine.name || !newMedicine.brand || !newMedicine.category) {
  //       toast({
  //         title: "Validation Error",
  //         description: "Please fill all required fields",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //       return;
  //     }

  //     // Add to Firebase (you'd need to implement proper backend logic)
  //     await axios.post(
  //       "https://onlinepharmacy-cb0e3-default-rtdb.firebaseio.com/Medicine.json",
  //       newMedicine
  //     );

  //     toast({
  //       title: "Medicine Added",
  //       description: "New medicine added successfully",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });

  //     // Reset form and close modal
  //     setNewMedicine({
  //       name: "",
  //       brand: "",
  //       category: "",
  //       price: "",
  //       description: "",
  //     });
  //     // onClose();
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: `Could not add medicine ${error}`,
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  // Medicine Card Component
  const MedicineCard = ({ medicine }) => (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "xl",
      }}
      bg="white"
    >
      <Image
        src={medicine.imageUrl}
        alt={medicine.name}
        h="200px"
        w="full"
        objectFit="contain"
      />
      <Box p={4}>
        <HStack justify="space-between" mb={2}>
          <Heading size="sm">{medicine.name}</Heading>
          <Badge colorScheme={medicine.prescriptionRequired ? "red" : "green"}>
            {medicine.prescriptionRequired ? "Rx" : "OTC"}
          </Badge>
        </HStack>
        <Text fontSize="sm" color="gray.500" mb={2}>
          {medicine.brand} | {medicine.category}
        </Text>
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaStar} color="yellow.400" />
            <Text fontWeight="bold">{medicine.ratings}</Text>
          </HStack>
          <HStack>
            <Text
              fontWeight="bold"
              color="green.500"
              textDecoration={medicine.discount > 0 ? "line-through" : "none"}
            >
              ₹{medicine.price}
            </Text>
            {medicine.discount > 0 && (
              <Text fontWeight="bold" color="red.500">
                ₹{(medicine.price * (1 - medicine.discount / 100)).toFixed(2)}
              </Text>
            )}
          </HStack>
        </HStack>
        <Button
          onClick={()=> handleAddToCart(medicine)}
          mt={4}
          w="full"
          colorScheme="blue"
          leftIcon={<FaShoppingCart />}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box bg="gray.50" minH="100vh" p={8}>
      <Flex
        direction={{ base: "column", md: "row" }}
        mb={8}
        align="center"
        justify="space-between"
      >
        <Heading
          bgGradient="linear(to-r, blue.400, purple.500)"
          bgClip="text"
          mb={{ base: 4, md: 0 }}
        >
          {/* Online Pharmacy */}
        </Heading>

        <HStack spacing={4} w={{ base: "full", md: "auto" }}>
          <InputGroup flex={1}>
            <InputLeftElement>
              <FaSearch />
            </InputLeftElement>
            <Input
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Select
            placeholder="Filter Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            w="200px"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          {/* <Button colorScheme="green" leftIcon={<FaPlus />} onClick={onOpen}>
            Add Medicine
          </Button> */}
        </HStack>
      </Flex>

      {isLoading ? (
        <Flex justify="center" align="center" h="500px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {filteredMedicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </Grid>
      )}

      {/* Add Medicine Modal */}
      {/* <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Medicine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Medicine Name</FormLabel>
                <Input
                  value={newMedicine.name}
                  onChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Brand</FormLabel>
                <Input
                  value={newMedicine.brand}
                  onChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      brand: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  value={newMedicine.category}
                  onChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      category: e.target.value,
                    })
                  }
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={newMedicine.price}
                  onChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      price: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  value={newMedicine.description}
                  onChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddMedicine}>
              Save Medicine
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
      
    </Box>
  );
};

export default PharmacyDashboard;
