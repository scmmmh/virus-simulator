module.exports = {
    configureWebpack: {
        output: {
            globalObject: "(typeof self!='undefined'?self:this)",
        },
    },
    pages: {
        index: {
            entry: 'src/main.ts',
            title: 'Virus Simulator',
        },
    },
    publicPath: '/virus-simulator/',
    transpileDependencies: [
        'vuetify'
    ],
}
