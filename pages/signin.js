import {useAccount, useConnect} from 'wagmi'
import {
    Button,
    Flex,
    Heading,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Nav from '../components/Nav';

function SignIn() {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { push } = useRouter();
    const { isConnected } = useAccount();
    useEffect(() => {
      if (isConnected) {
        push("/display")
      }
    }, [isConnected])
    
    return (
        <div>
            <Nav />
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                        Connect to see CryptoPunks.
                    </Heading>
                    <Stack p={"10px 0"} spacing={6}>
                        {connectors.map((connector) => (
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                disabled={!connector.ready}
                                key={connector.id}
                                onClick={() => connect({ connector })}
                            >
                                Connect with {connector.name}.
                                {!connector.ready && ' (unsupported)'}
                                {isLoading &&
                                    connector.id === pendingConnector?.id &&
                                    ' (connecting)'}

                            </Button>
                        ))}
                      
                    </Stack>
                </Stack>
            </Flex>

            {error && <div>{error.message}</div>}
        </div>
    );
}

export default SignIn;
