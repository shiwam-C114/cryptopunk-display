import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Flex,
    VStack,
} from '@chakra-ui/react';


export default function CryproPunckCard({ image, type, accessories }) {
    return (
        <Center py={12}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={-100}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}

                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${image})`,
                        filter: 'blur(15px)',
                        zIndex: -100,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        alt='cryptopunks'
                        rounded={'lg'}

                        width={282}
                        objectFit={'cover'}
                        src={image}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'md'} textTransform={'uppercase'}>
                        {type}
                    </Text>
                    <VStack direction={'row'} align={'center'}>
                        {/* <Text>
                        Accessories:
                       </Text> */}
                        <Flex direction={"column"}>
                            {
                                accessories.map((ele, i) => (
                                    <>
                                        <Text key={i} fontWeight={400} fontSize={'xl'}>
                                            {ele}
                                        </Text>
                                    </>
                                )
                                )


                            }
                        </Flex>
                    </VStack>
                </Stack>
            </Box>
        </Center>
    );
}