/**
 * Sends a request to the specified url from a form.
 * @param {string} path the path to send the post request to
 * @param {object} params the parameters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

export const redirectPost = (path, params, method = "post") => {
  // https://stackoverflow.com/a/133997
  const form = document.createElement("form");
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
};

/**
 * Convert Shopify's string price "15.00" to Bold's number price 1500
 * @param {string} value the price to be converted to a number
 */
export const priceStringToNumber = (price) => {
  return Number(Number(price).toFixed(2).split(".").join(""));
};
