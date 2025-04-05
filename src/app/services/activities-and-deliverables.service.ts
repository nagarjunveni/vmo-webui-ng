import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesAndDeliverablesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/activities-and-deliverables`;

  getActivitiesAndDeliverablesBySOWId(sowId: number) {
    return this.http.get<any[]>(`${this.apiUrl}?sowId=${sowId}`);
  }

  createActivityAndDeliverable(activityAndDeliverable: any) {
    return this.http.post<any>(this.apiUrl, activityAndDeliverable);
  }

  updateActivityAndDeliverable(
    activityAndDeliverableId: number,
    activityAndDeliverable: any
  ) {
    return this.http.put<any>(
      `${this.apiUrl}/${activityAndDeliverableId}`,
      activityAndDeliverable
    );
  }

  deleteActivityAndDeliverable(activityAndDeliverableId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${activityAndDeliverableId}`);
  }
}
