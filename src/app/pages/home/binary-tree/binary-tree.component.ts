import { Component, OnInit } from '@angular/core';
import { Node } from './node'


@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements OnInit {

  public head = null

  constructor() { }

  ngOnInit() {
  }

  public getData() {
    let data = parseFloat(window.prompt('Enter a number'))
    data.toFixed
    console.log(data)
    // let data = parseInt(document.getElementsByName('number')[0].value)
    if (isNaN(data)) {
      return null
    } else {
      return data
    }
  }

  public createTree(data) {
    let button = document.getElementById(this.head._data)
    let level = document.createElement('div')
    let item = document.createElement('div')
    let span = document.createElement('span')
    let txt = document.createTextNode(data._data)
    level.setAttribute('class', 'lv' + data.level + ' level')
    span.setAttribute('class', 'title')
    span.setAttribute('id', data._data)
    level.appendChild(item).appendChild(span).appendChild(txt)

    if (!button) {
      document.getElementsByClassName('root')[0].appendChild(level)
      item.setAttribute('class', 'item')
    } else {
      let parent = document.getElementById(data.parent._data).parentElement
      let element = parent.getElementsByClassName('lv' + data.level)
      item.setAttribute('class', 'item')
      if (element.length > 0) {
        element[0].appendChild(item)
      } else {
        parent.appendChild(level)
      }
    }
  }

  public removeElement(data, children) {
    let temp = data
    let element = document.getElementById(temp._data).parentNode
    let parent = element.parentNode
    if (children != null) {
      if (children.firstChild && children.secondChild) {
        let append1 = children.firstChild
        let append2 = children.secondChild
        let child1 = document.getElementById(append1._data).parentNode
        let child2 = document.getElementById(append2._data).parentNode.parentNode
        parent.removeChild(element)
        parent.appendChild(child1).appendChild(child2)
      } else if (children.firstChild || children.secondChild) {
        if (children.firstChild) {
          let append = children.firstChild
          let child = document.getElementById(append._data).parentNode
          console.log(child)
          parent.removeChild(element)
          parent.appendChild(child)
        } else {
          let append = children.secondChild
          let child = document.getElementById(append._data).parentNode
          console.log(child)

          parent.removeChild(element)
          parent.appendChild(child)
        }

      }
    } else {
      // let level = element.parentElement
      // console.log(level, parent)
      parent.removeChild(element)
      parent.parentElement.removeChild(parent)
    }
  }

  public add() {
    let levelCount = 1
    let data = this.getData()
    let node = new Node(data)
    let currentNode = this.head
    if (data != null) {
      if (!currentNode) {
        console.log('Node is head')
        this.head = node
        node.level = levelCount
        console.log(this.head, node.level)
      }
      else
        while (currentNode) {
          console.log('Node is child')
          levelCount++
          if (data < currentNode._data) {
            console.log('Step1', data)
            if (!currentNode.leftChild) {
              console.log('data is leftChild')
              node.level = levelCount
              currentNode.leftChild = node
              node.parent = currentNode
              break
            } else {
              console.log('Next to leftChild')
              currentNode = currentNode.leftChild
            }
          } else if (data > currentNode._data) {
            console.log('Step2', data)
            if (!currentNode.rightChild) {
              console.log('data is rightChild')
              node.level = levelCount
              currentNode.rightChild = node
              node.parent = currentNode
              break
            } else {
              console.log('Next to rightChild')
              currentNode = currentNode.rightChild
            }
          } else if (data == currentNode._data) {
            window.alert('The node already exists')
            break
          }
        }
      this.createTree(node)

    }
  }


  public contains = function () {
    let data = this.getData()
    let count = 0
    if (this.head) {
      if (data != null) {
        let currentNode = this.head
        while (currentNode) {
          count++
          if (data > currentNode._data) {
            if (!currentNode.rightChild) {
              alert('Sorry, that node doesn\'t exist ')
              break
            } else {
              currentNode = currentNode.rightChild
            }
          } else if (data < currentNode._data) {
            if (!currentNode.leftChild) {
              alert('Sorry, that node doesn\'t exist ')
              break
            } else {
              currentNode = currentNode.leftChild
            }
          } else if (data == currentNode._data) {
            // window.alert('The node already exists', currentNode)
            return currentNode
          }
        }
      }
    } else {
      alert('Sorry, that node doesn\'t exist ')
      return null
    }
  }


  public remove = function () {
    let data = this.contains()
    let send = data
    if (data != null) {
      let children = {
        firstChild: data.leftChild,
        secondChild: data.rightChild
      }

      // Parent
      if (data.parent) {
        // No child
        if (!data.leftChild && !data.rightChild) {
          if (data.parent.leftChild == data) {
            data.parent.leftChild = null
          } else {
            data.parent.rightChild = null
          }
          this.removeElement(send)
          data = null
        }
        // Children
        else if (data.leftChild && data.rightChild) {
          if (data.parent.leftChild == data) {
            data.parent.leftChild = null
          } else {
            data.parent.rightChild = null
          }
          let temp = data.leftChild
          data.leftChild = null
          this.currentNode = this.head
          while (this.currentNode) {
            if (temp._data > this.currentNode._data) {
              if (!this.currentNode.rightChild) {
                this.currentNode.rightChild = temp
                this.currentNode.rightChild.parent = this.currentNode
                if (data.leftChild == null) {
                  if (data.rightChild == null) {
                    this.removeElement(send, children)
                    data = null
                    break
                  } else {
                    temp = data.rightChild
                    data.rightChild = null
                    this.currentNode = this.head
                  }
                }
              }
              else {
                this.currentNode = this.currentNode.rightChild
              }
            }
            else if (temp._data < this.currentNode._data) {
              if (!this.currentNode.leftChild) {
                this.currentNode.leftChild = temp
                this.currentNode.leftChild.parent = this.currentNode
                if (data.leftChild == null) {
                  if (data.rightChild == null) {
                    this.removeElement(send, children)
                    data = null
                    break
                  } else {
                    temp = data.rightChild
                    data.rightChild = null
                    this.currentNode = this.head
                  }
                }
              } else {
                this.currentNode = this.currentNode.leftChild
              }
            }
          }
        }

        // One child
        else {
          let temp
          let currentNode = this.head
          if (data.parent.leftChild == data) {
            data.parent.leftChild = null
          } else {
            data.parent.rightChild = null
          }
          if (data.rightChild) {
            temp = data.rightChild
          } else {
            temp = data.leftChild
          }
          while (currentNode) {
            if (temp._data > currentNode._data) {
              if (!currentNode.rightChild) {
                currentNode.rightChild = temp
                currentNode.rightChild.parent = currentNode
                this.removeElement(send, children)
                break
              } else {
                currentNode = currentNode.rightChild
              }
            } else if (temp._data < currentNode._data) {
              if (!currentNode.leftChild) {
                currentNode.leftChild = temp
                currentNode.leftChild.parent = currentNode
                this.removeElement(send, children)
                break
              } else {
                currentNode = currentNode.leftChild
              }
            }
          }
        }
      }

      // No parent
      else {
        // Children
        if (data.leftChild && data.rightChild) {
          let temp = data.leftChild
          data.leftChild = null
          let currentNode = this.head
          while (currentNode) {
            if (temp._data > currentNode._data || temp._data === currentNode._data) {
              if (!currentNode.rightChild) {
                currentNode.rightChild = temp
                if (data.leftChild == null) {
                  if (data.rightChild == null) {
                    this.removeElement(send)
                    data = null
                    break
                  } else {
                    temp = data.rightChild
                    data.rightChild = null
                    currentNode = this.head
                  }
                }
              } else {
                currentNode = currentNode.rightChild
              }
            } else if (temp._data < currentNode._data) {
              if (!currentNode.leftChild) {
                currentNode.leftChild = temp
                if (data.leftChild == null) {
                  if (data.rightChild == null) {
                    this.removeElement(send)
                    data = null
                    break
                  } else {
                    temp = data.rightChild
                    currentNode = this.head
                  }
                }
              } else {
                currentNode = currentNode.leftChild
              }
            }
          }
        }
        // No child
        else if (!data.rightChild && !data.leftChild) {
          this.removeElement(send)
          this.head = null
          data = null
        }
        // One child
        else {
          let temp
          let currentNode = this.head
          if (data.rightChild) {
            temp = data.rightChild
          } else {
            temp = data.leftChild
          }
          while (currentNode) {
            if (temp._data > currentNode._data || temp._data === currentNode._data) {
              if (!currentNode.rightChild) {
                currentNode.rightChild = temp
                currentNode.rightChild.parent = currentNode
                this.removeElement(send)
                break
              } else {
                currentNode = currentNode.rightChild
              }
            } else if (temp._data < currentNode._data) {
              if (!currentNode.leftChild) {
                currentNode.leftChild = temp
                currentNode.leftChild.parent = currentNode
                this.removeElement(send)
                break
              } else {
                currentNode = currentNode.leftChild
              }
            }
          }
        }
      }
    }
  }
}
