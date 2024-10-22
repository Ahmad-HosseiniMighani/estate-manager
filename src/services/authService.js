import jwtDecode from "jwt-decode";
// import moment from "jalali-moment";
import http from "./httpService";
import { apiUrl, url } from "../config.js";
import { indexOf } from "lodash";

const accessToken = "accessToken";
const refreshToken = "refreshToken";

function newInstance(Jwt) {
  let tempHttp = http.createInstance();
  tempHttp.defaults.headers.common["Authorization"] = `Bearer ${Jwt}`;

  return tempHttp;
}

export async function login(username, password) {
  const apiEndPoint = apiUrl + "/auth/local";
  const { data: { jwt } = {} } = await http.post(apiEndPoint, { identifier: username, password });

  localStorage.setItem(accessToken, jwt);
  // localStorage.setItem(refreshToken, tokens.data.refresh);
}

export function logout() {
  localStorage.removeItem(accessToken);
  // localStorage.removeItem(refreshToken);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(accessToken);
    const { user_id: userId } = jwtDecode(token);

    return userId;
  } catch (ex) {
    return null;
  }
}

export async function getUserProfile() {
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = `${apiUrl}/users/me`;

  try {
    const userProfile = await tempHttp.get(apiEndPoint);

    return userProfile;
  } catch (ex) {
    logout();

    return null;
  }
}

export async function getAllProperty() {
  const apiEndPoint = apiUrl + "/properties?populate=*&pagination[pageSize]=10000";
  const result = await http.get(apiEndPoint);

  return result;
}

export async function getfilteredProperties({maxPrice,minPrice,foundationMax,foundationMin,p_id},area,propertyState,paymentType,propertyType,roomCount) {
  const apiEndPoint = apiUrl
    + `/properties?populate=*&pagination[pageSize]=10000`
    + (minPrice ? `&filters[price][$gte]=${minPrice}` : '')
    + (maxPrice ? `&filters[price][$lte]=${maxPrice}`: '')
    + (area.length > 0 ? createAreasFilter(area) : '')
    + (foundationMin ? `&filters[foundation][$gte]=${foundationMin}` : '')
    + (foundationMax ? `&filters[foundation][$lte]=${foundationMax}` : '')
    + (roomCount.length > 0 ? createRoomCountFilter(roomCount) : '')
    + (propertyType.length > 0 ? createInOperatorFilter('building_type', propertyType) : '')
    + (paymentType.length > 0 ? createInOperatorFilter('payment_type', paymentType) : '')
    + (propertyState.length > 0 ? createInOperatorFilter('property_state', propertyState) : '')
    + (p_id ? `&filters[documentId][$eq]=${p_id}` : '');

  return await http.get(apiEndPoint);
}

const createAreasFilter = (areas) => areas.reduce(
  (result, area, index) => result + `&filters[areas][documentId][$in][${index}]=${area}`,
  ''
);

const createInOperatorFilter = (filterName, valueArray) => valueArray.reduce(
  (result, value, index) => result + `&filters[${filterName}][$in][${index}]=${value}`,
  ''
);

const createRoomCountFilter = (roomCount) => {
  if (roomCount.indexOf('3') >= 0) {
    if (roomCount.length > 1) {
      return roomCount.reduce(
        (result, value, index) => {
          return result + `&filters[$or][${index}][room_count][${value == 3 ? '$gte' : '$eq'}]=${value}`
        },
        ''
      );
    }

    return `&filters[room_count][$gte]=${roomCount[0]}`;
  }

  return createInOperatorFilter('room_count', roomCount);
}

export async function getSpecificProperty(id) {
  const apiEndPoint = apiUrl + `/properties/${id}?populate=*`;
  const result = await http.get(apiEndPoint);

  return result;
}

export async function getAllAreas() {
  const apiEndPoint = apiUrl + "/areas/";
  const result = await http.get(apiEndPoint);

  return result;
}

export async function getAllNotifs() {
  const apiEndPoint = apiUrl + "/NotificationApi/notification/";
  const result = await http.get(apiEndPoint);
  return result.data;
}

export async function addProperty(data) {
  const tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/properties`;
  const result = await tempHttp.post(apiEndPoint, { data });

  return result;
}

export async function deleteProperty(id) {
  const tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/properties/${id}`;
  const result = await tempHttp.delete(apiEndPoint);

  return result;
}

export async function updatePropertyInfo(data,id){
  const tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/properties/${id}`;

  return await tempHttp.put(apiEndPoint, { data });
}

export async function delPropertyImage(property_id,image_id){
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/PropertyApi/ImageProperty/?property_id=${property_id}&image_id=${image_id}`;
  const result = await tempHttp.delete(apiEndPoint);
  return result.data;
}

export async function addPropertyImage(property_id,image_id){
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/PropertyApi/ImageProperty/?property_id=${property_id}&image_id=${image_id}`;
  const result = await tempHttp.post(apiEndPoint);
  return result.data;
}

export async function addPropertyArea(property_id,area_id){
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/PropertyApi/AreaProperty/?property_id=${property_id}&area_id=${area_id}`;
  const result = await tempHttp.post(apiEndPoint);
  return result.data;
}

export async function delPropertyArea(property_id,area_id){
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/PropertyApi/AreaProperty/?property_id=${property_id}&area_id=${area_id}`;
  const result = await tempHttp.delete(apiEndPoint);
  return result.data;
}

export async function addArea(data){
  const tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + "/areas";
  const result = await tempHttp.post(apiEndPoint, { data });

  return result;
}

export async function editArea(data,area_id){
  const tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/areas/${area_id}`;
  const result = await tempHttp.put(apiEndPoint,{ data });

  return result;
}

export async function deleteArea(area_id){
  const tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/areas/${area_id}`;
  const result = await tempHttp.delete(apiEndPoint);

  return result;
}

export async function addNotif(data){
  data.sender=getCurrentUser();
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + "/NotificationApi/notificationCrud/";
  const result = await tempHttp.post(apiEndPoint,data);
  return result.data;
}

export async function deleteNotif(notif_id){
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/NotificationApi/notificationCrud/?id=${notif_id}`;
  const result = await tempHttp.delete(apiEndPoint);
  return result.data;
}

export async function uploadImage(image) {
  const uploadData = new FormData();

  uploadData.append("description", "");
  uploadData.append("files", image, image.name);

  const tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + "/upload/";
  const result = await tempHttp.post(apiEndPoint,  uploadData);

  return result;
}

export function getImageUrl(imageSrc) {
  return url + imageSrc;
}

export function getJwt() {
  return localStorage.getItem(accessToken);
}

export default {
  login,
  getJwt,
  getAllProperty,
  getfilteredProperties,
  getSpecificProperty,
  getImageUrl,
  logout,
  getCurrentUser,
  getUserProfile,
  uploadImage,
  getAllAreas,
  addProperty,
  updatePropertyInfo,
  delPropertyImage,
  addPropertyImage,
  addPropertyArea,
  delPropertyArea,
  deleteProperty,
  addArea,
  editArea,
  deleteArea,
  getAllNotifs,
  addNotif,
  deleteNotif,
};
