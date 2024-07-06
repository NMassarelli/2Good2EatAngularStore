import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../services/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a message with the MessageService */
  public log(message: string, service = 'errorService',) {
    this.messageService.add(`${service}: ${message}`);
  }
}

