const abi = require('./abis/hdWalletUtils.json');
const ADDRESS = '0x0000000000000000000000000000000001000009';

module.exports = {
    abi: abi,
    address: ADDRESS,
    build: (client) => new client.eth.Contract(abi, ADDRESS)
};
