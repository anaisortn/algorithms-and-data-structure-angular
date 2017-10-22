import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {

  public stack = []

  constructor() { }

  ngOnInit() {
  }

  public push() {
    let item = window.prompt('Please enter a number or operator')
    // if (!isNaN(item)) {
    //   item = parseInt(item)
    // }
    let currentHead = document.getElementById('stackHead')
    if (currentHead) {
      currentHead.removeAttribute('id')
    }

    this.stack[this.stack.length] = item
    let button = document.createElement('div')
    let txt = document.createTextNode(item)
    let parent = document.getElementById('stack')
    button.setAttribute('class', 'stackElement')
    button.setAttribute('id', 'stackHead')
    button.appendChild(txt)
    parent.appendChild(button)
  }

  public pushToStack(item, i) {
    let button = document.createElement('div')
    let txt = document.createTextNode(item)
    button.appendChild(txt)
    button.setAttribute('class', 'stackElement')
    let parent = document.getElementById('stack')
    parent.insertBefore(button, parent.firstChild)
    this.stack.splice(i - 2, 1)
    console.log('ITEM', item)
    this.stack[0] = item
    console.log(this.stack)
    this.calculator()
  }

  public pop() {
    if (this.stack.length == 0) {
      alert('The Stack is empty')
    } else {
      let element = document.getElementById('stackHead')
      let parent = document.getElementById('stack')
      parent.removeChild(element)
      let stackElements = document.getElementsByClassName('stackElement')
      let newChild = stackElements[stackElements.length - 1]
      newChild.setAttribute('id', 'stackHead')
      let deletedData = this.stack[this.stack.length]
      delete this.stack[this.stack.length]
      return deletedData
    }
  }

  public peek() {
    let tempLength = this.stack.length - 1
  }

  public clear() {
    this.stack.length = 0
    this.stack = []
    let parent = document.getElementById('stack')
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild)
    }
  }

  public calculator() {
    // Loop through stack, enumerate and return final result
    for (let i = 0; i < this.stack.length; i++) {
      console.log(this.stack[i])
      let parent = document.getElementById('stack')
      // parent.removeChild(parent.childNodes[0])
      if (!isNaN(this.stack[i])) {
        console.log('is Number', this.stack[i])
      } else if (isNaN(this.stack[i])) {
        // this.push(item)
        // } else {
        // let firstNumber = this.pop()
        // let secondNumber = this.pop()
        let firstNumber = this.stack[i - 1]
        let secondNumber = this.stack[i - 2]
        // this.stack.length = this.stack.length - 3
        console.log('is not a Number', this.stack[i], firstNumber, secondNumber)

        switch (this.stack[i]) {
          case '+':
            this.pushToStack(+secondNumber + +firstNumber, [i])
            console.log(this.stack)
            break
          case '-':
            this.pushToStack(secondNumber - firstNumber, [i])
            console.log(this.stack)
            break
          case '*':
            this.pushToStack(secondNumber * firstNumber, [i])
            console.log(this.stack)
            break
          case '/':
            this.pushToStack(secondNumber / firstNumber, [i])
            console.log(this.stack)
            break
          case '%':
            this.pushToStack(firstNumber % secondNumber, [i])
            console.log(this.stack)
            break
          // default:
          //   alert('Unrecognized element : ', this.stack[i])
        }
      }
    }
  }
}
