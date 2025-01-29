import axios from "axios";

const pinataApiKey = "	a92c3392378dcb7fa792";
const pinataSecretApiKey =
  "5f997c35cfeb6f24e5accf75c82fd1e25e1ed95bff164459d85ceb7eedf58285";

const pinataBaseUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  console.log("API Key:", pinataApiKey);
  console.log("API Secret:", pinataSecretApiKey);

  try {
    const res = await axios.post(pinataBaseUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  } catch (error) {
    console.error(
      "Pinata upload error:",
      error.response?.data || error.message
    );
    throw error;
  }
}