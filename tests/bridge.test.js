const assert = require('assert');
const ethers = require('ethers');
const bridge = require('../bridge');
const { assertFunctionHasNotDeprecatedProperties, assertFunctionHasExpectedFields, assertEventHasExpectedFields } = require('./utils');

const networkUrl = 'https://public-node.rsk.co/';

describe('Bridge', () => {
    it('has the expected address', () => {
        assert.equal(bridge.address, '0x0000000000000000000000000000000001000006');
    });

    it('has all the expected signatures', () => {
        assert.equal(bridge.abi.length, 100);
    });

    it('should build the bridge contract with Ethers', () => {
        const provider = new ethers.JsonRpcProvider(networkUrl);
        const bridgeContract = new ethers.Contract(bridge.address, bridge.abi, provider);
        assert.equal(bridgeContract instanceof ethers.Contract, true);
    });

    it('has all the expected functions with the expected properties', () => {
        const functions = bridge.abi.filter(item => item.type === 'function');
        assert.equal(functions.length, 81);

        functions.forEach(func => {
            assertFunctionHasNotDeprecatedProperties(func);
            assertFunctionHasExpectedFields(func);
        });
    });

    it('has all the expected events with the expected properties', () => {
        const events = bridge.abi.filter(item => item.type === 'event');
        assert.equal(events.length, 19);

        events.forEach(func => {
            assertEventHasExpectedFields(func);
        });
    });

});

