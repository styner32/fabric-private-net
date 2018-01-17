const getErrorMessage = function(field) {
	var response = {
    error: 'invalid_data',
		error_description: `'${field}' field is missing or Invalid in the request`
	};

	return response;
}

module.exports = getErrorMessage;
