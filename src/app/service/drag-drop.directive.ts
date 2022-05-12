import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter
} from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

export interface FileHandle {
  file: File;
  url: SafeUrl;
}

@Directive({
  selector: "[appDragDrop]"
})
export class DragDropDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();
  @HostBinding("style.border-color") public background = "#d2d2d2";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#FF9800";
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#d2d2d2";
  }

  @HostListener("drop", ["$event"]) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    let files: FileHandle[] = [];
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      const file = evt.dataTransfer.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );
      files.push({ file, url });
    }
    if (files.length > 0) {
      this.files.emit(files);
    } else {
      this.background = "#d2d2d2";
    }
  }
}
