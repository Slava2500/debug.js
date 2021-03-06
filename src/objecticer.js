var ObjectIcer	= {};

/**
 * ice properties read for target. 
 * This is harmony stuff. it isnt available everywhere. 
 * Chrome+node got it via v8
 * 
 * @param  {Object} target the object to handle
 */
ObjectIcer.readProperties	= function(target){
	console.assert(Proxy.create !== 'function', 'harmony proxy not enable. try chrome://flags or node --harmony')
	return Proxy.create({
		get	: function(proxy, name){
			console.assert( target[name] !== undefined, 'property '+name+' undefined' )
			return target[name]
		},
	})
}

ObjectIcer.readProperties.available	= typeof(Proxy) !== 'undefined' && typeof(Proxy.create) === 'function'


/**
 * ice properties write for target
 * 
 * @param  {Object} target the object to handle
 */
ObjectIcer.writeProperties	= function(target){
	Object.seal(target);
	return target
}

/**
 * ice properties read+write for target
 * 
 * @param  {Object} target the object to handle
 */
ObjectIcer.rwProperties	= function(target){
	ObjectIcer.readProperties(target)
	ObjectIcer.writeProperties(target)
	return target
}

// export the class in node.js - if running in node.js
if( typeof(window) === 'undefined' )	module.exports	= ObjectIcer;
