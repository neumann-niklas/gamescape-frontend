import { DatePipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { GroupPhaseComponent } from '../../../../core/components/group-phase/group-phase.component';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-grid',
  imports: [DatePipe, GroupPhaseComponent],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.scss'
})
export class GameGridComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
