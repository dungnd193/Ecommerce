import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IDataStatistic, IGetOrderInRangeTime, IImportedProductInRangeTime, IImportedProductStatistic } from '../../type/admin.type';
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
  private importedProductBS = new BehaviorSubject<IImportedProductStatistic[]>([]);

  get dataStatistic$() {
    return this.dataStatisticBS.asObservable();
  }
  get importedProductBS$() {
    return this.importedProductBS.asObservable();
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
  getImportedProductInRangeTime({startDate, endDate, productId, flag}: IImportedProductInRangeTime) {
    this.adminDashboardApiService.getImportedProductInRangeTime({startDate, endDate, productId, flag}).subscribe(
      (data: any) => {
        this.importedProductBS.next(data)
      },
      () => {
        this.toast.error('Get imported product in range time error!');
      }
    );
  }
}
