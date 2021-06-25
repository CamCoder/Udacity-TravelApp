/**
 * Add an item to a localStorage() array
 * @param {String} name  The localStorage() key
 * @param {String} value The localStorage() value
 */
function addToLocalStorageArray(name, value) {

	// Get the existing data
	var existing = localStorage.getItem(name);

	// If no existing data, create an array
	// Otherwise, convert the localStorage string to an array
	existing = existing ? existing.split(',') : [];

	// Add new data to localStorage Array
	existing.push(value);

	// Save back to localStorage
	localStorage.setItem(name, existing.toString());

};

export {addToLocalStorageArray}