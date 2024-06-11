import { CommonModule } from '@angular/common';
import { Component, Injectable, computed, signal } from '@angular/core';
import { LoggerService } from './logger-service';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p *ngFor="let log of logs">
      {{ log.time | date: 'hh:mm:ss' }}: {{ log.message }}
    </p>
  `
})
export class LoggerComponent {
  logs: Log[] = [];
  logsAsync = this.logger.getLogs();
  constructor (private logger: LoggerService) { 
     this.logger.getLogs().subscribe(
       logs => {
         this.logs = logs.sort((a, b) => a.id - b.id);  
      }
    );

  }

}

export interface Log {
  id: number;
  time: Date;
  message: string;
}

