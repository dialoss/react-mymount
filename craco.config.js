module.exports = {
    style: {
        sass: {
            loaderOptions: {
                additionalData: `
          @import "src/styles/_variables.scss";
          @import "src/styles/_constants.scss";
          @import "src/styles/_mixins.scss";
        `,
            },
        },
    },
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    fs: false,
                    buffer: false,
                    stream: false,
                    util: false,
                    path: false,
                    crypto: false,
                }
            },
        },
    },
};