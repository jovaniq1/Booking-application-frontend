/**
 * This function helps set the data for the google api
 * @param  {string} geo a string like 123463, 2456432 lat and lng
 * @returns {object} object of lat and lng converted to float
 */
export const GetGeo = (geo) => {
  if (geo === undefined) {
    return null;
  }
  var result;
  result = geo.split(',');
  //console.log(result);
  var obj = {
    lat: parseFloat(result[0]),
    lng: parseFloat(result[1]),
  };
  return obj;
};
