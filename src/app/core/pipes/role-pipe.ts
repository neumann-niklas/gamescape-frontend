import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../models/user.model';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(role: Role): string {
    return Role[role];
  }
}
