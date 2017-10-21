import { ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home.component'
import { BinaryTreeComponent } from './binary-tree/binary-tree.component'
import { LinkedListComponent } from './linked-list/linked-list.component'
import { QueueComponent } from './queue/queue.component'
import { StackComponent } from './stack/stack.component'
import { UndoComponent } from './undo/undo.component'

const ROUTES: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: BinaryTreeComponent },
      { path: 'binary-tree', component: BinaryTreeComponent },
      { path: 'linked-list', component: LinkedListComponent },
      { path: 'queue', component: QueueComponent },
      { path: 'stack', component: StackComponent },
      { path: 'undo', component: UndoComponent },
    ]
  }
]

export let routes: ModuleWithProviders = RouterModule.forChild(ROUTES)


