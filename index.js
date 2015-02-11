
// in-viewport
// @author Augustus Yuan, Augusta Hammock, Ryan Burgess

module.exports = function inViewport(options){

  // if percent not specified, default to 50% of the element
  if (typeof options.percent === 'undefined') {
    options.percent = 50;
  }

  // if axis not specified, default to both axes
  if (typeof options.axis === 'undefined') {
    options.axis = 'both';
  }

  // Test whether or not the element is in the viewport
  function visible(el, per) {

    if (typeof jQuery === 'function' && el instanceof jQuery) {
      el = el[0];
    }

    var rect = el.getBoundingClientRect();

    // amount of px viewport needs to see to fire the event
    var elPercentageHeight = rect.height * (per * 0.01);
    var elPercentageWidth = rect.width * (per*0.01);

    var viewportWidth   = window.innerWidth || document.documentElement.clientWidth;
    var viewportHeight  = window.innerHeight || document.documentElement.clientHeight;

    var evalTop     = rect.top >= 0 && rect.top <= viewportHeight - elPercentageHeight;
    var evalLeft    = rect.left >= 0 && rect.left <= viewportWidth - elPercentageWidth;
    var evalRight   = rect.right <= viewportWidth && rect.right >= 0 + elPercentageWidth;
    var evalBottom  = rect.bottom <= viewportHeight && rect.bottom >= 0 + elPercentageHeight;
    
    if (options.debug) {
      console.log('rect');
      console.log(rect);
      console.log('VPW: ' + viewportWidth);
      console.log('VPH: ' + viewportHeight);
      console.log('%H: ' + elPercentageHeight);
      console.log('%W: ' + elPercentageWidth);
      console.log('evalTop: ' + evalTop);
      console.log('evalLeft: ' + evalLeft);
      console.log('evalRight: ' + evalRight);
      console.log('evalBottom: ' + evalBottom);
      console.log('');
      console.log('result: ' + ((evalTop && evalLeft) || (evalTop && evalRight) || (evalBottom && evalLeft) || (evalBottom && evalRight)));
    }

    // if the element is within the viewport 
    // by definition we say if the top, left, and right are within the viewport or the bottom left and right are in the viewport
    if (options.axis === 'y') {
      return (evalTop || evalBottom);
    } else if (options.axis === 'x') {
      return (evalLeft || evalRight);
    } 

    //if both, check all axes, we want it to be able to detect seeing the element from any corner
    return (
      (evalTop && evalLeft) || (evalTop && evalRight) || (evalBottom && evalLeft) || (evalBottom && evalRight)
    );
  }

  var all = [];
  var visibleArray = [];
  var nonvisibleArray = [];
  if (options.target.length > 1) {
    $.each(options.target, function(i, t) {
      if (visible($(t), options.percent)) {
        visibleArray.push($(t));
      } else {
        nonvisibleArray.push($(t));
      }
      all.push({
        el : $(t),
        visible : visible($(t), options.percent)
      });
    });
  } else {
    return (visible($(options.target), options.percent));
  }

  if (options.debug) {
    console.log(result);
  }
  return {
    'all' : all,
    'visible' : visibleArray,
    'nonvisible' : nonvisibleArray
  };
};