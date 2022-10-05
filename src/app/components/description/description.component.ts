import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  public idsMovies!: string; 
  public flagList: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public requestService: RequestService
  ) { 
    
  }

  ngOnInit(): void {
    this.flagList = this.requestService.checkList(this.data.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addMovie(id:string){
    this.requestService.addMyList(id);
    this.flagList = true;
  }

  likeMovie(id:string){
    console.log('hhh');
  }

}
