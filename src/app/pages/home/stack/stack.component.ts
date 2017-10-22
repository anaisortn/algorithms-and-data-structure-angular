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
    let item = window.prompt('Please enter a number or an operator')
    let currentHead = document.getElementsByClassName('stackHead')[0]
    if (currentHead) {
      currentHead.removeAttribute('class')
      currentHead.setAttribute('class', 'stackElement')
    }

    this.stack[this.stack.length] = item
    let button = document.createElement('div')
    let txt = document.createTextNode(item)
    let parent = document.getElementById('stack')
    button.setAttribute('class', 'stackElement')
    button.setAttribute('class', 'stackHead')
    button.setAttribute('id', item)
    button.appendChild(txt)
    parent.appendChild(button)
  }

  public pushToStack(item) {
    let button = document.createElement('div')
    let txt = document.createTextNode(item)
    button.appendChild(txt)
    button.setAttribute('class', 'stackElement')
    button.setAttribute('id', 'stackHead')
    let parent = document.getElementById('stack')
    parent.insertBefore(button, parent.firstChild)
    console.log('ITEM', item)
    this.stack[0] = item
    console.log(this.stack)
    return item
  }

  public pop() {
    if (this.stack.length == 0) {
      alert('The Stack is empty')
    } else {
      let element = document.getElementById('stackHead')
      let parent = document.getElementById('stack')
      parent.removeChild(element)
      let stackElements = document.getElementsByClassName('stackElement')
      this.stack.splice(this.stack.length - 1, 1)
      if (this.stack[0]) {
        let newChild = stackElements[stackElements.length - 1]
        newChild.setAttribute('id', 'stackHead')
      }
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
    let results = []
    for (let i = 0; i < this.stack.length; i++) {
      if (!isNaN(this.stack[i])) {
        results.push(this.stack[i])
      } else {
        let firstNumber = results.pop()
        let secondNumber = results.pop()

        let parent = document.getElementById('stack')
        let element1 = document.getElementById(firstNumber)
        let element2 = document.getElementById(secondNumber)
        let element3 = document.getElementById(this.stack[i])
        if (element1) {
          parent.removeChild(element1)
        }
        if (element2) {
          parent.removeChild(element2)
        }
        parent.removeChild(element3)

        switch (this.stack[i]) {
          case '+':
            results.push(+secondNumber + +firstNumber)
            break
          case '-':
            results.push(secondNumber - firstNumber)
            break
          case '*':
            results.push(secondNumber * firstNumber)
            break
          case '/':
            results.push(secondNumber / firstNumber)
            break
          case '%':
            results.push(firstNumber % secondNumber)
            break
          default:
            alert('Unrecognized element : ' + this.stack[i])
        }
      }
    }
    if (results.length === 1) {
      this.stack = []
      this.pushToStack(results.pop())
    }



  }
}
