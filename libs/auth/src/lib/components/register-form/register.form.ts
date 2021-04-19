import { FormControl, FormGroup, Validators } from '@angular/forms';

export const registerForm = new FormGroup({
  username: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required)
})
