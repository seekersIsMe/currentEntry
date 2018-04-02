/**
 * 字符串替换
 * @param  {string} str    要被替换的字符串
 * @param  {string} substr 要替换的字符串
 * @param  {string} newstr 用于替换的字符串
 * @return {string}        替换后的新字符串
 */
function replace_str(str, substr, newstr) {
    var p = -1; // 字符出现位置
    var s = 0; // 下一次起始位置

    while((p = str.indexOf(substr, s)) > -1) {
        s = p + newstr.length; // 位置 + 值的长度
        str = str.replace(substr, newstr);
    }

    return str;
}

console.log( replace_str("<p>kkfdjk<p>>", "<p>", "") ); // sss