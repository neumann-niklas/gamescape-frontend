import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AddGame, Game, QueryGame, UpdateGame } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly httpClient: HttpClient = inject<HttpClient>(HttpClient);

  private readonly gamesApiUrl: string = environment.apiUrl + '/games';

  addGame(addGame: AddGame): Observable<Game> {
    return this.httpClient.post<Game>(this.gamesApiUrl, addGame);
  }

  getGames(queryGame?: QueryGame): Observable<Game[]> {
    if (!queryGame) return this.httpClient.get<Game[]>(this.gamesApiUrl);

    let httpParams: HttpParams = new HttpParams();
    Object.entries(queryGame).forEach(([key, value]) => {
      if (value !== undefined && value !== null) httpParams = httpParams.append(key, value);
    });

    return this.httpClient.get<Game[]>(this.gamesApiUrl, { params: httpParams });
  }

  getGame(id: string): Observable<Game> {
    return this.httpClient.get<Game>(`${this.gamesApiUrl}/${id}`);
  }

  updateGame(id: string, updateGame: UpdateGame): Observable<Game> {
    return this.httpClient.patch<Game>(`${this.gamesApiUrl}/${id}`, updateGame);
  }

  deleteGame(id: string): Observable<Game> {
    return this.httpClient.delete<Game>(`${this.gamesApiUrl}/${id}`);
  }
}
