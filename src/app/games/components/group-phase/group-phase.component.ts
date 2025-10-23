import { Component, input, InputSignal } from '@angular/core';
import { GroupPhase } from '../../models/group-phase.enum';
import { GroupPhasePipe } from '../../pipes/group-phase.pipe';

@Component({
  selector: 'app-group-phase',
  imports: [GroupPhasePipe],
  templateUrl: './group-phase.component.html',
  styleUrl: './group-phase.component.scss'
})
export class GroupPhaseComponent {
  readonly groupPhase: InputSignal<GroupPhase> = input.required<GroupPhase>();

  get groupPhaseClass(): string {
    return GroupPhase[this.groupPhase()].toLowerCase();
  }
}
