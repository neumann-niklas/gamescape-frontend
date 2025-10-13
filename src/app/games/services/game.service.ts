import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AddGame, Game, UpdateGame } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly gamesApiUrl: string = environment.apiUrl + '/games';

  constructor(private readonly httpClient: HttpClient) { }

  addGame(addGame: AddGame): Observable<Game> {
    return this.httpClient.post<Game>(this.gamesApiUrl, addGame);
  }

  getGame(id: string): Observable<Game> {
    return this.httpClient.get<Game>(`${this.gamesApiUrl}/${id}`);
  }

  getGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.gamesApiUrl);
  }

  updateGame(id: string, updateGame: UpdateGame): Observable<Game> {
    return this.httpClient.patch<Game>(`${this.gamesApiUrl}/${id}`, updateGame);
  }

  deleteGame(id: string): Observable<Game> {
    return this.httpClient.delete<Game>(`${this.gamesApiUrl}/${id}`);
  }
}
