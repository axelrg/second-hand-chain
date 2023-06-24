const API_KEY= import.meta.env.VITE_NFT_STORAGE_API_KEY

import { NFTStorage } from 'nft.storage'

interface Phone{
    model :string
    brand :string
    imei : string
    colour :string
    ram : string
    mem: string
    salePrice : string
    price : string
    image : File
}

const nftStorage = async (phone: Phone) => {
    const client = new NFTStorage({ token: API_KEY })
    const imageFile = new File([ phone.image ], 'nft.png', { type: 'image/png' })
    client
    
    const metadata = await client.store({
        name: 'Phone NFT Metadata',
        description: "SCH NFT Metadata",
        image: imageFile,
        properties: {
            name: {
                type: "string",
                description: phone.brand
            },
            description: {
                type: "string",
                description: phone.model
            },
            image: {
                type: "string",
                description: imageFile
            }
        }
    })
    return metadata.url
}

export default nftStorage





