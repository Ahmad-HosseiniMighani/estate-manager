import jwtDecode from "jwt-decode";
// import moment from "jalali-moment";
import http from "./httpService";
import { apiUrl } from "../config.json";

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
  console.log('>>> asdasd');
  const testApiEndPoint = apiUrl + "/api/properties";
  const testResult = await http.get(testApiEndPoint);

  console.log('>>> test result', testResult);

  const apiEndPoint = apiUrl + "/PropertyApi/PropertiesTimeLine/";
  const result = await http.get(apiEndPoint);


  return result.data.message;
}

export async function getfilteredProperties({maxPrice,minPrice,foundationMax,foundationMin,p_id},area,propertyState,paymentType,propertyType,roomCount) {
  const apiEndPoint = apiUrl + `/PropertyApi/search/?min_price=${minPrice}&max_price=${maxPrice}&areas=${area.join()}&room_count=${roomCount.join()}&min_foundation=${foundationMin}&max_foundation=${foundationMax}&building_type=${propertyType.join()}&payment_type=${paymentType.join()}&property_state=${propertyState.join()}&p_id=${p_id}`;
  // const apiEndPoint = apiUrl + `/PropertyApi/search/?min_price=0&max_price=999999999999&areas=[]&room_count=[]&min_foundation=0&max_foundation=999999999999&building_type=[]&payment_type=[]&property_state=[]`;//Needs to be updated
  const result = await http.get(apiEndPoint);
  // console.log(apiEndPoint)
  // console.log(result.data)
  return result.data.message;
}

export async function getSpecificProperty(id) {
  const apiEndPoint = apiUrl + "/PropertyApi/Property/?id="+id;
  const result = await http.get(apiEndPoint);
  return result.data;
}

export async function getAllAreas() {
  const apiEndPoint = apiUrl + "/areas/";
  const result = await http.get(apiEndPoint);

  console.log('>>> result', result);

  return result;
}

export async function getAllNotifs() {
  const apiEndPoint = apiUrl + "/NotificationApi/notification/";
  const result = await http.get(apiEndPoint);
  return result.data;
}

export async function addProperty(data,images,areas) {
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/PropertyApi/PropertyCrud/?areas=${areas}&images=${images}`;
  const result = await tempHttp.post(apiEndPoint,data);
  // console.log(result.data)
  return result.data;
}

export async function deleteProperty(id) {
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/PropertyApi/PropertyCrud/?id=${id}`;
  const result = await tempHttp.delete(apiEndPoint);
  // console.log(result.data)
  return result.data;
}

export async function updatePropertyInfo(data,id){
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/PropertyApi/PropertyCrud/?id=${id}`;
  const result = await tempHttp.put(apiEndPoint,data);
  return result.data;
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
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + `/AreaApi/area/?id=${area_id}`;
  const result = await tempHttp.delete(apiEndPoint);
  return result.data;
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
  uploadData.append("image", image, image.name);
  let tempHttp = newInstance(getJwt());
  const apiEndPoint = apiUrl + "/PropertyImage/UploadImages/";
  const result = await tempHttp.post(apiEndPoint,uploadData);
  // console.log(result.data)
  return result.data;
}

export function getImageUrl(imageSrc) {
  return apiUrl+imageSrc;
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
