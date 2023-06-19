const API_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcyZTI4OTRDQkJGMjVCYjYwQTg5NzdlMDZDQjMxRDgwZjIyOTA0MjEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NzAyNTQ1Mjc5NiwibmFtZSI6IlNlY29uZCBIYW5kIENoYWluIn0._APivr845oRBHM0dTs2VU55eQ3blfhUB1qDivUqLsjk"

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

    console.log("Saved")
    console.log(metadata.url)
    return metadata.url
}

export default nftStorage





