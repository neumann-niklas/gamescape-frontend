import { DatePipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { GroupPhasePipe } from '../../../../core/pipes/group-phase-pipe';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-grid',
  imports: [DatePipe, GroupPhasePipe],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.scss'
})
export class GameGridComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
