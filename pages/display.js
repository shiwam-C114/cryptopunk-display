import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Center, Grid, GridItem } from '@chakra-ui/react'
import CryproPunckCard from '../components/Card'
import Nav from '../components/Nav'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'

function Display() {
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(21)
    const { isConnected } = useAccount();
    const { push } = useRouter();


    useEffect(() => {

        // if not connected wallet navigate to index 
        if (!isConnected) {
            push("/")
        }
        getCryptopunk()
    }, [isConnected])


    //  function to get meta-data of cryptopunks .
    //  getting the data from a free hosted server which only have image, gender(type), accessories
    async function getCryptopunk() {
        let response = await axios.get('https://cryptopunks.herokuapp.com/api/punks/')
        response = response.data
        setData(response)
    }


    return (
        <>
            <Nav />
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {
                    data?.map((ele, i) => {
                        return <>{
                            // limiting the number of cards in a page
                            (i < limit) ?
                                <GridItem >
                                    <CryproPunckCard key={i} image={ele?.image} accessories={ele?.accessories} type={ele?.type} />
                                </GridItem> : null
                        }
                        </>
                    })
                }
            </Grid>
            <Center>

                <Button
                    // updateing card in a page in multiples of 21
                    onClick={() => { setLimit(prev => prev + 21) }}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500',
                    }}
                    m={6}
                >next</Button>
            </Center>
        </>
    )
}

export default Display