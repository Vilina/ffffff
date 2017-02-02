/**
 * Created by vilin on 1/25/2017.
 */
var app = angular.module('app', [])
    .filter('thousandSuffix', function () {
        return function (input, decimals) {
            var exp, rounded,
                suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];
            
            if(window.isNaN(input)) {
                return null;
            }
            
            if(input < 1000) {
                return input;
            }
            
            exp = Math.floor(Math.log(input) / Math.log(1000));
            
            return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
        };
    })
.filter( 'mstohhmmss', function ()
{
    return function ( input )
    {
        var hh = Math.floor( input/(1000*60*60)) + '';
        if ( hh.length < 2 )
        {
            hh = '0' + hh;
        }
        
        if (mm =  Math.floor((input % (1000*60*60))/(1000*60)) + '');
        while ( mm.length < 2 )
        {
            mm = '0' + mm;
        }
        
        if (ss = Math.floor(( input % ( 1000 * 60) ) / (1000) ) + '');
        while ( ss.length < 2 )
        {
            ss = '0' + ss;
        }
        
        return hh + ':' + mm + ':' + ss;
    };
} );
 