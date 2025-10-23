const assert = require('assert');
const ethers = require('ethers');
const blockHeader = require('../blockHeader');
const { assertFunctionHasNotDeprecatedProperties, assertFunctionHasExpectedFields } = require('./utils');

const networkUrl = 'https://public-node.rsk.co/';

describe('BlockHeader', () => {
    it('has the expected address', () => {
        assert.equal(blockHeader.address, '0x0000000000000000000000000000000001000010');
    });

    it('has all the expected signatures', () => {
        assert.equal(blockHeader.abi.length, 11);
    });

    it('should build the blockHeader contract with Ethers', () => {
        const provider = new ethers.JsonRpcProvider(networkUrl);
        const blockHeaderContract = new ethers.Contract(blockHeader.address, blockHeader.abi, provider);
        assert.equal(blockHeaderContract instanceof ethers.Contract, true);
    });

    it('has all the expected functions with the expected properties', () => {
        const functions = blockHeader.abi.filter(item => item.type === 'function');
        assert.equal(functions.length, 11);

        functions.forEach(func => {
            assertFunctionHasNotDeprecatedProperties(func);
            assertFunctionHasExpectedFields(func);
        });
    });

    it('has no events', () => {
        const events = blockHeader.abi.filter(item => item.type === 'event');
        assert.equal(events.length, 0);
    });
});
