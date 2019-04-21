import { Component, OnInit, Input, Output, ViewChild, EventEmitter, Renderer2, Inject, forwardRef, AfterContentInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EditorService } from '../../service/editor.service';
import { EditorToolbarComponent } from '../editor-toolbar/editor-toolbar.component';
import { AngularEditorConfig, angularEditorConfig } from '../../interface/editor';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'aq-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true
    }
  ]
})
export class EditorComponent implements OnInit, ControlValueAccessor, AfterContentInit {

  private onChange: (value: string) => void
  private onTouched: () => void

  placeholder: boolean
  modeVisual = true
  showPlaceholder = false
  @Input() id = ''
  @Input() config: AngularEditorConfig = angularEditorConfig
  @ViewChild('editor') textArea: any
  @ViewChild('editorWrapper') editorWrapper: any
  @ViewChild('editorToolbar') editorToolbar: EditorToolbarComponent
  @Output() html
  @Output() viewMode = new EventEmitter<boolean>()
  @Output() blur: EventEmitter<string> = new EventEmitter<string>()
  @Output() focus: EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private _renderer: Renderer2, 
    private editorService: EditorService, 
    @Inject(DOCUMENT) private _document: any) {
  }

  ngOnInit() {
    this.editorToolbar.id = this.id;
    this.editorToolbar.fonts = this.config.fonts ? this.config.fonts : angularEditorConfig.fonts;
    this.editorToolbar.customClasses = this.config.customClasses;
    this.editorService.uploadUrl = this.config.uploadUrl;
    if (this.config.showToolbar !== undefined) {
      this.editorToolbar.showToolbar = this.config.showToolbar;
    }
    if (this.config.defaultParagraphSeparator) {
      this.editorService.setDefaultParagraphSeparator(this.config.defaultParagraphSeparator);
    }
  }

  ngAfterContentInit() {
    if (this.config.defaultFontName) {
      this.editorToolbar.defaultFontId = this.config.defaultFontName ? this.editorToolbar.fonts.findIndex(x => {
        return x.name === this.config.defaultFontName;
      }) : 0;
      this.editorToolbar.fontId = this.editorToolbar.defaultFontId;
      this.onEditorFocus();
      this.editorService.setFontName(this.config.defaultFontName);
    } else {
      this.editorToolbar.defaultFontId = 0;
      this.editorToolbar.fontId = 0;
    }
    if (this.config.defaultFontSize) {
      this.editorToolbar.fontSize = this.config.defaultFontSize;
      this.onEditorFocus();
      this.editorService.setFontSize(this.config.defaultFontSize);
    }
  }

  executeCommand(command: string) {
    if (command === 'toggleEditorMode') {
      this.toggleEditorMode(this.modeVisual);
    } else if (command !== '') {
      this.editorService.executeCommand(command);
      this.exec();
    }

    this.onEditorFocus();
  }

  onTextAreaFocus(): void {
    this.focus.emit('focus');
  }

  onTextAreaBlur(event: FocusEvent) {
    this.editorService.saveSelection()
    if (typeof this.onTouched === 'function') {
      this.onTouched()
    }
    if (event.relatedTarget != null && (event.relatedTarget as HTMLElement).parentElement.className !== 'angular-editor-toolbar-set') {
      this.blur.emit('blur')
    }
  }

  onEditorFocus() {
    this.textArea.nativeElement.focus()
  }

  onContentChange(html: string): void {
    if (typeof this.onChange === 'function') {
      this.onChange(html);
      if ((!html || html === '<br>' || html === '') !== this.showPlaceholder) {
        this.togglePlaceholder(this.showPlaceholder);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if ((!value || value === '<br>' || value === '') !== this.showPlaceholder) {
      this.togglePlaceholder(this.showPlaceholder);
    }
    if (value === null || value === undefined || value === '' || value === '<br>') {
      value = null;
    }
    this.refreshView(value);
  }

  refreshView(value: string): void {
    const normalizedValue = value === null ? '' : value
    this._renderer.setProperty(this.textArea.nativeElement, 'innerHTML', normalizedValue)
    return
  }

  togglePlaceholder(value: boolean): void {
    if (!value) {
      this._renderer.addClass(this.editorWrapper.nativeElement, 'show-placeholder');
      this.showPlaceholder = true;
    } else {
      this._renderer.removeClass(this.editorWrapper.nativeElement, 'show-placeholder');
      this.showPlaceholder = false;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    const div = this.textArea.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this._renderer[action](div, 'disabled');
  }

  toggleEditorMode(bToSource: boolean) {
    let oContent: any;
    const editableElement = this.textArea.nativeElement;

    if (bToSource) {
      oContent = this._document.createTextNode(editableElement.innerHTML);
      editableElement.innerHTML = '';

      const oPre = this._document.createElement('pre');
      oPre.setAttribute("style", "margin: 0; outline: none;");
      const oCode = this._document.createElement('code');
      editableElement.contentEditable = false;
      oCode.id = "sourceText";
      oCode.setAttribute("style", "white-space: pre-wrap; word-break: keep-all; margin: 0; outline: none; background-color: #fff5b9;");
      oCode.contentEditable = 'true';
      oCode.appendChild(oContent);
      oPre.appendChild(oCode);
      editableElement.appendChild(oPre);

      this._document.execCommand("defaultParagraphSeparator", false, "div");

      this.modeVisual = false;
      this.viewMode.emit(false);
      oCode.focus();
    } else {
      if (this._document.all) {
        editableElement.innerHTML = editableElement.innerText;
      } else {
        oContent = this._document.createRange();
        oContent.selectNodeContents(editableElement.firstChild);
        editableElement.innerHTML = oContent.toString();
      }
      editableElement.contentEditable = true;
      this.modeVisual = true;
      this.viewMode.emit(true);
      this.onContentChange(editableElement.innerHTML);
      editableElement.focus();
    }
    this.editorToolbar.setEditorMode(!this.modeVisual);
  }

  exec() {
    this.editorToolbar.triggerButtons();

    let userSelection;
    if (window.getSelection) {
      userSelection = window.getSelection();
    }

    let a = userSelection.focusNode;
    const els = [];
    while (a && a.id !== 'editor') {
      els.unshift(a);
      a = a.parentNode;
    }
    this.editorToolbar.triggerBlocks(els);
  }

}