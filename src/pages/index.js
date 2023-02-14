import { useState } from "react";
const axios = require('axios')
export default function Home() {
  const [fileImg, setFileImg] = useState(null);
  const sendFileToIPFS = async () => {

    if (fileImg) {
        try {

            const formData = new FormData();
            formData.append("file", fileImg);

            const resFile = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': "e7c72c31c2b9e785ccd4",
                    'pinata_secret_api_key': "bbe57b2596e0c137a64dbda5ef1e8a4799dd092e3516d569158eb4a0304315e2",
                    "Content-Type": "multipart/form-data"
                },
            });

            const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
         console.log(ImgHash);   
        } catch (error) {
            console.log("Error sending File to IPFS: ")
            console.log(error)
        }
    }
}
return(<>
  <input type="file" onChange={(e) =>setFileImg(e.target.files[0])}/>
  <button onClick={sendFileToIPFS} >Mint NFT</button>            
  </>
  )
}
