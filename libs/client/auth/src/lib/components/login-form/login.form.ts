import { FormControl, FormGroup, Validators } from '@angular/forms';

export const loginForm = new FormGroup({
  username: new FormControl('kamil', Validators.required),
  password: new FormControl('123', Validators.required)
})
