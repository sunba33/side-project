import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileModel } from '../../../core/models/profile.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profile: ProfileModel;
  unSubscriber$ = new Subject();

  constructor(private profileService: ProfileService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initProfile();
  }

  initProfile() {
    this.profileService.getProfile().pipe(takeUntil(this.unSubscriber$)).subscribe((res) => {
      if (res.code === 0) {
        this.profile = res.me;
      }
    }, (error) => {
      this.toastr.error('Beklenmeyen bir hata oluştu.');
    });
  }

  ngOnDestroy() {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }
}
