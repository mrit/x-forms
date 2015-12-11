# x-Forms
Extended tools to manipulate children elements in HTMLFormElement.

## How to:
```
var object = htmlFormElement.$xform.value; //Get the value as Object
htmlFormElement.$xform.value = object; //Set value from Object
```
If you want use nested objects, it is possible ! Just set name property in input/select, like:
```
<input name="nestedObject-property" value="0">
```
return value like:
```
{ nextedObject: { property: 0 } }
```
