import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "./database.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reactive form CRUD';
  data;
  updclk=false;
  validate=false;
  studform= new FormGroup({
    id:new FormControl('',),
    nm:new FormControl('',[Validators.required,Validators.minLength(4)]),
    ad:new FormControl('',Validators.required)
  });
  constructor(private database:DatabaseService){
    this.onViewStud();
  }
  onRegClk(){
    //alert("clicked");
    this.validate=true;
    let stud=this.studform.value;
    //alert(stud.id);
    alert(this.studform.untouched);
    if(!this.studform.invalid) {
      if (this.updclk) {
        this.database.updateStud(stud).subscribe((res) => {
          alert(res['result']);
          this.onViewStud();
        });

      } else {
        this.database.insertStud(stud).subscribe((res) => {
          console.log(res);
          alert(res['result']);
          this.onViewStud();
        });
        this.validate=false;
      }
    }
    this.onCancleClk();
  }
  onUpdClk(data){
    console.log(data);
    let stud={
      id:data
    };
    this.database.updateStudData(stud).subscribe((res)=>{
      console.log(res);
      //this.studform.value.nm=res['snm'];
      //this.studform.value.ad=res['sad'];
      this.studform.setValue({
        id:res['id'],
        nm:res['nm'],
        ad:res['ad']
      });
      this.updclk=true;
    });
  }
  onDelClk(data){
    let stud={
      id:data
    };
    this.database.deleteStud(stud).subscribe((res)=>{
      alert(res['result']);
      this.onViewStud();
    });
  }
  onCancleClk(){
    this.studform.reset();
    this.updclk=false;
  }
  onViewStud(){
    this.database.viewStud().subscribe((res)=>{
      console.log(res);
      this.data=res;
    });
  }
}
