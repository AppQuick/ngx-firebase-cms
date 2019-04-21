import { Injectable, Inject } from '@angular/core';
import { CustomClass } from '../interface/editor';
import { HttpClient } from '@angular/common/http';
import {DOCUMENT} from "@angular/common";

export interface UploadResponse {
  imageUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class EditorService {

  
  savedSelection: Range | null;
  selectedText: string;
  uploadUrl: string;


  constructor(
    private http: HttpClient, 
    @Inject(DOCUMENT) private _document: any
  ) {
  }

  executeCommand(command: string) {
    const commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
    if (commands.includes(command)) {
      this._document.execCommand('formatBlock', false, command);
    }

    this._document.execCommand(command, false, null);
  }

  createLink(url: string) {
    if (!url.includes("http")) {
      this._document.execCommand('createlink', false, url);
    } else {
      const newUrl = '<a href="' + url + '" target="_blank">' + this.selectedText + '</a>';
      this.insertHtml(newUrl);
    }
  }

  insertColor(color: string, where: string): void {
    const restored = this.restoreSelection();
    if (restored) {
      if (where === 'textColor') {
        this._document.execCommand('foreColor', false, color);
      } else {
        this._document.execCommand('hiliteColor', false, color);
      }
    }
  }

  setFontName(fontName: string) {
    this._document.execCommand("fontName", false, fontName);
  }

  setFontSize(fontSize: string) {
    this._document.execCommand("fontSize", false, fontSize);
  }

  /**
   * Create raw HTML
   * @param html HTML string
   */
  private insertHtml(html: string): void {

    const isHTMLInserted = this._document.execCommand('insertHTML', false, html);

    if (!isHTMLInserted) {
      throw new Error('Unable to perform the operation');
    }
  }

  saveSelection(): any {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        this.savedSelection = sel.getRangeAt(0);
        this.selectedText = sel.toString();
      }
    } else if (this._document.getSelection && this._document.createRange) {
      this.savedSelection = document.createRange();
    } else {
      this.savedSelection = null;
    }
  }

  restoreSelection(): boolean {
    if (this.savedSelection) {
      if (window.getSelection) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(this.savedSelection);
        return true;
      } else if (this._document.getSelection) {
        return true;
      }
    } else {
      return false;
    }
  }

  private checkSelection(): any {

    const slectedText = this.savedSelection.toString();

    if (slectedText.length === 0) {
      throw new Error('No Selection Made');
    }

    return true;
  }

  insertImage(imageUrl: string) {
    this._document.execCommand('insertImage', false, imageUrl);
  }

  setDefaultParagraphSeparator(separator: string) {
    this._document.execCommand("defaultParagraphSeparator", false, separator);
  }

  createCustomClass(customClass: CustomClass) {
    let newTag = this.selectedText;
    if(customClass){
      const tagName = customClass.tag ? customClass.tag : 'span';
      newTag = '<' + tagName + ' class="' + customClass.class + '">' + this.selectedText + '</' + tagName + '>';
    }
    
    this.insertHtml(newTag);
  }
}
