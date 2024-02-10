import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable ,tap} from 'rxjs';
import { map } from 'rxjs/operators';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  urlRegex!: RegExp;
  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>; // Déclaration de l'obersavle qui va nous générer le nouveau faceSnap

  constructor(private formBuilder: FormBuilder,
   private faceSnapsService: FaceSnapsService,
              private router: Router) { }

  ngOnInit(): void {
            this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
            this.snapForm = this.formBuilder.group({
                title: [null, Validators.required],
                description: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
                imageUrl: [null, Validators.required],
                location: [null]
            });
            this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
                map(formValue => ({
                    ...formValue,
                    createdDate: new Date(),
                    snaps: 0,
                    id: 0
                }))
            );

            /*
             "...formValue" indique qu'on va récupérer tous les éléments saisie dans le formulaire
            snaps, id , et createdate correspondent aux attributs de notre classe facesnap , qui n'ont
            pas été crée via notre formulaire, d'ou le 'map' pour modifier nos emissions

            "valuechanges()" sert à observer en temps réels les emissions de mon observable
             updateOn: 'blur' ==> permet devisualiser la mise à jour uniquement lorsque l'on change de champ
            */

  }

  onSubmitForm() {
      this.faceSnapsService.addFaceSnap(this.snapForm.value).pipe(
          tap(() => this.router.navigateByUrl('/facesnaps'))
      ).subscribe();

  }

}
