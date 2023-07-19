import http from "../http-common";

class ReservationDataService {

    getAll() {
        return http.get("http://localhost:8080/booking/reservations");
      }
    
      create(data) {
        return http.post("http://localhost:8080/booking/reservation", data);
      }
    
      update(id, data) {
        return http.put(`http://localhost:8080/booking/reservation/${id}`, data);
      }
    
      delete(id) {
        return http.delete(`http://localhost:8080/booking/reservations/${id}`);
      }

      deleteAll() {
        return http.delete(`http://localhost:8080/booking/reservations`);
      }
    
}