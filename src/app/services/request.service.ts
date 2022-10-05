import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap,map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getMovies(){
    return this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=6512d608041bdbb5b0d84ff99c9e727b').pipe(
      map((resp: any) => {
        let movies: any[] = [];
        resp.results.forEach((element:any) => {
          movies.push({
            img: 'https://image.tmdb.org/t/p/original/'+element.backdrop_path,
            id: element.id
          })
        });
        return movies;
      })
    )
  }

  getMovie(id: string){
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=6512d608041bdbb5b0d84ff99c9e727b').pipe(
      map((resp: any) => {
        return {
          img: 'https://image.tmdb.org/t/p/original/'+resp.poster_path,
          title: resp.original_title,
          description: resp.overview,
          date: resp.release_date,
          runtime: resp.runtime,
          votes: resp.vote_average,
          id: id.toString() 
        }
      })
    )
  }

  addMyList(id:string){
    const LIST = this.getList();
    localStorage.setItem('list',LIST+id+',');
  }

  checkList(id:string): boolean{
    const LIST = this.getList();
    if(LIST?.split(',').includes(id)) return true;
    return false;
  }

  getList(){
    if(localStorage.getItem('list') !== null){
      return localStorage.getItem('list');
    }
    return '';
  }
}
