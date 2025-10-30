import { Component, input, InputSignal } from '@angular/core';
import { GroupPhase } from '../../../features/games/models/group-phase.model';
import { GroupPhasePipe } from '../../pipes/group-phase-pipe';

@Component({
  selector: 'app-group-phase',
  imports: [GroupPhasePipe],
  templateUrl: './group-phase.component.html',
  styleUrl: './group-phase.component.scss'
})
export class GroupPhaseComponent {
  readonly groupPhase: InputSignal<GroupPhase> = input.required<GroupPhase>();

  get groupPhaseKey(): string {
    return GroupPhase[this.groupPhase()].toLowerCase();
  }

  getGroupPhaseSymbol(groupPhase: GroupPhase): string {
    switch (groupPhase) {
      case GroupPhase.Forming:
        return 'psychiatry';
      case GroupPhase.Storming:
        return 'bolt';
      case GroupPhase.Norming:
        return 'explore';
      case GroupPhase.Performing:
        return 'rocket';
      case GroupPhase.Adjourning:
        return 'celebration';
    }
  }
}
