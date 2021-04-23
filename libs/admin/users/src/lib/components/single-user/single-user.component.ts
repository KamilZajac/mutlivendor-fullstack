import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation, SimpleChange } from '@angular/core';
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
  @Output() userUpdated = new EventEmitter<SimpleUser>()
  @Output() userRemoved = new EventEmitter<string>()


  public onRoleChange(event: MatSelectChange) {
    const updatedUser: SimpleUser = {
      ...this.user,
      role: event.value
    }

    this.userUpdated.emit(updatedUser)
  }

  public onDeleteClicked() {
    const confirmDelete = confirm('are you sure you want to delete this user?');

    if(confirmDelete) {
      this.userRemoved.emit(this.user.id)
    }
  }
}
