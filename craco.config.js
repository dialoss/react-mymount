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
};