import { Pipe, PipeTransform } from '@angular/core';
import { User, Class } from '../app/models';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], searchText: any, options: any): any {
    if (!value) {
      return [];
    }

    if (!searchText) {
      return value;
    }

    console.log(searchText, options);
    searchText = searchText.toLowerCase();

    //Event Name
    if(options == 1){
      return value.filter( event =>{
        return event.ClassTitle.toLowerCase().includes(searchText);
      })
    }else if(options == 2){ //Volunteer Name

      return value.filter(event => {
        var name = event.ClassLead.FirstName + " " + event.ClassLead.LastName;
        if(name.toLowerCase().includes(searchText)){
          return true;
        }

        for(var i = 0; i < event.Volunteers.length; i++){
          var vName = event.Volunteers[i].FirstName + " " + event.Volunteers[i].LastName;
          if(vName.toLowerCase().includes(searchText)){
            return true;
          }
        }
      })
    } else{
      return value.filter(volunteer => {
        var name = volunteer.FirstName + " " + volunteer.LastName;
        return name.toLowerCase().includes(searchText);
      })
    }

  }

}
