import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MarketsService } from '../../../core/services/markets/markets.service';
import { MarketsModel } from '../../../core/models/markets.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss']
})
export class MarketDetailComponent implements OnInit, OnDestroy {

  market: MarketsModel;
  selectedMarket: string;
  unSubscriber$ = new Subject();

  constructor(private marketsService: MarketsService, private actRouter: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.actRouter.params.pipe(takeUntil(this.unSubscriber$)).subscribe((res) => {
      this.selectedMarket = res.marketCode;
      this.initMarket();
    });
  }

  initMarket() {
    this.marketsService
      .getMarkets()
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((res) => {
        this.market = res.find((market) => market.marketCode === this.selectedMarket);
      }, (error) => {
        this.toastr.error('Beklenmeyen bir hata oluştu.');
      });
  }

  ngOnDestroy() {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }

}
