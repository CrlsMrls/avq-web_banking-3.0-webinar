import {NgModule} from '@angular/core';

import {LayoutModule} from '@angular/cdk/layout';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({

    exports: [
      // Material / CDK
      LayoutModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatFormFieldModule,
      MatSelectModule,
      MatDialogModule,
    ],
  })
  export class MaterialModule {}
