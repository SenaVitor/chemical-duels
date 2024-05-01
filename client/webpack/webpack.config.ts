module.exports = {
    resolve: {
        fallback: {process: require.resolve('process/browser')},
        modulesDirectories: ['node_modules', 'src'], 
        extension: ['', '.js', '.scss']
    },
    stats: {
        // Configure the console output
        errorDetails: true, //this does show errors
        colors: false,
        modules: true,
        reasons: true
    },
};