const assert = require('assert');
const hdWalletUtils = require('../hdWalletUtils');

describe('HdWalletUtils', () => {
    it('has the expected address', () => {
        assert.equal(hdWalletUtils.address, '0x0000000000000000000000000000000001000009');
    });

    it('has all the expected signatures', () => {
        assert.equal(hdWalletUtils.abi.length, 4);
    });
});
