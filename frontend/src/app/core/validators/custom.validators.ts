import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  // Indian 10-digit mobile validator
  static phone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^[6-9]\d{9}$/.test(control.value);
      return valid ? null : { invalidPhone: true };
    };
  }

  // Indian 6-digit postal code validator
  static pincode(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^\d{6}$/.test(control.value);
      return valid ? null : { invalidPincode: true };
    };
  }

  // Strong password validator: 8+ chars, uppercase, lowercase, number, special char
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const hasUpper = /[A-Z]/.test(control.value);
      const hasLower = /[a-z]/.test(control.value);
      const hasNumber = /\d/.test(control.value);
      const hasSpecial = /[@$!%*?&#]/.test(control.value);
      const hasLength = control.value.length >= 8;

      const valid = hasUpper && hasLower && hasNumber && hasSpecial && hasLength;
      return valid ? null : {
        weakPassword: {
          hasUpper,
          hasLower,
          hasNumber,
          hasSpecial,
          hasLength
        }
      };
    };
  }

  // Age between min and max (e.g. 18 to 65)
  static ageRange(minAge: number, maxAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < minAge || age > maxAge) {
        return { ageOutOfRange: { currentAge: age, minAge, maxAge } };
      }
      return null;
    };
  }

  // Confirm password match validator
  static matchFields(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;
      const matchingControl = control.parent.get(matchTo);
      if (!matchingControl) return null;

      if (matchingControl.value !== control.value) {
        return { fieldsMismatched: true };
      }
      return null;
    };
  }

  // Future date validator
  static futureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const date = new Date(control.value);
      const now = new Date();
      return date > now ? null : { dateInPast: true };
    };
  }

  // Minimum weight validator (e.g. 45 kg)
  static minWeight(minKg: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === undefined || control.value === '') return null;
      const weight = Number(control.value);
      return weight >= minKg ? null : { weightUnderMin: { currentWeight: weight, minWeight: minKg } };
    };
  }
}
