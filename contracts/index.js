import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider('https://arb1.arbitrum.io/rpc'))

const funcSig = web3.eth.abi.encodeFunctionSignature('approve(address,uint256)')

const owner = '0x2faf8ab2b9ac8Bd4176A0B9D31502bA3a59B4b41'  // owner
const address = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
const ABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const tokenContract = new web3.eth.Contract(ABI, address);
const approveTx = tokenContract.methods.approve(
    owner,
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);
const encodedApproveTx = approveTx.encodeABI();

console.log(funcSig)
console.log(encodedApproveTx)
