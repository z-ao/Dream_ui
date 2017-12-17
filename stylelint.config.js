//配置查看地址 https://stylelint.io/user-guide/rules/

module.exports = {
    "rules":{
        "color-no-invalid-hex":true,//颜色色值
        "declaration-colon-space-before":"never",//冒号前空格
        "declaration-colon-space-after":"always",//冒号后空格
        "indentation": 4,//缩进
        "number-leading-zero":"always",//少于1时前导0
    }
}