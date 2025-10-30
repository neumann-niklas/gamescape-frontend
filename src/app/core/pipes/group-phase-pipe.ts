import { Pipe, PipeTransform } from '@angular/core';
import { GroupPhase } from '../../features/games/models/group-phase.model';

@Pipe({
  name: 'groupPhase'
})
export class GroupPhasePipe implements PipeTransform {
  transform(groupPhase: GroupPhase): string {
    return GroupPhase[groupPhase];
  }
}
