import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  public entries = []
  // public length = this.entries.length
  public showLength = false
  public lastIn = false
  public enumerateQueue = false
  public lastItem

  constructor() { }

  ngOnInit() {
  }

  public size() {
    this.showLength = true
    setTimeout(function () {
      this.showLength = false
    }.bind(this), 5000)
  }

  public enqueue() {
    let item = window.prompt('Enter an item to add to the queue')
    this.entries.push(item)
    console.log(this.entries)
    let button = document.createElement('button')
    let txt = document.createTextNode(item)
    let parent = document.getElementById('queue')
    button.setAttribute('class', 'queueElement')
    button.appendChild(txt)
    parent.appendChild(button)
  }

  public enumerate() {
    this.enumerateQueue = true
    setTimeout(function () {
      this.enumerateQueue = false
    }.bind(this), 5000)
  }

  public peek() {
    this.lastItem = this.entries[this.entries.length - 1]    
    this.lastIn = true
    setTimeout(function () {
      this.lastIn = false
    }.bind(this), 5000)
  }

  public dequeue() {
    let element = document.getElementsByClassName('queueElement')[0]
    if (this.entries.length == 0) {
      alert('No item can be dequeued since the queue is empty')
    } else {
      element.parentNode.removeChild(element)
      this.entries.splice(0, 1)
      console.log(this.entries)
    }
  }

}
