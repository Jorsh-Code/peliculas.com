import { Component, OnInit,HostListener } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { DescriptionComponent } from '../description/description.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  public movies: any[] = []; 
  public count: number = 1;

  constructor(private requestService: RequestService,public dialog: MatDialog,private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      param =>{
        if(param['movie'] !== undefined){
          const ID_GENRE: number = this.requestService.getIdGenre(param['movie']);
          this.getMoviesByGenre(ID_GENRE);
        }else{
          this.getMovies(this.count);
        }
      }
    )
    
  }

  getMovies(page:number){
    this.requestService.getMovies(this.count).subscribe((resp: any) =>{
      this.movies = this.movies.concat(resp);
    });
  }

  getMoviesByGenre(genre: number){
    this.requestService.getMovieByGenre(genre).subscribe((resp: any) =>{
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

  @HostListener("scroll", ['$event'])
  onScroll($event:Event): void {
    /*console.log(($event.target as HTMLDivElement).scrollTop,($event.target as HTMLDivElement).scrollHeight,window.innerHeight )
    console.log();*/
    
    if (this.bottomReached(($event.target as HTMLDivElement))) {
      this.count++;
      (console.log(this.count));
      this.getMovies(this.count);
      //console.log(this.count);
    }
  }

  bottomReached(div: HTMLDivElement): boolean {
    return (div.scrollTop + 540) >= div.scrollHeight;
  }

}
