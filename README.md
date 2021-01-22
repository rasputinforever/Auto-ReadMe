# Auto ReadMe

Auto ReadMe is a helpful tool that generates a README.md file based on user inputs.

##### Table of Contents
- [User Experience](#User-Experience)
- [How it Works](#How-it-Works)
- [Project Credits & Contact](#Project-Credits-&-Contact)

## User Experience

### Console Interactions

To get started, the user loads AutoReadMe.js in the console. The user is then taken through a branching series of questions, first starting with:

* Create New README...
* Edit README...

### Create New

Creating a new README requires the most inputs. First, the title, author information, and introductory text is asked for. Once submitted, the user is then taken to the Section Creator. Each Section prompts for a Section Title, which is refrenced in the auto-generated Table of Contents. After the title, the user is able to add any of the following:

* Header
* Text
* Image
* Link
* License (badge)
* Bullet Point

Depending on the input, the user is asked to submit one (or more) terms for that given Section Element. Once submitted, the user is prompted again to continue adding more elements. Additionally, the user can also select:

* Create New Section, which then prompts the user for a new Section Title, followed by the same elements menu above. 
* Finalize README..., which then moves onto the creation of the README.

### Automated Formatting

When the user finalizes the README submissions the README is stored in the local folder as 'README.md'. The user inputs are worked up, markdown formatting applied based on the element type, then written into the ReadMe. A Table of Contents, Project Credits and Contact, and an "about Auto ReadMe" sections are all populated in the appropriate locations.

## How it Works

### Node.JS

Node.JS is what allows the user to interact with this tool in the console. Libraries are used that allow JavaScript to perform tasks on this non-browser platform (the console) and use "npm" libraries to, specifically for this tool, read and write files and ask questions from the users and perform tasks with those inputs.

### Require: Inquirer

Inquirer allows the console to prompt the user for text or multiple choice options, then perform a task with the submission. 

[Inquirer](https://www.npmjs.com/package/inquirer)

### Require: fs

fs, or "file system", is a library that allows the reading and writing of files on the drive.

[fs](https://www.npmjs.com/package/fs)

## Project Credits & Contact
Created by: Erik Portillo
GitHub: [RasputinForever](https://github.com/rasputinforever)
Email: erik.justin.portillo@gmail.com

##### AutoReadMe
This README was created using AutoReadMe
Created by: Erik Portillo, 2021
Repo: [AutoReadMe Repository](https://github.com/rasputinforever/Auto-ReadMe)
GitHub: [RasputinForever]()
