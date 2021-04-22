import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'multivendor-fullstack-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SingleUserComponent  {
  @Input() user: SimpleUser;
  @Input() isMe: boolean;
  @Output() roleChanged = new EventEmitter<string>()


  public onRoleChange(event: MatSelectChange) {
    this.roleChanged.emit(event.value)
  }
}
