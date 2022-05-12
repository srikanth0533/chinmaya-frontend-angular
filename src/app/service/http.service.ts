import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: "root",
})
export class HttpService {
  rootURL = environment.rootURL;

  constructor(public http: HttpClient) { }

  //2021 apis
  getUnsubscribe(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/userControl", data);
  }
  getWebsite(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/websiteLink", data);
  }
  sendEmail01Bulk2021() {
    return this.http.get(this.rootURL + "/sendEmail01GCC2021", { headers: this.getHeaders() });
  }
  sendEmail02Bulk2021() {
    return this.http.get(this.rootURL + "/sendEmailGCC2021", { headers: this.getHeaders() });
  }
  getSchoolList() {
    return this.http.get(this.rootURL + "/getSchool");
  }
  getOrder(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/createParticipant", data, { headers: this.getHeaders() });
  }
  getRegId(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/registerParticipant", data);
  }
  sendImgRefID(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/uploadScreenshot", data);
  }
  sendUpdatedForm(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/updateParticipant", data, { headers: this.getHeaders() });
  }
  deleteForm(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/deleteParticipant", data, { headers: this.getHeaders() });
  }
  getParticipantRegisteredData(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/participantsDashboard", data, { headers: this.getHeaders() });
  }
  addPaymentInfo(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/addPayment", data, { headers: this.getHeaders() });
  }
  getPaymentUserData(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/paymentLink", data);
  }
  sendPaymentLinkToUser(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/sendEmailAfterVerification", data, { headers: this.getHeaders() });
  }
  getSchoolId(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/addSchool ", data);
  }
  getPaymentDetailsInstamojo(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/getPaymentRequestDetails", data, { headers: this.getHeaders() });
  }
  login(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/login", data);
  }
  updateMaintenanceMode(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/updateMaintenance", data, { headers: this.getHeaders() });
  }
  getMaintenanceStatus() {
    return this.http.get(this.rootURL + "/getMaintenanceStatus");
  }
  silentlyTokenRefreshReq(data): Observable<any> {
    return this.http.post(this.rootURL + '/refreshToken', data, {
      headers: this.setHeadersForTokenRef(),
    });
  }
  logout() {
    return this.http.get(this.rootURL + "/logout", { headers: this.getHeaders() });
  }
  sendBulkSlotEmail(data: object): Observable<any>  {
    return this.http.post(this.rootURL + "/sendSlotDetails",data, { headers: this.getHeaders() });
  }

  //2020 apis
  getLogin(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/loginValidation", data);
  }
  getEdittedData(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/updateParticipantsMasterData", data, { headers: this.getHeaders() });
  }
  getAddedData(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/addParticipantsMasterData", data, { headers: this.getHeaders() });
  }
  getMobileData(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/checkToken", data);
  }
  getWinnersCertificateToken(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/getWinnersCertificate", data, { headers: this.getHeaders() });
  }
  getEditData(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/saveMobileConfirmation", data);
  }
  sendSingleEmail03(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/resendEventInvitationMail", data, { headers: this.getHeaders() });
  }
  getBulkEmail(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/sendMobileConfirmationMail",data, { headers: this.getHeaders() });
  }
  getGroupList() {
    return this.http.get(this.rootURL + "/getGroups", { headers: this.getHeaders() });
  }
  SendeventInvitationEmail() {
    return this.http.get(this.rootURL + "/sendEventInvitationMail", { headers: this.getHeaders() });
  }
  DownloadParticipantsData() {
    return this.http.get(this.rootURL + "/downloadExcelofAll", { headers: this.getHeaders() });
  }
  DownloadFilterParticipantsData(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/FilterExcelDownload", data, { headers: this.getHeaders() });
  }
  getSlotDashboardData() {
    return this.http.get(this.rootURL + "/getParticipantsStats", { headers: this.getHeaders() });
  }
  getTokenMeeting(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/getMeetingLink", data);
  }
  getStatusLink(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/getTimeDuration", data, { headers: this.getHeaders() });
  }
  getBatchDashboardData() {
    return this.http.get(this.rootURL + "/getBatchDetails", { headers: this.getHeaders() });
  }
  getPrizeDistributionLink() {
    return this.http.get(this.rootURL + "/getPrizeDistributionLink", { headers: this.getHeaders() });
  }
  getSlotData(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/slotsDetails", data, { headers: this.getHeaders() });
  }
  getBatchEventDateList(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/getEventDetails", data, { headers: this.getHeaders() });
  }
  getBulkEmailCertificate() {
    return this.http.get(this.rootURL + "/sendCertificateEMail", { headers: this.getHeaders() });
  }
  getWinnersCertificateEmail() {
    return this.http.get(this.rootURL + "/sendWinnersCertificateEMail", { headers: this.getHeaders() });
  }
  getFilterList() {
    return this.http.get(this.rootURL + "/getFilters", { headers: this.getHeaders() });
  }
  getUserCount(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/GetCounts", data, { headers: this.getHeaders() });
  }
  getHallTicketList(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/PrintHallTickets", data, { headers: this.getHeaders() });
  }
  getPartiList(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/getParticipantsData", data, { headers: this.getHeaders() });
  }


