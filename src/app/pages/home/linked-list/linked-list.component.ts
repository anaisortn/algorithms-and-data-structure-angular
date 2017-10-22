import { Component, OnInit } from '@angular/core';
import { Node } from './node'

@Component({
  selector: 'app-linked-list',
  templateUrl: './linked-list.component.html',
  styleUrls: ['./linked-list.component.css']
})

export class LinkedListComponent implements OnInit {

  public head: any
  public tail: any
  public length = 0
  public list = []
  public showListLength = false
  public showEnumerate = false

  constructor() { }

  public ngOnInit() { }

  public getData() {
    let data = window.prompt('Enter an item to add to the queue')
    return data
  }

  public showLength() {
    this.showListLength = true
    setTimeout(function () {
      this.showListLength = false
    }.bind(this), 5000)
  }

  public addFirst() {
    let data = this.getData()
    let nodeDoesExist = this.checkIfExists(data)
    if (nodeDoesExist) {
      console.log('That node already exists, try with another value')
    } else {
      let node = new Node(data)
      let element = document.createElement('div')
      element.setAttribute('class', 'listElement')
      element.setAttribute('id', data)
      let txt = document.createTextNode(data)
      element.appendChild(txt)
      let parent = document.getElementsByClassName('linkedList')[0]

      if (this.length) {
        parent.insertBefore(element, parent.childNodes[0])
        let temp = this.head
        this.head = node
        this.head.next = temp
        this.head.next.previous = this.head
        let currentNode = this.head
        while (currentNode) {
          if (currentNode.next) {
            currentNode = currentNode.next
          } else {
            this.tail = currentNode
            break
          }
        }
      } else {
        this.head = node
        this.tail = node
        parent.appendChild(element)
      }
      this.length++
      if (this.length == 1) {
        this.tail = this.head
      }
    }
  }

  public addLast() {
    let data = this.getData()
    let nodeDoesExist = this.checkIfExists(data)
    if (nodeDoesExist) {
      alert('That node already exists, try with another value')
    } else {
      let node = new Node(data);
      let element = document.createElement('div')
      element.setAttribute('class', 'listElement')
      element.setAttribute('id', data)
      let txt = document.createTextNode(data)
      element.appendChild(txt)
      let parent = document.getElementsByClassName('linkedList')[0]
      parent.appendChild(element)

      if (this.length == 0) {
        this.tail = node;
        this.head = node;
      } else {
        let temp = this.tail;
        this.tail.next = node;
        this.tail = node;
        node.previous = temp;
      }
      this.length++;
    }
  }

  public removeFirst() {
    let element = document.getElementById(this.head._data)
    element.parentNode.removeChild(element)
    if (this.length != 0) {
      this.head = this.head.next;
      this.length--;
      if (this.length == 0) {
        this.tail = null;
      }
    }
  }

  public removeLast() {
    let element = document.getElementById(this.tail._data)
    element.parentNode.removeChild(element)
    if (this.length != 0) {
      if (this.length == 1) {
        this.head = null;
        this.tail = null;
      } else {
        let currentNode = this.head;
        while (currentNode.next != this.tail) {
          currentNode = currentNode.next;
        }
        currentNode.next = null;
        this.tail = currentNode;
      }
    }
    this.length--;
  }

  public removeValue() {
    let data = this.getData()
    let nodeDoesExist = this.checkIfExists(data)
    if (nodeDoesExist) {
      let currentNode = this.head
      while (currentNode) {
        if (currentNode._data == data) {
          if (currentNode.next && currentNode.previous) {
            currentNode.previous.next = currentNode.next
            currentNode.next.previous = currentNode.previous
          } else if (currentNode.next && !currentNode.previous) {
            currentNode.next.previous = null
            this.head = currentNode.next
          } else if (!currentNode.next && currentNode.previous) {
            currentNode.previous.next = null
            this.tail = currentNode.previous
          } else {
            this.head = null
            this.tail = null
          }
          let element = document.getElementById(data)
          element.parentNode.removeChild(element)
          break
        } else {
          currentNode = currentNode.next
        }
      }
      this.length--
    } else {
      alert('Sorry, the value you are trying to remove doesn\'t exist')
    }
  }

  public enumerate() {
    let currentNode = this.head;
    this.showEnumerate = true

    setTimeout(function () {
      this.showEnumerate = false
    }.bind(this), 5000)

    while (currentNode) {
      this.list.push(currentNode._data)
      console.log(currentNode)
      currentNode = currentNode.next
    }
    return
  }

  public checkIfExists(data) {
    let exists = false;
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode._data == data) {
        exists = true;
        break;
      } else {
      }
      currentNode = currentNode.next;
    }
    return exists;
  }

  public dataExists() {
    let data = this.getData()
    let result = this.checkIfExists(data)
    if (result) {
      window.alert('The element exists')
    } else {
      window.alert('The element doesn\'t exist yet')
    }
  }
}
