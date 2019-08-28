const assert = require('assert');
const Web3 = require('web3');
const hdWalletUtils = require('../hdWalletUtils');

describe('HdWalletUtils', () => {
    it('has the expected address', () => {
        assert.equal(hdWalletUtils.address, '0x0000000000000000000000000000000001000009');
    });

    it('has all the expected signatures', () => {
        assert.equal(hdWalletUtils.abi.length, 4);
    });

    it('builds a valid contract', () => {
        const client = new Web3();
        const hdWalletUtilsInstance = hdWalletUtils.build(client);
        assert.equal(hdWalletUtilsInstance instanceof client.eth.Contract, true);
    });
});
