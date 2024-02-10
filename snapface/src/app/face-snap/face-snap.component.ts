import { Component ,OnInit, Input} from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit {

    @Input() faceSnap! : FaceSnap;

    numberClick!:number;
    buttonText!:string;

    constructor(private faceSnapsService: FaceSnapsService,
    private router: Router) {}

    ngOnInit(){
      this.numberClick = 0;
        this.buttonText='Oh Snap !';
    }

    onSnap(){
        this.numberClick++;
        if(this.numberClick%2!=0){
           // this.faceSnap.snaps++;
            //this.faceSnapsService.snapFaceSnapById(this.faceSnap.id,'snap');
            this.buttonText='Oh Snap !  🥰️';
        }else{
            //this.faceSnap.snaps--;
           // this.faceSnapsService.snapFaceSnapById(this.faceSnap.id,'unsnap');
            this.buttonText='Ooops unSnap !  🥹';
        }
    }

    onViewFaceSnap() {
        this.router.navigateByUrl(`faceSNAPS/${this.faceSnap.id}`);
    }



}
