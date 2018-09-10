// configure web3 here to do web3 stuffs
import Web3 from 'web3';
import env from '../env';
import SchoolChainCore from '../contracts/SchoolChainCore.json';
// setting up web3's provider with the network instance
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.getAccounts().then(console.log);

// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }


let schoolChainAbi = env.abi;

let schoolChainAddress = env.address;


web3.eth.defaultAccount = web3.eth.accounts[0]

// console.log(web3.eth);
const schoolChainContract = new web3.eth.Contract(schoolChainAbi, schoolChainAddress);

const defaultAccount = web3.eth.defaultAccount;

console.log(schoolChainContract)

const options = {
    contracts: [
      SchoolChainCore
    ]
}

export {schoolChainContract, defaultAccount, options};

