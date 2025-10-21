import { Component, input, InputSignal } from '@angular/core';
import { Game } from '../../models/game.model';
import { GroupPhasePipe } from '../../pipes/group-phase.pipe';

@Component({
  selector: 'app-game-list',
  imports: [GroupPhasePipe],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
