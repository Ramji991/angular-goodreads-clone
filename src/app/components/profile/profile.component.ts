import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  avatarUrl: string;
  loading = false;
  errorMessage: string;
  successMessage: string;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    this.profileForm = this.fb.group({
      username: [currentUser.username],
      email: [currentUser.email],
      avatar: [null],
    });

    this.avatarUrl = currentUser.avatarUrl || 'https://picsum.photos/200?random=1'; // Default avatar
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;
    const formData = new FormData();
    formData.append('username', this.profileForm.get('username').value);
    formData.append('email', this.profileForm.get('email').value);

    if (this.profileForm.get('avatar').value) {
      formData.append('avatar', this.profileForm.get('avatar').value);
    }

    this.authService.updateProfile(formData).subscribe(
      (response) => {
        this.loading = false;
        this.successMessage = 'Profile updated successfully';
        this.errorMessage = null;
        this.avatarUrl = response.avatarUrl;
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to update profile';
        this.successMessage = null;
      }
    );
  }

  onAvatarChange(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.profileForm.patchValue({ avatar: file });
    this.profileForm.get('avatar').updateValueAndValidity();

    // Preview the new avatar
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
