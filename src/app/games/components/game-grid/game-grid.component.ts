import { DatePipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { Game } from '../../models/game.model';
import { GroupPhaseComponent } from '../group-phase/group-phase.component';

@Component({
  selector: 'app-game-grid',
  imports: [GroupPhaseComponent, DatePipe],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.scss'
})
export class GameGridComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
