import { Component, ViewEncapsulation } from '@angular/core';
import { MultiSelectComponent } from '@syncfusion/ej2-ng-dropdowns';
@Component({
    selector: 'control-content',
    templateUrl: 'default.html',
    styleUrls: ['style.css'],
    encapsulation: ViewEncapsulation.None
})
export class DefaultMultiselectComponent {
    public sportsData: Object[] = [
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' }
    ];
    public fields: Object = { text: 'Game', value: 'Id' };
    public waterMark: string = 'Favorite Sports';
    public default : string = 'default';
    public box : string = 'box';
    public delimiter : string = 'delimiter';
}