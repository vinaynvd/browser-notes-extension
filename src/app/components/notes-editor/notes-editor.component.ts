import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { $ } from 'protractor';
import { globalConfig } from 'src/app/global-config.constants';
declare const MediumEditor: any;

@Component({
  selector: 'app-notes-editor',
  templateUrl: './notes-editor.component.html',
  styleUrls: ['./notes-editor.component.scss']
})
export class NotesEditorComponent implements AfterViewInit {

  editor: any;
  storedItem: any = localStorage.getItem("userInput");
  globalConfig = globalConfig;
  @ViewChild('editable', {static: true}) editable: ElementRef

  constructor() { }

  ngAfterViewInit() {
    this.editor = new MediumEditor(this.editable.nativeElement, this.globalConfig);
    
    this.editor.subscribe('editableInput', (eventObj) => {
      let userInput = eventObj.target.innerHTML;
      this.storedItem = localStorage.getItem("userInput");
      if (this.storedItem) {
        localStorage.removeItem("userInput");
        localStorage.setItem("userInput", userInput);
      } else {
        this.storedItem = localStorage.getItem("userInput");
        localStorage.setItem("userInput", userInput);
      }
    });

    this.loadContent();
  }

  loadContent() {
    if (this.storedItem) {
      this.editable.nativeElement.click();
      this.editable.nativeElement.innerHTML = this.storedItem;
    }
  }

  exportData() {
    const editorContent = this.editor.getContent();
    if (editorContent) {
      this.exportNotes(editorContent);
    } else {
      const storedContent = localStorage.getItem("userInput");
      this.exportNotes(storedContent);
    }
  }

  generateFileName() {
    const today = new Date();
    const todayToISO = today.toISOString();
    return 'Browser_notes_' + todayToISO + '_notes.html';
  }

  exportNotes(editorContent) {
    let anchor = document.querySelector("a");
    anchor.setAttribute('download', this.generateFileName());
    anchor.setAttribute('href', 'data:text/html;charset=UTF-8,' + encodeURIComponent(editorContent));
  }
}
