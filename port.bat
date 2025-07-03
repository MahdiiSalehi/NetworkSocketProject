@echo off

@REM set PORT=%1

@REM set appRunPort=%PORT% 
@REM set /a "broadcastSendPort=%PORT% + 1"
@REM set /a "broadcastListenPort=%PORT% + 2"
@REM set /a "TCPSendPort=%PORT% + 3"
@REM set /a "TCPListenPort=%PORT% + 4"

set appRunPort=8000 
set /a "broadcastSendPort=5002"
set /a "broadcastListenPort=5001"
set /a "TCPSendPort=5004"
set /a "TCPListenPort=5003"

set /a "mongodbPort=27018"
