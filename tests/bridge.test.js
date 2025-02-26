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

        functions.forEach(func => {
            assertFunctionHasNotDeprecatedProperties(func);
            assertFunctionHasExpectedFields(func);
        });
    });

    it('has all the expected events with the expected properties', () => {
        const events = bridge.abi.filter(item => item.type === 'event');
        assert.equal(events.length, 15);

        events.forEach(func => {
            assertEventHasExpectedFields(func);
        });
    });

});


const deprecatedProperties = ['constant'];
const assertFunctionHasNotDeprecatedProperties = (funcOrEvent) => {
    assert(!deprecatedProperties.some(prop => funcOrEvent.hasOwnProperty(prop)),
        `Function/Event '${funcOrEvent.name}' should not have deprecated properties.`
    );
}

const expectedFunctionFields = ['name', 'type', 'inputs', 'outputs', 'stateMutability'];
const assertFunctionHasExpectedFields = (func) => {
    assert.equal(expectedFunctionFields.every(field => func.hasOwnProperty(field)), true);
    assert.equal(typeof func.name, 'string');
    assert.equal(typeof func.type, 'string');
    assert.equal(func.type, 'function');

    assert.equal(typeof func.inputs, 'object');
    console.assert(Array.isArray(func.inputs), `Invalid inputs: ${func.inputs} for function: ${func.name}`);
    func.inputs.forEach(input => assertFunctionInputHasExpectedFields(input));

    const expectedAllowedStateMutabilities = ["pure", "view", "nonpayable", "payable"];
    assert(
        expectedAllowedStateMutabilities.includes(func.stateMutability),
        `Invalid stateMutability: ${func.stateMutability} for function: ${func.name}`
    );

    assert.equal(typeof func.outputs, 'object');
    assert(Array.isArray(func.outputs), `Invalid outputs: ${func.inputs} for function: ${func.name}`);
    func.outputs.forEach(output => assertFunctionOutputHasExpectedFields(output));

    assert.equal(typeof func.stateMutability, 'string');
}

const expectedEventFields = ['name', 'type', 'inputs'];
const assertEventHasExpectedFields = (event) => {
    assert.equal(expectedEventFields.every(field => event.hasOwnProperty(field)), true);
    assert.equal(typeof event.name, 'string');

    assert.equal(typeof event.type, 'string');
    assert.equal(event.type, 'event');

    assert.equal(typeof event.anonymous, 'boolean');

    assert.equal(typeof event.inputs, 'object');
    assert(Array.isArray(event.inputs), `Invalid inputs: ${event.inputs} for event: ${event.name}`);
    event.inputs.forEach(input => assertEventInputHasExpectedFields(input));

    assert(event.outputs === undefined, `Outputs should not be part of event: ${event.name}`);
}

const types = [
    'address',
    'bool',
    'bytes', 'bytes32',
    'bytes[]', 'bytes32[]',
    'string',
    'uint', 'uint256',
    'int', 'int64', 'int256'
];

const assertFunctionInputHasExpectedFields = (input) => {
    assert.equal(typeof input.name, 'string');
    assert(types.includes(input.type), `Invalid type: ${input.type} for input: ${input.name}`);
    assert(input.indexed === undefined, `Indexed should not be part of function input: ${input.name}`);
}

const assertFunctionOutputHasExpectedFields = (output) => {
    assert.equal(typeof output.name, 'string');
    assert(types.includes(output.type), `Invalid type: ${output.type} for output: ${output.name}`);
    console.assert(output.indexed === undefined, `Indexed should not be part of function output: ${output.name}`);
}

const assertEventInputHasExpectedFields = (input) => {
    assert.equal(typeof input.name, 'string');
    assert(types.includes(input.type), `Invalid type: ${input.type} for input: ${input.name}`);
    assert(typeof input.indexed === 'boolean', `Indexed should be a boolean for input: ${input.name}`);
}
