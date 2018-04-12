import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DatabaseService {

  constructor(private http:HttpClient) { }

  insertStud(data){
     return this.http.post("http://localhost/angularapi/insert_stud.php",data);

  }
  viewStud(){
    return this.http.get("http://localhost/angularapi/view_stud.php");
  }
  updateStud(data){
    return this.http.post("http://localhost/angularapi/update_stud.php",data);
  }
  updateStudData(data){
    return this.http.post("http://localhost/angularapi/update_data_stud.php",data);
  }
  deleteStud(data){
    return this.http.post("http://localhost/angularapi/delete_stud.php",data);
  }
}
