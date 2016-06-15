export default function getData(url) {
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        resolve(request.response);
      } else {
        reject ('There was an error');
      }
    }

    request.send();
  });
}
