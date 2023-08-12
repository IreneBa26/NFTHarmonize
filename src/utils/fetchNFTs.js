const axios = require('axios');

// Go to www.alchemy.com and create an account to grab your own api key!
const apiKey = "RVakgtAN1cOw89v5ZlSrVJ1jSFQyzRug";
const endpoint = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;

/* export const fetchNFTs = async (owner, contractAddress, setNFTs, retryAttempt) => {
    if (retryAttempt === 5) {
        return;
    }
    if (owner) {
        let data;
        try {
            if (contractAddress) {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
            } else {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(data => data.json())
            }
        } catch (e) {
            fetchNFTs(endpoint, owner, contractAddress, setNFTs, retryAttempt + 1)
        }

        setNFTs(data.ownedNfts)
        return data
    }
} */

export const fetchNFTs = async (owner, contractAddress, setNFTs, retryAttempt, chainID) => {
    if (retryAttempt === 5) {
        return;
    }
    let path;
    let apiKey;
    // if chain is goerli
    if (chainID === 5) {
        path = process.env.REACT_APP_GATEWAY_GOERLI_RPC;
        apiKey = process.env.REACT_APP_GATEWAY_GOERLI_API_KEY;
    } // else if chain is mumbai
    else if (chainID === 80001) {
        path = process.env.REACT_APP_GATEWAY_MUMBAI_RPC;
        apiKey = process.env.REACT_APP_GATEWAY_MUMBAI_API_KEY;
    }
    // else if chain is polygon zkEvm
    else if (chainID === 80001) {
        path = process.env.REACT_APP_GATEWAY_ZKEVM_RPC;
        apiKey = process.env.REACT_APP_GATEWAY_ZKEVM_API_KEY;
    }

    if (owner) {
        let data;

        const headers = {
            'Content-Type': 'application/json'
        }

        const params = {
            jsonrpc: "2.0",
            id: "0",
            method: "eth_blockNumber"
        }

        try {
            if (contractAddress) {
                data = await axios.post(`${path}?apiKey=${apiKey}`, params, headers)
                console.log("Data: ", data);

                data = await fetch(`${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`).then(data => data.json())
            } else {
                data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then(data => data.json())
            }
        } catch (e) {
            fetchNFTs(endpoint, owner, contractAddress, setNFTs, retryAttempt + 1)
        }

        setNFTs(data.ownedNfts)
        return data
    }
}
