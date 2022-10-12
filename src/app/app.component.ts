import { Component,HostListener } from '@angular/core';
import { RequestService } from './services/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   
  public genresList!: any[];

  constructor(private requestService: RequestService){
    this.getGenres();
  }

  getGenres(){
    this.requestService.getGenres().subscribe((resp: any) => {
      this.genresList = resp.genres;
      this.requestService.genresList = resp.genres;
    });
  }


}
