import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { takeUntil } from 'rxjs/operators';
import { BalancesModel } from '../../../core/models/profile.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit, OnDestroy {

  balances: BalancesModel[];
  hideLowBalances = true;
  unSubscriber$ = new Subject();

  constructor(private profileService: ProfileService,private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.initBalances();
  }

  initBalances(): void {
    this.profileService
      .getBalances()
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe(
        (balances) => {
          if (balances.code === 0) {
            this.balances = balances.balances;
          }
        }, (error) => {
          this.toastr.error('Beklenmeyen bir hata oluştu.');
        }
      );
  }

  getBalances(): BalancesModel[] {
    if (!this.hideLowBalances) {
      return this.balances;
    } else {
      return this.balances.filter((balance) => balance.availableAmount > 1  );
    }
  }

  ngOnDestroy(): void {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }

}
