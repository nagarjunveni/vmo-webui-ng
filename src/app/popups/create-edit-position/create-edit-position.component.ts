import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { PositionService } from '../../services/position.service';
import { Position } from '../../models/position.model';

enum RateType {
  AMOUNT = 'amount',
  MONTHLY = 'monthly',
  HOURLY = 'hourly'
}

interface RateOption {
  label: string;
  value: RateType;
}

@Component({
  selector: 'app-create-edit-position',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    DropdownModule,
    TooltipModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './create-edit-position.component.html',
  styleUrl: './create-edit-position.component.scss'
})
export class CreateEditPositionComponent implements OnInit {
  positionForm!: FormGroup;
  isEditMode = false;
  loading = false;
  position?: Position;

  rateOptions: RateOption[] = [
    { label: 'Amount (Annual)', value: RateType.AMOUNT },
    { label: 'Monthly Rate', value: RateType.MONTHLY },
    { label: 'Hourly Rate', value: RateType.HOURLY }
  ];

  selectedRateType: RateType = RateType.AMOUNT;

  // Constants for calculations
  readonly HOURS_PER_YEAR = 2080;
  readonly HOURS_PER_MONTH = 160;
  readonly MONTHS_PER_YEAR = 12;

  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();

    if (this.config.data) {
      this.isEditMode = this.config.data.mode === 'edit';

      if (this.isEditMode && this.config.data.position) {
        this.position = this.config.data.position;
        this.populateForm(this.position);
      }
    }

    // Subscribe to rate type changes
    this.positionForm.get('rateType')?.valueChanges.subscribe((value: RateType) => {
      this.selectedRateType = value;
      this.updateFormControlsState();
      this.recalculateRates();
    });

    // Subscribe to amount changes
    this.positionForm.get('amount')?.valueChanges.subscribe(value => {
      if (this.selectedRateType === RateType.AMOUNT && value) {
        this.calculateFromAmount(value);
      }
    });

    // Subscribe to monthly rate changes
    this.positionForm.get('monthlyRate')?.valueChanges.subscribe(value => {
      if (this.selectedRateType === RateType.MONTHLY && value) {
        this.calculateFromMonthly(value);
      }
    });

    // Subscribe to hourly rate changes
    this.positionForm.get('hourlyRate')?.valueChanges.subscribe(value => {
      if (this.selectedRateType === RateType.HOURLY && value) {
        this.calculateFromHourly(value);
      }
    });

    // Initialize form control states
    this.updateFormControlsState();
  }

  initForm() {
    this.positionForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rateType: [RateType.AMOUNT, [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]],
      hourlyRate: [0, [Validators.required, Validators.min(0)]],
      monthlyRate: [0, [Validators.required, Validators.min(0)]],
      skills: ['', [Validators.required]],
      expertise: ['', [Validators.required]],
      status: [true]
    });
  }

  populateForm(position: Position) {
    // Set the form values
    this.positionForm.patchValue({
      title: position.title,
      description: position.description,
      amount: position.amount,
      hourlyRate: position.hourlyRate,
      monthlyRate: position.monthlyRate,
      skills: position.skills,
      expertise: position.expertise,
      status: position.status !== undefined ? position.status : true
    });

    // Keep the default rate type as AMOUNT
    this.selectedRateType = RateType.AMOUNT;
    this.positionForm.patchValue({ rateType: RateType.AMOUNT });

    // Update form control states based on selected rate type
    this.updateFormControlsState();
  }

  updateFormControlsState() {
    const amountControl = this.positionForm.get('amount');
    const monthlyRateControl = this.positionForm.get('monthlyRate');
    const hourlyRateControl = this.positionForm.get('hourlyRate');

    // Reset disabled state
    amountControl?.enable();
    monthlyRateControl?.enable();
    hourlyRateControl?.enable();

    // Disable controls based on selected rate type
    switch (this.selectedRateType) {
      case RateType.AMOUNT:
        monthlyRateControl?.disable();
        hourlyRateControl?.disable();
        break;
      case RateType.MONTHLY:
        amountControl?.disable();
        hourlyRateControl?.disable();
        break;
      case RateType.HOURLY:
        amountControl?.disable();
        monthlyRateControl?.disable();
        break;
    }
  }

  recalculateRates() {
    switch (this.selectedRateType) {
      case RateType.AMOUNT:
        const amount = this.positionForm.get('amount')?.value;
        if (amount) {
          this.calculateFromAmount(amount);
        }
        break;
      case RateType.MONTHLY:
        const monthlyRate = this.positionForm.get('monthlyRate')?.value;
        if (monthlyRate) {
          this.calculateFromMonthly(monthlyRate);
        }
        break;
      case RateType.HOURLY:
        const hourlyRate = this.positionForm.get('hourlyRate')?.value;
        if (hourlyRate) {
          this.calculateFromHourly(hourlyRate);
        }
        break;
    }
  }

  calculateFromAmount(amount: number) {
    const monthlyRate = amount / this.MONTHS_PER_YEAR;
    const hourlyRate = amount / this.HOURS_PER_YEAR;

    this.positionForm.patchValue({
      monthlyRate: this.roundToTwoDecimals(monthlyRate),
      hourlyRate: this.roundToTwoDecimals(hourlyRate)
    }, { emitEvent: false });
  }

  calculateFromMonthly(monthlyRate: number) {
    const amount = monthlyRate * this.MONTHS_PER_YEAR;
    const hourlyRate = monthlyRate / this.HOURS_PER_MONTH;

    this.positionForm.patchValue({
      amount: this.roundToTwoDecimals(amount),
      hourlyRate: this.roundToTwoDecimals(hourlyRate)
    }, { emitEvent: false });
  }

  calculateFromHourly(hourlyRate: number) {
    const amount = hourlyRate * this.HOURS_PER_YEAR;
    const monthlyRate = hourlyRate * this.HOURS_PER_MONTH;

    this.positionForm.patchValue({
      amount: this.roundToTwoDecimals(amount),
      monthlyRate: this.roundToTwoDecimals(monthlyRate)
    }, { emitEvent: false });
  }

  roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }

  onSubmit() {
    if (this.positionForm.invalid) {
      this.positionForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.positionForm.getRawValue(); // Get all values including disabled controls

    const positionData: Position = {
      title: formValue.title,
      description: formValue.description,
      amount: formValue.amount,
      hourlyRate: formValue.hourlyRate,
      monthlyRate: formValue.monthlyRate,
      skills: formValue.skills,
      expertise: formValue.expertise,
      status: formValue.status
    };

    if (this.isEditMode && this.position?.id) {
      this.positionService.updatePosition(this.position.id, positionData).subscribe({
        next: (result) => {
          this.loading = false;
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error updating position', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update position'
          });
        }
      });
    } else {
      this.positionService.createPosition(positionData).subscribe({
        next: (result) => {
          this.loading = false;
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error creating position', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create position'
          });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
