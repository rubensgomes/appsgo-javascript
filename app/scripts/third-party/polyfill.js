(function() {

  /**
   * @file Defines polyfills to add features not supported by the browser.
   *
   * NOTE: Javascript variables have two scopes: function and global.
   *
   * Notice that we are declaring self invoking anonymous function
   * expressions; that is, "(function() {...}).();". This programming practice
   * allows any variable declared within the scope of the annonymous function
   * to be encapsulated and only visible within the scope and execution of
   * that function. Therefore, it prevents the pollution of the global scope.
   *
   * @author Rubens Gomes
   */

  // place this function in "strict" operating context to prevent "unsafe"
  // actions from happening, and to throw more exceptions.
  'use strict';

  // add support for "startWith"
  if (!String.prototype.startsWith)
  {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
    };
  }

})();
