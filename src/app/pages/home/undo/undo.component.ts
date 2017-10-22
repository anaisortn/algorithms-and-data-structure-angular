import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-undo',
  templateUrl: './undo.component.html',
  styleUrls: ['./undo.component.css']
})

export class UndoComponent implements OnInit {

  public entries = []

  constructor() { }

  ngOnInit() {
  }

  public push(button) {
    let previousColor = document.getElementById(button).style.backgroundColor
    let item = {
      button,
      previousColor
    }
    this.entries.push(item)
    this.changeColor(item)
  }

  public changeColor(item) {
    let color = this.getRandomColor()
    document.getElementById(item.button).style.background = color
    this.appendToList(item.button, color)
  }

  public undo() {
    if (this.entries.length == 0) {
      alert('The Stack is empty')
    } else {
      let item = this.entries[this.entries.length - 1]
      document.getElementById(item.button).style.background = item.previousColor
      this.entries.splice(this.entries.length - 1, 1)
      this.removeFromList()
    }
  }

  public removeFromList() {
    let list = document.getElementById('colors')
    list.removeChild(list.lastChild)
  }

  public appendToList(item, color) {
    let list = document.getElementById('colors')
    let span = document.createElement('p')
    let txt = document.createTextNode(item + ' : ' + color)
    span.style.color = color
    list.appendChild(span).appendChild(txt)
    list.scrollTop = list.scrollHeight
  }

  public getRandomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF)
    return "#" + ("000000" + hex.toString(16)).substr(-6)
  }

}
