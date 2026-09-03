@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------
@IF "%DEBUG%" == "1" (@ECHO ON) ELSE (@ECHO OFF)
SETLOCAL ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION
SET "EXEC_DIR=%~dp0"
SET "MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6\mvn"
mvn %*
