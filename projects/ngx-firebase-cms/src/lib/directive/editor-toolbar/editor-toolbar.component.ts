import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { Font, CustomClass } from '../../interface/editor';
import { EditorService } from '../../service/editor.service';
import { DOCUMENT } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
import { AngularFireStorage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'aq-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.css']
})
export class EditorToolbarComponent implements OnInit {

  id = '';
  htmlMode = false;
  showToolbar = true;

  block = 'default';
  defaultFontId;
  fontId = 0;
  fontSize = '5';
  fonts: Font[];

  customClassId = -1;
  customClasses: CustomClass[];

  tagMap = {
    BLOCKQUOTE: "indent",
    A: "link"
  };

  select = ["H1", "H2", "H3", "H4", "H5", "H6", "P", "PRE", "DIV"]
  buttons = ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent", "insertUnorderedList", "insertOrderedList", "link"]

  @Output() execute: EventEmitter<string> = new EventEmitter<string>()
  @ViewChild('fileInput') myInputFile: ElementRef

  constructor(
    private storage: AngularFireStorage,
    private message: NzMessageService,
    private _renderer: Renderer2,
    private editorService: EditorService, 
    @Inject(DOCUMENT) private _document: any
  ) {
  }

  ngOnInit() {
    
  }

  triggerCommand(command: string) {
    this.execute.emit(command);
  }

  triggerButtons() {
    if (!this.showToolbar) {
      return;
    }
    this.buttons.forEach(e => {
      const result = this._document.queryCommandState(e);
      const elementById = this._document.getElementById(e + '-' + this.id);
      if (result) {
        this._renderer.addClass(elementById, "active");
      } else {
        this._renderer.removeClass(elementById, "active");
      }
    });
  }

  triggerBlocks(nodes: Node[]) {
    if (!this.showToolbar) {
      return;
    }
    let found = false;
    this.select.forEach(y => {
      const node = nodes.find(x => x.nodeName === y);
      if (node !== undefined && y === node.nodeName) {
        if (found === false) {
          this.block = node.nodeName.toLowerCase();
          found = true;
        }
      } else if (found === false) {
        this.block = 'default';
      }
    });

    found = false;
    if (this.fonts) {
      this.fonts.forEach((y, index) => {
        const node = nodes.find(x => {
          if (x instanceof HTMLFontElement) {
            return x.face === y.name;
          }
        });
        if (node !== undefined) {
          if (found === false) {
            this.fontId = index;
            found = true;
          }
        } else if (found === false) {
          this.fontId = this.defaultFontId;
        }
      });
    }

    found = false;
    if (this.customClasses) {
      this.customClasses.forEach((y, index) => {
        const node = nodes.find(x => {
          if (x instanceof Element) {
            return x.className === y.class;
          }
        });
        if (node !== undefined) {
          if (found === false) {
            this.customClassId = index;
            found = true;
          }
        } else if (found === false) {
          this.customClassId = -1;
        }
      });
    }

    Object.keys(this.tagMap).map(e => {
      const elementById = this._document.getElementById(this.tagMap[e] + '-' + this.id);
      const node = nodes.find(x => x.nodeName === e);
      if (node !== undefined && e === node.nodeName) {
        this._renderer.addClass(elementById, "active");
      } else {
        this._renderer.removeClass(elementById, "active");
      }
    });
  }

  insertUrl() {
    const url = prompt("Insert URL link", 'http:\/\/');
    if (url && url !== '' && url !== 'http://') {
      this.editorService.createLink(url);
    }
  }

  insertColor(color: string, where: string) {
    this.editorService.insertColor(color, where);
    this.execute.emit("");
  }

  setFontName(fontId: number): void {
    this.editorService.setFontName(this.fonts[fontId].name);
    this.execute.emit("");
  }

  setFontSize(fontSize: string): void {
    this.editorService.setFontSize(fontSize);
    this.execute.emit("");
  }

  setEditorMode(m: boolean) {
    const toggleEditorModeButton = this._document.getElementById("toggleEditorMode" + '-' + this.id);
    if (m) {
      this._renderer.addClass(toggleEditorModeButton, "active");
    } else {
      this._renderer.removeClass(toggleEditorModeButton, "active");
    }
    this.htmlMode = m;
  }

  onFileChanged(event) {
    const file = event.target.files[0]
    console.log(file.type)
    if(file.type !== "image/jpeg") {
      this.message.error("File type should be JPEG")
      this.fileReset()
      return false
    } else if (file.size/1024/1024 > 1) {
      this.message.error("File size should be less than 1 Mb")
      this.fileReset()
      return false
    } else {
      let timestamp = new Date().valueOf()
      let filePath = `/media/${timestamp}.jpeg`
      this.storage.upload(filePath, file)
        .then(res => {
          return this.storage.ref(filePath).getDownloadURL().toPromise()
        })
        .then(url => {
          this.message.success("Image uploaded")
          this.editorService.insertImage(url)
          this.fileReset()
        })
        .catch(err => {
          this.message.error(err)
        })
    }
  }

  fileReset() {
    this.myInputFile.nativeElement.value = "";
  }

  setCustomClass(classId: number) {
    this.editorService.createCustomClass(this.customClasses[classId]);
  }
}