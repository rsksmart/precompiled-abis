import rollupPluginCommonjs from 'rollup-plugin-commonjs';
import rollupPluginResolve from 'rollup-plugin-node-resolve';
import rollupPluginJson from "rollup-plugin-json"

const config = {
  input: 'bridge.js',
  output: {
    file: 'dist/bridge.umd.js',
    format: 'umd',
    name: 'Bridge',
  },
  plugins: [
    rollupPluginCommonjs(),
    rollupPluginResolve(),
    rollupPluginJson()
  ],
};

export default config;