this.templateHooks = {};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



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

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

global = this;
templateHooks.prop = prop = function( propName, varName ){
    var out = '';
    
    if( (varName in global) ){
        var value = global[varName];
        
        if( isNumber(value) ){
            out = propName + ':' + value + ';';
        } else if( value.length ) {
            out = propName + ':' + value + ';';
        }
        
    } else {
        // print( 'Unable to find ' + varName + ' for prop hook.' );
    }
    
    // print( varName + ' => ' out + ' | ' + (varName in global) );
    return out;
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





pointsToPath = function( points ){
    // print('#############################################################');
    var path	= '',
        currentPoint;
    
    for( var i in points ){
        currentPoint = [
            points[i].type,
            points[i].x,
            points[i].y,
        ];
        path += currentPoint.join(' ') + ' ';
    }
    
    // print( path );
    return path;
}

this.templateHooks.pointsToPath = pointsToPath;
