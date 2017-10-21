import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


const ROUTES: Routes = [
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];


export let routes: ModuleWithProviders = RouterModule.forChild(ROUTES)

