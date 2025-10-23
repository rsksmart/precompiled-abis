const assert = require('assert');

// Common types allowed in ABI inputs/outputs for tests
const types = [
  'address',
  'bool',
  'bytes', 'bytes32',
  'bytes[]', 'bytes32[]',
  'string',
  'uint', 'uint256',
  'int', 'int64', 'int256'
];

const deprecatedProperties = ['constant'];

const assertFunctionHasNotDeprecatedProperties = (funcOrEvent) => {
  assert(
    !deprecatedProperties.some((prop) => Object.prototype.hasOwnProperty.call(funcOrEvent, prop)),
    `Function/Event '${funcOrEvent.name}' should not have deprecated properties.`
  );
};

const expectedFunctionFields = ['name', 'type', 'inputs', 'outputs', 'stateMutability'];

const assertFunctionInputHasExpectedFields = (input) => {
  assert.equal(typeof input.name, 'string');
  assert(types.includes(input.type), `Invalid type: ${input.type} for input: ${input.name}`);
  assert(input.indexed === undefined, `Indexed should not be part of function input: ${input.name}`);
};

const assertFunctionOutputHasExpectedFields = (output) => {
  assert.equal(typeof output.name, 'string');
  assert(types.includes(output.type), `Invalid type: ${output.type} for output: ${output.name}`);
  console.assert(output.indexed === undefined, `Indexed should not be part of function output: ${output.name}`);
};

const assertFunctionHasExpectedFields = (func) => {
  assert.equal(expectedFunctionFields.every((field) => Object.prototype.hasOwnProperty.call(func, field)), true);
  assert.equal(typeof func.name, 'string');
  assert.equal(typeof func.type, 'string');
  assert.equal(func.type, 'function');

  assert.equal(typeof func.inputs, 'object');
  console.assert(Array.isArray(func.inputs), `Invalid inputs: ${func.inputs} for function: ${func.name}`);
  func.inputs.forEach((input) => assertFunctionInputHasExpectedFields(input));

  const expectedAllowedStateMutabilities = ['pure', 'view', 'nonpayable', 'payable'];
  assert(
    expectedAllowedStateMutabilities.includes(func.stateMutability),
    `Invalid stateMutability: ${func.stateMutability} for function: ${func.name}`
  );

  assert.equal(typeof func.outputs, 'object');
  assert(Array.isArray(func.outputs), `Invalid outputs: ${func.inputs} for function: ${func.name}`);
  func.outputs.forEach((output) => assertFunctionOutputHasExpectedFields(output));

  assert.equal(typeof func.stateMutability, 'string');
};

const expectedEventFields = ['name', 'type', 'inputs'];

const assertEventInputHasExpectedFields = (input) => {
  assert.equal(typeof input.name, 'string');
  assert(types.includes(input.type), `Invalid type: ${input.type} for input: ${input.name}`);
  assert(typeof input.indexed === 'boolean', `Indexed should be a boolean for input: ${input.name}`);
};

const assertEventHasExpectedFields = (event) => {
  assert.equal(expectedEventFields.every((field) => Object.prototype.hasOwnProperty.call(event, field)), true);
  assert.equal(typeof event.name, 'string');

  assert.equal(typeof event.type, 'string');
  assert.equal(event.type, 'event');

  assert.equal(typeof event.anonymous, 'boolean');

  assert.equal(typeof event.inputs, 'object');
  assert(Array.isArray(event.inputs), `Invalid inputs: ${event.inputs} for event: ${event.name}`);
  event.inputs.forEach((input) => assertEventInputHasExpectedFields(input));

  assert(event.outputs === undefined, `Outputs should not be part of event: ${event.name}`);
};

module.exports = {
  // constants
  types,
  // function assertions
  assertFunctionHasNotDeprecatedProperties,
  assertFunctionHasExpectedFields,
  assertFunctionInputHasExpectedFields,
  assertFunctionOutputHasExpectedFields,
  // event assertions
  assertEventHasExpectedFields,
  assertEventInputHasExpectedFields,
};
