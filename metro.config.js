module.exports = {
    resolver: {
        sourceExts: ["jsx", "js", "ts", "tsx"],
    },
};
const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = config;
