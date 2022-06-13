import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  constructor(private settingsService: SettingsService) { }

  convertDateToSettingsFormat(date: string): string{
    let nextHarvestDate = new Date(date);
    return nextHarvestDate.toLocaleDateString(this.settingsService.getLocale(), {timeZone: this.settingsService.getTimeZone()});
  }
}
