// configure web3 here to do web3 stuffs
import Web3 from 'web3';
import env from '../env';
import SchoolChainCore from '../contracts/SchoolChainCore.json';

// setting up web3's provider with the network instance
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const web3 = new Web3('ws://localhost:8545');
web3.eth.getAccounts().then(console.log);

// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }
// let schoolChainAbi = env.abi;

// let schoolChainAddress = env.address;


// web3.eth.defaultAccount = web3.eth.accounts[0]

const defaultWeb3 = web3;

const schoolChainContract = new web3.eth.Contract(SchoolChainCore.abi, '0xd8c529f8018e0d7b5efd479394aa8854966c299a');
// '0x50a555bb6640c3b3b05876c218d223f4031a5b94'
const options = {
    contracts: [
      SchoolChainCore
    ]
}

export {schoolChainContract, options, defaultWeb3};
