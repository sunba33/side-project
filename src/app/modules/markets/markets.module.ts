import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketsRoutingModule } from './markets-routing.module';
import { MarketsComponent } from './markets/markets.component';
import { FormsModule } from '@angular/forms';
import { MarketDetailComponent } from './market-detail/market-detail.component';


@NgModule({
  declarations: [
    MarketsComponent,
    MarketDetailComponent
  ],
    imports: [
        CommonModule,
        MarketsRoutingModule,
        FormsModule
    ]
})
export class MarketsModule { }
