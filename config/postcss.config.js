module.exports = {
    arser: 'sugarss',
    plugins: {
        'autoprefixer': {},
        'css-mqpacker': {},
        'cssnano': {
            preset: [
                'default', {
                    discardComments: {
                        removeAll: true
                    }
                }
            ]
        }
    }
};