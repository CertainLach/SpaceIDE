![SpaceIDE Logo](./assets/images/OS_IP_C.png) 

SpaceIDE
--------
A rewrite of the awesome chaoscollective's Space Editor
> Source is messy, will eat your cat!

Libraries/Platforms used:
-------------------------
 - Node.JS
 - Potato.Socket
    - UWS
    - ProtoDef
 - XPress
 - Webpack
 - Reach (Inferno in production)
 - Ot.JS (For collaboration)
 

Roadmap:
--------
 - [ ] Finish panel layout
 - [ ] Add panels
    - [ ] Code editor panel (Based on ace.js + ot.js)
    - [ ] Preview panel 
        - [ ] Finish u-preview
    - [ ] Terminal panel
    - [ ] Log panel (?)
 - [ ] Chat panel
    - [ ] Styles
        - [X] Normal message
        - [ ] Status message
        - [ ] Service message
        - [ ] Idea message
    - [ ] Mobx connection
    - [ ] Text
    - [ ] Voice
        - [ ] Finish Potato.RTC
    - [X] Standalone
    - [X] Toggle button (While not in chat)
 - [ ] Finish collaboration on backend 
 - [ ] Create Potato.Socket component for React
 - [ ] Finish styles
    - [X] Rewrite to less
 - [ ] Notifications
    - [X] Notification log
        - [X] Toggle button
    - [ ] Notification types
 - [ ] Project
 
 - [X] IDE
    - [X] Add IDE level top menu
 - [ ] Fix mobx-dev-tool (Two last buttons)