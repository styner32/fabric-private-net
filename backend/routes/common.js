const getErrorMessage = function(field) {
	var response = {
    error: 'invalid_data',
		error_description: `"${field}" field is invalid`
	};

	return response;
}

const delayPromise = function(duration) {
  return function(...args) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(...args);
      }, duration);
    });
  };
}

module.exports = {
  getErrorMessage,
  delayPromise
}