  // UpdateRooms(id: object, data: object): Observable<any> {
  //   return this.http.put(this.rootURL + "/rooms/" + id, data);
  // }
  // deleteRooms(id: object): Observable<any> {
  //   return this.http.delete(this.rootURL + "/rooms/" + id);
  // }
  partiFileUploader(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/upload", data, { headers: this.getHeaders() });
  }
  groupFileUploader(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/groupUpload", data, { headers: this.getHeaders() });
  }
  getParticipantCount(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/GetParticipantsCounts", data, { headers: this.getHeaders() });
  }
  getHallTicketInstructions() {
    return this.http.get("assets/json/eventList.json");
  }
  getAllParticipantsName() {
    return this.http.get(this.rootURL + "/getAllParticipantsName", { headers: this.getHeaders() });
  }

  // getSlotDashboard
  getParticipantStatusCount() {
    return this.http.get(this.rootURL + "/getRegvsConfirmedCount", { headers: this.getHeaders() });
  }

  // slotTimeing
  getAllSlotTiming() {
    return this.http.get(this.rootURL + "/getAllSlotTiming", { headers: this.getHeaders() });
  }

  // postSlotDashboard
  slotCapacity(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/createSlot", data, { headers: this.getHeaders() });
  }

  createSlotTiming(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/createSlotTiming", data, { headers: this.getHeaders() });
  }

  deleteSlotTiming(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/deleteSlotTiming", data, { headers: this.getHeaders() });
  }

  updateSlotTiming(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/updateSlotTiming", data, { headers: this.getHeaders() });
  }

  deleteSlot(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/deleteSlot", data, { headers: this.getHeaders() });
  }

  updateBulkSlots (data: any): Observable<any> {
    return this.http.post(this.rootURL + "/updateBulkSlots ", data, { headers: this.getHeaders() });
  }

  createSingleSlot(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/createSingleSlot", data, { headers: this.getHeaders() });
  }
  getParticipantsWithSlotId(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/getParticipantsWithSlotId", data, { headers: this.getHeaders() });
  }

  assignParticipant(data: any): Observable<any> {
    return this.http.post(this.rootURL + "/assign", data, { headers: this.getHeaders() });
  }
  

  dashboardExceldownload(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/dashboardExceldownload", data, { headers: this.getHeaders() });
  }
  // ========================
  getHeaders() {
    var tokenObj = JSON.parse(sessionStorage.getItem('userData'));
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + tokenObj.token);
    return headers;
  }
  setHeadersForTokenRef() {
    var tokenObj = JSON.parse(sessionStorage.getItem('userData'));
    let headers = new HttpHeaders();
    headers = headers.set('Refresh-Token', tokenObj.refresh_token);
    return headers;
  }
   // genrateCertificate
   sendWinnerCertificateMail(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/sendWinnerCertificateMail", data, { headers: this.getHeaders() });
  }
   // genrateCertificate
   sendSingleWinnerCertificateMail(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/sendSingleWinnerCertificateMail", data, { headers: this.getHeaders() });
  }
  //getExpiryLinksAPi
  getAllExpiryDate(): Observable<any> {
    return this.http.get(this.rootURL + "/getallExpiryDate");
  }
  
  //upadteExpiryDateApi
  updateExpiryDate(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/updateExpiryDate", data, { headers: this.getHeaders() });
  }
  //statucertificate
  certificateStatusData(): Observable<any> {
    return this.http.get(this.rootURL + "/getCertificateStats" , { headers: this.getHeaders() });
  }
  getUnsubscribeUser(data: object): Observable<any> {
    return this.http.post(this.rootURL + "/unsubscribeMail" ,data);
  }
  // getUnsubscribe(data: object): Observable<any> {
  //   return this.http.post(this.rootURL + "/userControl", data);
  // }
 
  getUnsubscribeMailData(data: object): Observable<any>  {
    return this.http.post(this.rootURL + "/getUnsubscribeMail" ,data );
  }
  reAllocateParticipant(data: object): Observable<any>  {
    return this.http.post(this.rootURL + "/reallocate" ,data , { headers: this.getHeaders() } );
  }

}
