import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Breadcrumb } from '../../interface/breadcrumb';
import { UnsubscriptionService } from '../../service/unsubscription.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NzMessageService, NzNotificationService, UploadXHRArgs, UploadFile } from 'ng-zorro-antd';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../service/auth.service';
import { HelperService } from '../../service/helper.service';
import * as firebase from 'firebase/app';
import { HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Titlebar } from '../../interface/titlebar';

@Component({
  selector: 'aq-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('uploadButton') uploadButton: ElementRef

  titlebar: Titlebar = {
    title: "Profile",
    description: "Edit your profile",
    breadcrumbs: [
      {
        title: "Profile",
        icon: 'team'
      }
    ]
  }

  showChangePassword = false
  passwordForm: FormGroup
  displayNameForm: FormGroup
  isLoading = false
  showDisplayName = false
  profileURL = null
  sub

  constructor(
    private unsubscription: UnsubscriptionService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private message: NzMessageService,
    private storage: AngularFireStorage,
    public auth: AuthService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.sub = this.auth.user$.subscribe(res => {
      this.profileURL = res.profileURL
    }, err => {})
    this.initForm()
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  initForm() {
    this.passwordForm = this.fb.group({
      "previousPassword": new FormControl({ value: "", disabled: false }, [Validators.required]),
      "newPassword": new FormControl({ value: "", disabled: false }, [Validators.required]),
    })
    this.displayNameForm = this.fb.group({
      "displayName": new FormControl({ "value": this.auth.displayName, disabled: false }, [Validators.required])
    })
  }

  changePassword() {
    if (typeof this.passwordForm.value["newPassword"] == "string") this.passwordForm.controls["newPassword"].setValue(this.passwordForm.value["newPassword"].trim())
    if (this.passwordForm.valid && !this.isLoading) {
      this.isLoading = true
      this.afAuth.auth.signInWithEmailAndPassword(this.auth.email, this.passwordForm.value['previousPassword']).then(res => {
        let user = this.afAuth.auth.currentUser
        return user.updatePassword(this.passwordForm.value["newPassword"])
      })
        .then(res => {
          this.auth.log(` updated the password`)
          this.message.success(`Change the password`)
          this.showChangePassword = !this.showChangePassword
        })
        .catch(err => {
          this.message.error(err)
        })
    } else {
      this.passwordForm.controls["newPassword"].markAsDirty()
    }
  }

  changeDisplayName() {
    if (typeof this.displayNameForm.value["displayName"] == "string") this.displayNameForm.controls["displayName"].setValue(this.displayNameForm.value["displayName"].trim())
    if (this.displayNameForm.valid && !this.isLoading) {
      this.isLoading = true
      this.afs.collection("users").doc(this.auth.uid).update({
        "displayName": this.displayNameForm.value["displayName"],
        "uploadTime": firebase.firestore.FieldValue.serverTimestamp()
      }).then(res => {
        this.isLoading = false
        this.showDisplayName = !this.showDisplayName
      })
    } else {
      this.displayNameForm.controls["displayName"].markAsDirty()
    }
  }

  beforeUpload = (file: UploadFile): boolean => {
    if (file['type'] != "image/jpeg") {
      this.message.error("File type should be JPEG")
      return false
    } else if (file['size'] / 1024 / 1024 > 1) {
      this.message.error("File size should be less than 1 Mb")
      return false
    } else {
      return true
    }
  }

  uploadProfilePic = (item: UploadXHRArgs) => {
    this.message.success(`File is uploading`)
    let timestamp = new Date().valueOf()
    let filePath = `/profile/${timestamp}.jpeg`
    let file = item['file']
    const task = this.storage.upload(filePath, file)
      .then(res => {
        return this.storage.ref(filePath).getDownloadURL().toPromise()
      })
      .then(res => {
        return this.afs.collection("users").doc(this.auth.uid).update({
          "profileURL": res,
          "uploadTime": firebase.firestore.FieldValue.serverTimestamp()
        })
      })
      .then(res => {
        this.auth.log(`changed profile pic ${timestamp}.jpeg`)
        this.message.success("File Uploaded")
      }).catch(err => {
        this.message.error(err)
      })
    return of().subscribe((event: HttpEvent<{}>) => {
      if (event['percent'] != 100) {
        item.onProgress(event, item.file);
      } else {
        item.onSuccess(event['body'], item.file, event);
      }
    }, (err) => {
      item.onError(err, item.file);
    })
  }

  getProfilePic() {
    return (this.profileURL) ? { 'background-image': 'url(\'' + this.profileURL + '\')' } : {}
  }

  @HostListener('document:keydown', ['$event'])
  keyboardEvent(e: KeyboardEvent) {
    if (this.showChangePassword && e.key == 'Escape') {
      this.notification.blank("ESC", "Escape modal")
      this.showChangePassword = false
    }

    if (this.showDisplayName && e.key == 'Escape') {
      this.notification.blank("ESC", "Escape modal")
      this.showDisplayName = false
    }

    if (this.showChangePassword) {
      if (e.ctrlKey && e.key == 'Enter') {
        this.notification.blank("⌃ ENTER", "Form Submission")
        this.changePassword()
      }
    }
    
    if (this.showDisplayName && e.ctrlKey && e.key == 'Enter') {
      this.notification.blank("⌃ ENTER", "Form Submission")
      this.changeDisplayName()
    }
  }
}
