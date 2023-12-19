import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IDataStatistic, IGetOrderInRangeTime } from '../../type/admin.type';
import { AdminDashboardApiService } from './admin-dashboard-api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  constructor(
    private adminDashboardApiService: AdminDashboardApiService,
    private toast: ToastrService,
  ) {}
  private dataStatisticBS = new BehaviorSubject<IDataStatistic[]>([]);

  get dataStatistic$() {
    return this.dataStatisticBS.asObservable();
  }

  getOrderInRangeTime({startDate, endDate, productId}: IGetOrderInRangeTime) {
    this.adminDashboardApiService.getOrderInRangeTime({startDate, endDate, productId}).subscribe(
      (data: any) => {
        this.dataStatisticBS.next(data)
      },
      () => {
        this.toast.error('Get order in range time error!');
      }
    );
  }
}
