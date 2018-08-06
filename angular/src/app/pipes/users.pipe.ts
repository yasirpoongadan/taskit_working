import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'users'
})
export class UsersPipe implements PipeTransform {

  transform(users: any, searchTermTeam: any): any {
    if(searchTermTeam ===  undefined){
      return users;

    }
    return users.filter(function(pro){
       console.log(pro);
      // return pro.f_name.toLowerCase().includes(searchTermTeam.toLowerCase());
      return pro.f_name.toLowerCase().includes(searchTermTeam.toLowerCase())
      || pro.l_name.toLowerCase().includes(searchTermTeam.toLowerCase())
      || pro.email.toLowerCase().includes(searchTermTeam.toLowerCase())
      || pro.contact_no.toLowerCase().includes(searchTermTeam.toLowerCase())
    })
  }

}
