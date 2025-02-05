const assert = require('assert');
const ethers = require('ethers');
const bridge = require('../bridge');

const networkUrl = 'https://public-node.rsk.co/';

describe('Bridge', () => {
    it('has the expected address', () => {
        assert.equal(bridge.address, '0x0000000000000000000000000000000001000006');
    });

    it('has all the expected signatures', () => {
        assert.equal(bridge.abi.length, 83);
    });

    it('should build the bridge contract with Ethers', () => {

        const provider = new ethers.JsonRpcProvider(networkUrl);
        const bridgeContract = new ethers.Contract(bridge.address, bridge.abi, provider);
        assert.equal(bridgeContract instanceof ethers.Contract, true);

    });

});
