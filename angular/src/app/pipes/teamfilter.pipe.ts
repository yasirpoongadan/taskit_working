import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamfilter'
})
export class TeamfilterPipe implements PipeTransform {

  transform(teamfilter: any, searchTermTeam: any): any {
    if(searchTermTeam ===  undefined){
      return teamfilter;

    }
    return teamfilter.filter(function(pro){
      // console.log(pro);
      return pro.team_name.toLowerCase().includes(searchTermTeam.toLowerCase());
      
    })
  }
}
