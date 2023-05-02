import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {mediaExtensionResolver} from "./media-extension-resolver.helper";

// export function notMedia(url: string): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const notMedia = !mediaExtensionResolver(url);
//     return notMedia ? {wrongURL: 'Choose another link'} : null;
//   };
// }

export const notMedia: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const url = control.get('url');
  console.log('notMedia', mediaExtensionResolver(url as any))

  return url && !mediaExtensionResolver(url as any) ? { identityRevealed: true } : null;
};
