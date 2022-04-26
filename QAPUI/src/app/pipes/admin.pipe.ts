import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {

  transform(value: any): any {
    if(value == 1){
      return "Admin";
    }else {
      return "Kullanıcı";
    }
  }

}
