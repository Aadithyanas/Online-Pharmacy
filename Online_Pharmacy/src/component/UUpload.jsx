import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

function UUpload() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFileUrl(objectUrl);
    }
  }, [file]);

  function handleInput(event) {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      if (
        !["image/png", "image/jpeg", "image/jpg"].includes(uploadedFile.type)
      ) {
        toast({
          title: "Invalid File Type",
          description: "Only PNG and JPG images are allowed.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (uploadedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "File size must be less than 5MB.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setFile(uploadedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      handleInput({ target: { files: [droppedFile] } });
    }
  }

  return (
    <Flex
      justify="center"
      align="center"
      minH="50vh"
      w="100%"
      bg="gray.100"
      p={6}
    >
      <VStack spacing={6} w="100%" maxW="500px">
        {/* File Upload Box */}
        <Box
          as="label"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          w="100%"
          p={6}
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="lg"
          bg="white"
          cursor="pointer"
          _hover={{ borderColor: "blue.400", bg: "gray.50" }}
          transition="all 0.3s"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            style={{ display: "none" }}
            onChange={handleInput}
          />
          <Icon as={FiUploadCloud} boxSize={10} color="blue.400" />
          <Text fontWeight="medium" color="gray.700" mt={2}>
            Click or Drag & Drop to Upload
          </Text>
          <Text fontSize="sm" color="gray.500">
            Only PNG, JPG (Max 5MB)
          </Text>
        </Box>

        {/* File Preview */}
        {file && (
          <Image
            src={fileUrl}
            alt="Uploaded Preview"
            borderRadius="lg"
            boxShadow="lg"
            maxH="300px"
            objectFit="cover"
          />
        )}
      </VStack>
    </Flex>
  );
}

export default UUpload;
