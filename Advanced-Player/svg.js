this.templateHooks = {};

regexpQuote = function (str, delimiter) {
    return String(str).replace(
        new RegExp(
            '[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]',
            'g'
        ),
        '\\$&'
    );
}

hookNames = function(){
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

variable = function( varName ){
    if( varName in this ){
        return this[varName];
    }
    return '';
}


global = this;
templateHooks.prop = prop = function( propName, varName ){
    // print( varName );
    
    if( (varName in global) && (value = global[varName]).length ){
        return propName + ':' + value + ';';
    }
    return '';
}

this.templateHooks.variable = variable;
