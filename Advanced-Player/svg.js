this.templateHooks = {};

this.regexpQuote = function (str, delimiter) {
    return String(str).replace(
        new RegExp(
            '[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]',
            'g'
        ),
        '\\$&'
    );
}

this.hookNames = function(){
    var hookNames = ['variable'];
    for( var i in this.templateHooks )
        hookNames.push(i);
    
    hookNames.toPattern = function(){
        for( var i in this )
            this[i] = regexpQuote(this[i]);
        return this.join('|');
    }
    
    return hookNames;
}
