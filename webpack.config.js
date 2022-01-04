module.exports = {
    watch: true,
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
}