const assert = require('assert');
const Web3 = require('web3');
const bridge = require('../bridge');

describe('Bridge', () => {
    it('has the expected address', () => {
        assert.equal(bridge.address, '0x0000000000000000000000000000000001000006');
    });

    it('has all the expected signatures', () => {
        assert.equal(bridge.abi.length, 39);
    });

    it('builds a valid contract', () => {
        const client = new Web3();
        const bridgeInstance = bridge.build(client);
        assert.equal(bridgeInstance instanceof client.eth.Contract, true);
    });
});
