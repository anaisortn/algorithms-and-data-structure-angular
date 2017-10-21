import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { ComponentsModule } from '../../components/components.module'
import { routes } from './home.routing'

import { HomeComponent } from './home.component'
import { BinaryTreeComponent } from './binary-tree/binary-tree.component'
import { LinkedListComponent } from './linked-list/linked-list.component'
import { QueueComponent } from './queue/queue.component'
import { StackComponent } from './stack/stack.component'
import { UndoComponent } from './undo/undo.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ComponentsModule,
    routes,
  ],
  declarations: [
    HomeComponent,
    BinaryTreeComponent,
    LinkedListComponent,
    QueueComponent,
    StackComponent,
    UndoComponent,
  ]
})
export class HomeModule { }
