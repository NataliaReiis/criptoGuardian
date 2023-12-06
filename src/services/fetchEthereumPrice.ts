import { CRYPTO_GUARDIAN } from "../constants";

export const fetchEthereumPrice = async () => {
  try {
    const response = await fetch(CRYPTO_GUARDIAN);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Ethereum price: ", error);
    throw error;
  }
};
