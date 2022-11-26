import { Component, OnDestroy, OnInit } from '@angular/core';
import { MarketsService } from '../../../core/services/markets/markets.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MarketsModel } from '../../../core/models/markets.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
export class MarketsComponent implements OnInit, OnDestroy {

  markets: MarketsModel[] = [];
  filteredMarkets: MarketsModel[] = [];

  unSubscriber$ = new Subject();
  searchValue: string = '';

  constructor(private marketsService: MarketsService,private router:Router,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initMarkets();
  }

  initMarkets() {
    this.marketsService
      .getMarkets()
      .pipe(takeUntil(this.unSubscriber$))
      .subscribe((res) => {
        this.markets = res;
      }, (error) => {
        this.toastr.error('Beklenmeyen bir hata oluştu.');
      });
  }

  onClickMarketCode(marketCode: string) {
    this.router.navigate(['/markets', marketCode]);
  }

  onInputValue() {
    this.filteredMarkets = this.markets.filter((market) => {
      return market.marketCode.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
    });
  }

  get positiveChanges() {
    return this.filteredMarkets.filter((market) => +market.change24hPercent > 0);
  }

  get biggestChangePositive() {
    return this.filteredMarkets.sort((a, b) => +b.change24hPercent - +a.change24hPercent)[0];
  }

  get biggestChangeNegative() {
    return this.filteredMarkets.sort((a, b) => +a.change24hPercent - +b.change24hPercent)[0];
  }

  moreThan(moreThanValue: number) {
    return this.filteredMarkets.filter((market) => +market.currentQuote > moreThanValue);
  }

  lessThan(moreThanValue: number) {
    return this.filteredMarkets.filter((market) => +market.currentQuote < moreThanValue);
  }

  get mean() {
    return (this.filteredMarkets.reduce((a, b) => +a + +b.currentQuote, 0) / this.filteredMarkets.length);
  }

  get usd() {
    return this.markets.find((market) => market.marketCode === 'BTC-USDT');
  }

  ngOnDestroy() {
    this.unSubscriber$.next();
    this.unSubscriber$.complete();
  }


}
