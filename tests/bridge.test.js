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

    it('has all the expected functions with the expected properties', () => {
        const functions = bridge.abi.filter(item => item.type === 'function');
        assert.equal(functions.length, 68);

        const allowedStateMutabilities = ["pure", "view", "nonpayable", "payable"];
        functions.forEach(func => {
            assert(
                !func.hasOwnProperty('constant'),
                `Function '${func.name}' should not have a 'constant' property.`
            );
            assert.equal(typeof func.stateMutability, 'string');
            assert(
                allowedStateMutabilities.includes(func.stateMutability),
                `Invalid stateMutability: ${func.stateMutability} for function: ${func.name}`
            );
        });
    });
});
