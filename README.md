# Auto README
This is a node-based tool that walks through the creation of a markdown README file. It supports a basic outline of a standard README a user may want to include in a small project on github (or wherever else markdowns are displayed). The user can add whole sections, including paragraphs, links, bullet-points, and images). 
## node.js
Node.js is the tool that allows this script to function. The user interaction occurs in the console after running the file via "node" command in the terminal.
[https://nodejs.org/en/](https://nodejs.org/en/)
## fs
File system, or better known as 'fs', is a library of tools that allow the manipulation of files on the local PC. In this project it is the method by which the README.md is created. The most basic of functions is "writeFile" which creates/replaces a given file.
For the purposes of editing a file, the "readFile" tool can be used. By combining these two simple functions, more advanced actions can be done using JavaScript that can change the contents of that file, use them elsewhere, or simply edit that same file.
## Inquirer
Inquirer is how all the user interactions are able to performed, specifically PROMPTING the user and accepting INPUTS. Inputs can be text, boolean "confirms", or multiple-choice. These inputs can drive an application, like this one, so that the user simply has to respond, allowing those responses then to perform all the "work" of formatting the markdown-based README.
[https://www.npmjs.com/package/inquirer](https://www.npmjs.com/package/inquirer)
## Auto ReadMe in Action
AutoReadMe walks through the process of creating a typical ReadMe. When creating a NEW markdown the user is asked for the following:
* Name of the Project
* Introduction Paragraph
* First Section Title
* Section contents, which may include paragraphs, links, images, and bullets.
When creating sections, the user is given each of the four options indefinitely until the user selects "create new section" or "complete README".