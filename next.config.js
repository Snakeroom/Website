const withImages = require("next-images");
const withOffline = require("next-offline");

module.exports = withImages(
	withOffline({
		compiler: {
			styledComponents: true,
		},
	})
);
