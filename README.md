# viewport-visible Module

[![npm version](https://badge.fury.io/js/viewport-visible.svg)](http://badge.fury.io/js/viewport-visible)

A light-weight module that allows you to pass in an element or elements and return whether or not they are visible within the immediate viewport.

# Install
    npm install viewport-visible --save-dev

# Documentation
    
    parameter
    
    {
      target                List of elements OR a specific element you wish to check is within the viewport
      percent   [optional]  Integer from 0-100 of how much the element should be showing before returning true/false (default: 50)
      axis      [optional]  Specify axis in which to check if element is within the viewport (default: both)
      debug     [optional]  See console.logs (default: false)
    }

    How to call: 

    var vizObj = inViewport({
      target    : document.querySelectorAll('.className'),
      percent   : 50,
      axis      : 'x||y||both'
    });

    Returns: obj of arrays that is separated into visible, nonvisible, and then all
             all obj in the format of { el : el1, visible : true }
    {
      visible     : [el1]
      nonvisibile : [el2]
      all         : [ {el1, true}, {el2, false} ]
    }

    Where now you can call vizObj.all, vizObj.visible, vizObj.nonvisible