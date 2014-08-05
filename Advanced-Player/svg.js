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


// http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(" ");

    return d;       
}

/** /
		<!--path	d="" expr-d="describeArc( 26, 26, 20, -60, 60 )"
				style="stroke: #cccccc"/-->
/**/

this.templateHooks.variable = variable;
