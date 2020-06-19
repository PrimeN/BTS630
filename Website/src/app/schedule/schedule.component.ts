import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';

import { User, Class } from '../models';
import {
  isSameDay,
  isSameMonth,
  addMinutes
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { DataManagerService } from '../data-manager.service';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrls: ['/schedule.component.css'],
  styles: [
    `
      .fill-height {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
    `
  ]
})
export class ScheduleComponent implements OnInit {

  //Retrieve ViewChild (#content)
  @ViewChild('content')
  content: TemplateRef<any>;

  // Sets the calendar view
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  activeDayIsOpen: boolean;
  refresh: Subject<any> = new Subject();

  private userDisplay: User[];
  class: Class;
  events: CalendarEvent[] = [];
  token: boolean;

  eventsFilter = [];
  search = "";
  options = 1;

  eventSuccessfullyAdded: string = "";

  constructor(private modalService: NgbModal, private dataService: DataManagerService, private auth: AuthService) {
    this.activeDayIsOpen = false;
    this.token = false;

    //Set the class value
    this.resetClass();
  }



  ngOnInit() {

    this.dataService.isAdmin(this.auth.readToken()._id).subscribe(value => {
      this.token = value;
      this.refresh.next();

      //Admin
      if (value) {

        //Get all of the users
        this.dataService.getUsers().subscribe(value => this.userDisplay = value);

        //Get all of the classes
        this.dataService.getClasses().subscribe(data => {

          this.eventsFilter = data;
          //Iterate through the data recieved & add it to event array
          for (var i = 0; i < data.length; i++) {
            this.addToEventList(data[i]);
          }

          this.refresh.next();
        }, error => {
          console.log(error);
        })


      } else {

        //Get classes that only involve user
        this.dataService.getClassesForUser(this.auth.readToken()._id).subscribe(data => {

          //Iterate through the data recieved & add it to event array
          for (var i = 0; i < data.length; i++) {
            this.addToEventList(data[i]);
          }

          this.refresh.next();

        }, error => {
          console.log(error);
        })
      }

    })

  }



  // All of the actions that can be performed from detailed view (accessed by clicking on days with events)
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(String(event.id));
      }
    }
  ]



  //Open the modal
  openAddEventModal() {
    this.eventSuccessfullyAdded = null;
    this.modalService.open(this.content, { size: 'lg', centered: true }).result.then(() => { }, (endResult) => {
      this.resetClass();
    });
  }


  //Subscribe to remove an event & remove from calander view
  private deleteEvent(event: string) {
    this.dataService.deleteClass(event).subscribe(message => console.log(message), (error) => console.log("error: " + error), () => {

      this.events = this.events.filter(iEvent => iEvent.id !== event);
      this.eventsFilter = this.eventsFilter.filter(iEvent => iEvent._id !== event);

      if (this.events.length == 0) {
        this.activeDayIsOpen = false;
      }

      this.refresh.next();
    });

  }



  //Give a detailed view of current day || day selected
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
        if (events.length === 0) {
          this.class.ClassStart = date;
          this.class.ClassEnd = addMinutes(date, 45);
          this.openAddEventModal();
        }
      } else {
        this.activeDayIsOpen = true;
      }
    }

  }


  //Form submission & Check
  createNewActivity() {
    this.eventSuccessfullyAdded = null;
    this.dataService.createClass(this.class).subscribe((success) => {


      this.eventsFilter.push(success);
      this.addToEventList(success);
      this.resetClass();

      // Dismiss the modal
      this.modalService.dismissAll();

    }, error => {
      this.eventSuccessfullyAdded = error;

    })

  }


  // Reset Object Variable for another entry
  resetClass() {
    //Set the class value
    this.class = new Class();
    this.class.ClassColor = '#ad2121';
    this.class.ClassDescription = "";
    this.class.ClassTitle = "";
    this.class.ClassStart = new Date();
    this.class.ClassEnd = addMinutes((new Date()), 45);
    this.class.ClassLead = this.auth.readToken()._id;
  }



  //Add Events
  private addToEventList(current: Class) {

    var fillColors: any = {
      color: {
        primary: current.ClassColor
      }
    }

    //Add the names of the volunteers to the title - ease of accessibility for admins (conditional statement)
    //Set the actions only for admins (conditional statement)
    this.events.push({
      id: current._id,
      start: new Date(current.ClassStart),
      end: new Date(current.ClassEnd),
      title: ((this.token) ? (current.ClassTitle + " - " + current.ClassLead.FirstName + " - " + (current.Volunteers.map(name => (name.FirstName))).join(", ")) : current.ClassTitle),
      color: fillColors.color,
      actions: ((this.token) ? this.actions : null),
      resizable: {
        beforeStart: this.token,
        afterEnd: this.token,
      },
      draggable: this.token
    })

    this.refresh.next();
  }



  //Delete the class from modal
  delete() {
    this.deleteEvent(this.class._id);
    this.modalService.dismissAll();
  }


  //Update an existing class from modal
  update() {
    this.eventSuccessfullyAdded = null;
    if (this.class._id != "") {
      this.dataService.updateClass(this.class).subscribe((success) => {
        this.events = this.events.filter(iEvent => iEvent.id !== this.class._id);
        this.addToEventList(success);

        var pos = this.eventsFilter.map(function(e) { return e._id; }).indexOf(success._id);
        this.eventsFilter[pos] = success;

      }, error => {
        this.eventSuccessfullyAdded = error;
      }, () => {
        this.modalService.dismissAll();
      });
    }
  }


  //On click event change
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {

    var sendEvent = {
      _id: event.id,
      ClassStart: newStart,
      ClassEnd: newEnd
    }

    //Save change in database
    this.dataService.updateClassTime(sendEvent).subscribe((isSuccess) => console.log(isSuccess));

    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }


  //Event clicekd
  eventClicked({ event }: { event: CalendarEvent }): void {
    this.ViewEvent(event.id);
  }

  ViewEvent(id) {
    this.dataService.getClassById(String(id)).subscribe(data => this.class = data, error => console.log("error: " + error), () => {
      this.openAddEventModal();
    });
  }


  addEvent(date: Date): void {
    this.class.ClassStart = date;
    this.class.ClassEnd = addMinutes(date, 45);
    this.openAddEventModal();
    this.refresh.next();
  }

}