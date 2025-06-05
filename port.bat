@echo off

set PORT=%1

set appRunPort=%PORT% 
set /a "broadcastSenderPort=%PORT% + 1"
set /a "broadcastListenPort=%PORT% + 2"