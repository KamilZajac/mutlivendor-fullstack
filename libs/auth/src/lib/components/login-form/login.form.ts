import { FormControl, FormGroup, Validators } from '@angular/forms';

export const loginForm = new FormGroup({
  username: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
})
