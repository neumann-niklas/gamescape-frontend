import { DatePipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { GroupPhasePipe } from '../../../../core/pipes/group-phase-pipe';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-list',
  imports: [DatePipe, GroupPhasePipe],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
