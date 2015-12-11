/*
	Author: Marcelo Rosa, marcelorosadev@gmail.com, @marcelorosait
*/
(function(){
	
	function _($el){
		var $inputs = Array.prototype.slice.call($el.getElementsByTagName('input')),
			$selects = Array.prototype.slice.call($el.getElementsByTagName('select'));
		
		return $inputs.concat($selects);
	}
	
	//private get function
	function _get(){
		var $el = this.$el,
			value = {},
			$inputs = _($el);
			
			//mapping input values to value object
			function map($els){
				for(var i = 0; i < $els.length; i++){
					var $input = $els[i],
						innerValue = value,
						properties = ($input.name || '').split('-');
					for(var j = 0; j < properties.length - 1; j++){
						var property = properties[j];
						if(!innerValue.hasOwnProperty(property)){
							innerValue[property] = {};
						}
						innerValue = innerValue[property];
					}
					innerValue[properties.pop()] = $input.value;
				}
			}
			
			map($inputs);
			
			return value;
	}
	
	//private set function
	function _set(value) {
		var $el = this.$el;
			
		function recursiveNameEl(value, property){
			var names = [];
			if(typeof(value) === 'object') {
				for(var i in value) {
					if(typeof(value[i]) === 'object') {
						var innerNames = recursiveNameEl(value[i], i);
						for(var j in innerNames) {
							names.push({
								name: i + '-' + innerNames[j].name,
								value: innerNames[j].value
							});
						}
					} else {
						names.push({
							name: i,
							value: value[i]
						});
					}
				}
				return names;
			} else {
				return [{ name: property, value: value }];
			}
		}
		var names = recursiveNameEl(value);
		for(var i in names) {
			if(names[i].name) {
				var $inputs = $el.querySelectorAll('[name=' + names[i].name + ']');
				if($inputs.length > 0) {
					for(var j = 0; j < $inputs.length; j++) {
						$inputs[j].value = names[i].value;
					}
				}
			}
		}
	}
	
	function XForms($el){
		this.$el = $el;
	}
	
	XForms.prototype = {
		get value(){
			return _get.bind(this)();
		},
		set value(o){
			_set.bind(this)(o);
		}
	}
	
	var propertyLibName = '$xforms';
	
	Object.defineProperty(HTMLFormElement.prototype, propertyLibName, {
		get: function () {
			Object.defineProperty(this, propertyLibName, {
				value: new XForms(this)
			});
			
			return this.$xforms;
		}
	});
})();
