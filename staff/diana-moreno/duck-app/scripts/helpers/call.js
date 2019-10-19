function call(method, url, body, callback) {
  let headers = {}

  if (body) headers['Content-Type'] = 'application/json;charset=UTF-8'

  fetch(method, url, headers, body, function(response) {
    if (response.readyState == 4) { // && response.status == 201 no todas serán correctas!
      var result = JSON.parse(response.responseText);

      callback(result);
    }
  });
}