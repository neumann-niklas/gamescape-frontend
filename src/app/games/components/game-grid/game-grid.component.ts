import { Component, input, InputSignal } from '@angular/core';
import { Game } from '../../models/game.model';
import { GroupPhasePipe } from '../../pipes/group-phase.pipe';

@Component({
  selector: 'app-game-grid',
  imports: [GroupPhasePipe],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.scss'
})
export class GameGridComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
