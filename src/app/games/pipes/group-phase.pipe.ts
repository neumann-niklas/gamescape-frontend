import { Pipe, PipeTransform } from '@angular/core';
import { GroupPhase } from '../models/group-phase.enum';

@Pipe({
  name: 'groupPhase'
})
export class GroupPhasePipe implements PipeTransform {
  transform(groupPhase: GroupPhase): string {
    return GroupPhase[groupPhase];
  }
}
