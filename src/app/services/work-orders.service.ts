import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { StatementOfWork } from '../models/statement-of-work.model';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class WorkOrdersService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/statement-of-works`;
  constructor() { }

  getWorkOrders(): Observable<StatementOfWork[]> {
    return this.http.get<StatementOfWork[]>(`${this.apiUrl}`);
  }

  getWorkOrderById(id: number): Observable<StatementOfWork> {
    return this.http.get<StatementOfWork>(`${this.apiUrl}/${id}`);
  }

  createWorkOrder(workOrder: StatementOfWork): Observable<StatementOfWork> {
    return this.http.post<StatementOfWork>(`${this.apiUrl}`, workOrder);
  }

  updateWorkOrder(id: number, workOrder: StatementOfWork): Observable<StatementOfWork> {
    return this.http.put<StatementOfWork>(`${this.apiUrl}/${id}`, workOrder);
  }

  deleteWorkOrder(id: number): Observable<StatementOfWork>{
    return this.http.delete<StatementOfWork>(`${this.apiUrl}/${id}`);
  }

  generateWorkOrderPDF(workOrder: StatementOfWork): Blob {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // First Page
    this.addFirstPage(doc, pageWidth);

    // Second Page
    doc.addPage();
    this.addSecondPage(doc, pageWidth);

    // Third Page
    doc.addPage();
    this.addThirdPage(doc, pageWidth);

    return doc.output('blob');
  }

  private addFirstPage(doc: jsPDF, pageWidth: number) {
    // Add CompNova Logo (you'll need to replace this with actual logo)
    // doc.addImage('path_to_logo', 'PNG', 20, 20, 50, 20);

    // Header Address
    doc.setFontSize(8);
    doc.text('300 N Gulf Rd., Suite 340', pageWidth - 20, 20, { align: 'right' });
    doc.text('Rochester, NY 14580', pageWidth - 20, 25, { align: 'right' });
    doc.text('Tel: (877) 671-1900 Fax: (877) 671-1550', pageWidth - 20, 30, { align: 'right' });
    doc.text('Email: sales@compnova.com', pageWidth - 20, 35, { align: 'right' });

    // Date and Title
    doc.setFontSize(10);
    doc.text('02/12/2025', 20, 40);

    doc.setFontSize(14);
    doc.text('2025 IARS Event Processing 1.0', 20, 50);

    // Agreement Text
    doc.setFontSize(10);
    const agreementText = 'The Parties agree that the terms of this Statement of Work ("SOW") shall be subject to the terms of the Master Services Agreement between CSX Technology, Inc. ("CSX TECH"), and CompNova ("Service Provider"), dated July 27, 2015 (the "Agreement")';
    doc.text(agreementText, 20, 65, { maxWidth: pageWidth - 40 });

    // CSX Line Manager
    doc.text('CSX Line Manager:', 20, 85);
    doc.text('• Andrew Yadon', 30, 95);

    // Project ID
    doc.text('Project ID:', 20, 110);
    doc.text('• P0014483', 30, 120);

    // Project Description
    doc.text('Project Description:', 20, 135);
    const projectPoints = [
      'Modernizing the Intermodal Allocation Reservation System (IARS) by transitioning from a scheduler-based architecture to a real-time, event-driven architecture using Azure Service Bus.',
      'The modernization aims to enhance scalability, improve reliability, and streamline reservation lifecycle events. Additionally, MongoDB will be enhanced with a new "latest collection" to optimize performance of revolution information queries.',
      'Replace existing schedulers with Azure Service Bus delayed message queues for real-time processing of reservation lifecycle events.',
      'Update MongoDB to include a "latest collection" for operational queries while retaining the existing "history collection" for audit purposes.',
      'Implement enhanced logging and monitoring capabilities to provide better visibility into event processing and system performance'
    ];

    let yPos = 145;
    projectPoints.forEach(point => {
      doc.text('•', 30, yPos);
      doc.text(point, 40, yPos, { maxWidth: pageWidth - 60 });
      yPos += doc.splitTextToSize(point, pageWidth - 60).length * 7;
    });
  }

  private addSecondPage(doc: jsPDF, pageWidth: number) {
    doc.setFontSize(10);
    let yPos = 20;

    // Scrum as Service Deliverables
    doc.text('Scrum as Service Deliverables:', 20, yPos);
    yPos += 10;
    doc.text('Scrum as a Service Deliverables for this project focus primarily on the outcomes of the Agile Scrum process and', 20, yPos);
    yPos += 5;
    doc.text('include the following:', 20, yPos);
    yPos += 15;

    // Overall approach
    doc.text('• Overall approach:', 30, yPos);
    yPos += 10;
    const approachPoints = [
      'The vendor, not CSX TECH, will ensure that all personnel assigned to each Scrum team are appropriately qualified, trained and experienced to provide the services with all reasonable skill, care and diligence in accordance with the Scrum Methodology.',
      'The agreement will include an onsite Technical Lead to establish epics, stories, and high-level designs that will be delivered to the Scrum teams for software development.'
    ];
    approachPoints.forEach(point => {
      doc.text('•', 40, yPos);
      doc.text(point, 50, yPos, { maxWidth: pageWidth - 70 });
      yPos += doc.splitTextToSize(point, pageWidth - 70).length * 7;
    });

    // Within the Agile Framework
    yPos += 10;
    doc.text('• Within the Agile Framework, the following activities conducted by the Scrum as a Service team are subject to', 30, yPos);
    yPos += 5;
    doc.text('approval by CSX tech:', 30, yPos);
    yPos += 10;

    const frameworkPoints = [
      'Sprint Planning discussions of the sprint goal and the scope of work that is intended to be completed during the Sprint.',
      'Scrum of Scrums used for backlog refinement and iterative release planning as needed.'
    ];
    frameworkPoints.forEach(point => {
      doc.text('•', 40, yPos);
      doc.text(point, 50, yPos, { maxWidth: pageWidth - 70 });
      yPos += doc.splitTextToSize(point, pageWidth - 70).length * 7;
    });

    // Compliance and reporting
    yPos += 10;
    doc.text('• Compliance and reporting on standard Agile practices for the vendor Scrum as a Service team will', 30, yPos);
    yPos += 5;
    doc.text('include:', 30, yPos);
    yPos += 10;

    const compliancePoints = [
      'Agreement on the Definition of Ready and Definition of Done for work items.',
      'Vendor practices include orchestration of standard Agile ceremonies.',
      'Reporting to include Velocity and Burn Down at the completion of a sprint.',
      'Vendor practices to include Emergency Procedures to leverage if development capacity becomes available.'
    ];
    compliancePoints.forEach(point => {
      doc.text('•', 40, yPos);
      doc.text(point, 50, yPos, { maxWidth: pageWidth - 70 });
      yPos += doc.splitTextToSize(point, pageWidth - 70).length * 7;
    });
  }

  private addThirdPage(doc: jsPDF, pageWidth: number) {
    doc.setFontSize(10);
    let yPos = 20;

    // Terms and Conditions
    doc.text('Terms and Conditions:', 20, yPos);
    yPos += 15;

    const termsPoints = [
      'Payment terms are net 30 days.',
      'There are estimated monthly costs and may be adjusted based on resource vacation, etc.',
      'CSX can terminate the project, for any or no reason by giving a 30 day notice.',
      'Invoices will be sent to CSX per the payment schedule mentioned above.',
      'A standard 40-hour billable work week is assumed.',
      'The amount shown in the invoice amount column will be based on actual effort spent and will not include periods of un-availability like vacations and holidays.'
    ];

    termsPoints.forEach(point => {
      doc.text('•', 30, yPos);
      doc.text(point, 40, yPos, { maxWidth: pageWidth - 60 });
      yPos += doc.splitTextToSize(point, pageWidth - 60).length * 7;
    });

    // Invoice Schedule
    yPos = doc.internal.pageSize.height - 100;
    doc.text('Invoice Schedule:', 20, yPos);
    doc.setFontSize(9);

    // Table headers
    const headers = ['Month', 'Hours (Excluding CSX Holidays)', 'Amount'];
    let xPos = 20;
    headers.forEach(header => {
      doc.text(header, xPos, yPos + 10);
      xPos += 70;
    });

    // Table data
    const invoiceData = [
      ['March 2025', '168', ''],
      ['April 2025', '176', ''],
      ['May 2025', '168', ''],
      ['June 2025', '168', ''],
      ['July 2025', '176', ''],
      ['August 2025', '80', '']
    ];

    yPos += 15;
    invoiceData.forEach(row => {
      xPos = 20;
      row.forEach(cell => {
        doc.text(cell, xPos, yPos);
        xPos += 70;
      });
      yPos += 7;
    });

    // Signature section
    yPos += 20;
    doc.text('Client Name', 20, yPos);
    doc.text('CSX Technology, Inc', 100, yPos);

    yPos += 15;
    doc.text('Client Signature ____________________', 20, yPos);
    doc.text('Date ____________________', 150, yPos);

    yPos += 15;
    doc.text('Print Name ____________________', 20, yPos);

    yPos += 15;
    doc.text('Vendor Name', 20, yPos);
    doc.text('CompNova, LLC', 100, yPos);

    yPos += 15;
    doc.text('Vendor Signature ____________________', 20, yPos);
    doc.text('Date ____________________', 150, yPos);

    yPos += 15;
    doc.text('Print Name', 20, yPos);
    doc.text('Nick Purswani', 100, yPos);
  }
}


