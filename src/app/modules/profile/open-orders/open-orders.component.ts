import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OpenOrdersModel } from '../../../core/models/profile.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.scss']
})
export class OpenOrdersComponent implements OnInit, OnDestroy {

  openOrders: OpenOrdersModel[] = [];
  unSubscriber$ = new Subject();

  constructor(private profile: ProfileService,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initOpenOrders();
  }

  initOpenOrders(): void {
    this.profile.getOpenOrders()
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((res) => {
        if (res.code === 0) {
          this.openOrders = res.openOrders;
        }
      }, (error) => {
        this.toastr.error('Beklenmeyen bir hata oluştu.');
      })
  }

  fillPercent(fillAmount: number, orderAmount: number): number {
    return (fillAmount / orderAmount) * 100
  }

  ngOnDestroy() {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }

}
