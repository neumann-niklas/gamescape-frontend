import { DatePipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { Game } from '../../models/game.model';
import { GroupPhaseComponent } from '../group-phase/group-phase.component';

@Component({
  selector: 'app-game-list',
  imports: [GroupPhaseComponent, DatePipe],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
