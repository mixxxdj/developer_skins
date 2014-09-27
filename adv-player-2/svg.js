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

// console
if( !('console' in this ) ){
    console = {
        log : function(){
            var out = [],
                i   = 0;
            for( ; i<arguments.length; i++ ){
                out.push( JSON.stringify(arguments[i]) );
            }
            print(out.join(' '));
        }
    }
}

function setDefault(){
	var params;
	
	for( var i=0; i<arguments.length; i++ ){
		params = arguments[i];
		
		// console.log(typeof this[params.name], params.name, this[params.name]);
		if(		typeof this[params.name] == 'undefined'
			||	('nullValue' in params && this[params.name] == params.nullValue)
			){
			this[params.name] = params.value;
		}
		
		if( 'type' in params && typeof params.type ==  'function' ){
			this[params.name] = params.type( this[params.name] );
		}
		// console.log('!!!!!!!!!!!!', this[params.name], typeof this[params.name] );
	}
	
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


global = this;
templateHooks.variable = variable = function( varName ){
	// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	// console.log(global[varName]);
    if( varName in global ){
        return global[varName];
    }
    return '';
}




function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

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
    // console.log('#############################################################');
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
    
    // console.log( path );
    return path;
}

this.templateHooks.pointsToPath = pointsToPath;


