import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewproject'
})
export class ViewprojectPipe implements PipeTransform {

  transform(viewproject: any, searchTermTeam: any): any {
    if(searchTermTeam ===  undefined){
      return viewproject;

    }
    return viewproject.filter(function(pro){
       console.log(pro);
      // return pro.f_name.toLowerCase().includes(searchTermTeam.toLowerCase());
      return pro.module_name.toLowerCase().includes(searchTermTeam.toLowerCase())
     
    })
  }

}
