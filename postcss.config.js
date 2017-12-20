module.exports = {
    plugins: {
        'postcss-import': {},
        'stylelint':{},
        'autoprefixer': {},
        'postcss-css-variables':{},
        'postcss-mixins':{},
        'postcss-calc':{},
        'postcss-nested':{},
        'precss':{},
        'cssnano': {
            //防止打包的z-index被修改
            "safe" : true
        }, 
    }
}