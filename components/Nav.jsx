import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Heading,
    Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { useRouter } from 'next/router';


export default function Nav() {
    const { address, connector, isConnected } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
    const { data: ensName } = useEnsName({ address })
    const { disconnect } = useDisconnect()
    const { push } = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    
                    <Heading size={"lg"}>CryptoPunk Display</Heading>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={ensAvatar ?
                                            {ensAvatar} :
                                            'https://avatars.dicebear.com/api/male/username.svg'}
                                    />
                                </MenuButton>
                                {
                                    isConnected?
                                    <MenuList  alignItems={'center'}>
                                        <br />
                                        <Center>
                                            <Avatar
                                                size={'2xl'}
                                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                                            />
                                        </Center>
                                        <br />
                                        <Center>
                                            <Text>{ensName ? `${ensName} (${address})` : address}</Text>
                                        </Center>
                                        <Text>Connected to {connector?.name}</Text>
                                        <br />
                                        <MenuDivider />
                                            <MenuItem onClick={() => {
                                                disconnect()
                                                push("/signin")
                                             } }>Disconnect</MenuItem>
                                    </MenuList>:null
                                }
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}