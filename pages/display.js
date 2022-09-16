import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Center, Grid, GridItem } from '@chakra-ui/react'
import CryproPunckCard from '../components/Card'
import Nav from '../components/Nav'

function Display() {
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(21) 

    useEffect(() => {
        getCryptopunk()
    }, [])
    
    async function getCryptopunk() {
            axios.get('https://cryptopunks.herokuapp.com/api/punks/').then(res => {
            console.log(res);
            setData(res.data)
        })
        
    }


    return (
        <>
            <Nav />
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {
                    data?.map((ele, i ) => {
                        return <>{
                                i<limit?
                            <GridItem>
                                <CryproPunckCard key={i} image={ele?.image} accessories={ele?.accessories} type={ele?.type} />
                            </GridItem>:null
                            }
                        </>
                    })
                }
            </Grid>
            <Center>

                <Button

                onClick={()=>{setLimit(prev=>prev+21)}}
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