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
    transpileDependencies: [
        'vuetify'
    ],
}
