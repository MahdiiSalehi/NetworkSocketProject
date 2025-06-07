@echo off

set PORT=%1

set appRunPort=%PORT% 
set /a "broadcastSendPort=%PORT% + 1"
set /a "broadcastListenPort=%PORT% + 2"
set /a "TCPSendPort=%PORT% + 3"
set /a "TCPListenPort=%PORT% + 4"