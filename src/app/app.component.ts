import { Component } from '@angular/core';
import { RequestService } from './services/request.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DescriptionComponent } from './components/description/description.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public movies!: any[] ; 
  constructor(private requestService: RequestService,public dialog: MatDialog){
    this.getMovies();
  }

  getMovies(){
    this.requestService.getMovies().subscribe((resp: any) =>{
      this.movies = resp;
    });
  }

  openDescription(id: string) {
    this.requestService.getMovie(id).subscribe((resp:any) =>{
      this.dialog.open(DescriptionComponent, {
        height: (screen.height-100)+'px',
        width: (screen.width-700)+'px',
        data: resp,
      });
    })
    
  }

}
