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

  constructor() { }

  public ngOnInit() { }

  public showLength() {
    console.log(this.length)
  }

  public addFirst(value) {
    console.log(value)
    let nodeDoesExist = this.checkIfExists(value)
    // console.log(nodeDoesExist);
    if (nodeDoesExist) {
      console.log('That node already exists, try with another value')
    } else {
      let node = new Node(value);
      if (this.length) {
        let temp = this.head;
        this.head = node;
        this.head.next = temp;
        this.head.next.previous = this.head;
        // console.log(this.head, this.head.next, this.head.next.previous)
      } else {
        this.head = node;
        // console.log(this.length);
      }
      this.length++
      if (this.length == 1) {
        this.tail = this.head;
        // console.log(this.head + '+' + this.head.next + '+' + this.tail)
      }
    }
  }

  public addLast(value) {
    let nodeDoesExist = this.checkIfExists(value)
    if (nodeDoesExist) {
      alert('That node already exists, try with another value')
    } else {
      let node = new Node(value);
      if (this.length == 0) {
        this.tail = node;
        this.head = node;
      } else {
        let temp = this.tail;
        this.tail.next = node;
        // console.log(this.tail)
        this.tail = node;
        // console.log(this.tail)
        // console.log(node.previous)
        node.previous = temp;
        // console.log(node.previous)      
      }
      this.length++;
      // console.log(this.length)
    }
  }

  public removeFirst() {
    if (this.length != 0) {
      this.head = this.head.next;
      this.length--;

      if (this.length == 0) {
        this.tail = null;
        // console.log(this.length, this.head, this.tail)
      }
    }
  }

  public removeLast() {
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

  public removeValue(value) {
    let nodeDoesExist = this.checkIfExists(value)
    let currentNode = this.head
    while (currentNode) {
      if (currentNode.data == value) {
        console.log(currentNode.previous, currentNode.next)
        currentNode.previous.next = currentNode.next;
        currentNode.next.previous = currentNode.previous;
        break;
      } else {
        alert('A node with such value doesn\'t exist')
        currentNode = currentNode.next;
      }
    }
  }

  public enumerate() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode)
      currentNode = currentNode.next;
    }
    return false;
  }

  public checkIfExists(value) {
    let exists = false;
    let currentNode = this.head;
    while (currentNode) {
      // console.log(currentNode.data)
      if (currentNode.data == value) {
        // console.log(item, 'is equal to', currentNode)
        exists = true;
        break;
      // } else {
      //   // console.log(item + "doesn't exist yet")
      }
      currentNode = currentNode.next;
    }
    return exists;
  }

}
