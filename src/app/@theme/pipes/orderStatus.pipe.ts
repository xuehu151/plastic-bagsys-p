import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderStatus' })
export class OrderStatusPipe implements PipeTransform {

    transform ( value: number ) {
        let orderStatus;
        switch ( value ) {
            case 1:
                orderStatus = '待支付';
                break;
            case 2:
                orderStatus = '已支付';
                break;
            case 3:
                orderStatus = '已发货';
                break;
            default:
                orderStatus = '未知';
        }
        return orderStatus;
    }
}

@Pipe({ name: 'businessStatus' })
export class BusinessStatusPipe implements PipeTransform {

    transform ( value: number ) {
        let businessStatus;
        switch ( value ) {
            case 1:
                businessStatus = '未处理';
                break;
            case 2:
                businessStatus = '成功';
                break;
            case 3:
                businessStatus = '异常';
                break;
            default:
                businessStatus = '未知';
        }
        return businessStatus;
    }
}

@Pipe({ name: 'purchaseStatus' })
export class PurchaseStatusPipe implements PipeTransform {

    transform ( value: number ) {
        let purchaseStatus;
        switch ( value ) {
            case 1:
                purchaseStatus = '待付款';
                break;
            case 2:
                purchaseStatus = '已付款';
                break;
            case 3:
                purchaseStatus = '已发货';
                break;
            default:
                purchaseStatus = '未知';
        }
        return purchaseStatus;
    }
}

