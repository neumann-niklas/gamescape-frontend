import { DatePipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { GroupPhaseComponent } from '../../../../core/components/group-phase/group-phase.component';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-list',
  imports: [DatePipe, GroupPhaseComponent],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  readonly games: InputSignal<Game[]> = input.required<Game[]>();
}
